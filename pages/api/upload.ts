import { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import formidable from 'formidable'
import fs from 'fs'
import { MongoClient } from 'mongodb'

export const config = {
  api: {
    bodyParser: false,
  },
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing form data' })
    }

    const file = files.file as formidable.File
    const imageId = fields.imageId as string

    if (!file || !imageId) {
      return res.status(400).json({ message: 'Missing file or imageId' })
    }

    try {
      const fileContent = await fs.promises.readFile(file.filepath)
      const fileName = `${Date.now()}-${file.originalFilename}`

      const putObjectParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: fileContent,
        ContentType: file.mimetype!,
      }

      const command = new PutObjectCommand(putObjectParams)
      await s3Client.send(command)

      const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

      // Update MongoDB with the new image URL
      const client = await MongoClient.connect(process.env.MONGODB_URI!)
      const db = client.db()
      const imagesCollection = db.collection('images')

      await imagesCollection.updateOne(
        { _id: imageId },
        { $set: { url: signedUrl } },
        { upsert: true }
      )

      await client.close()

      res.status(200).json({ message: 'Image uploaded successfully', url: signedUrl })
    } catch (error) {
      console.error('Error uploading file:', error)
      res.status(500).json({ message: 'Error uploading file' })
    }
  })
}