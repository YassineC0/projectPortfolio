import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI!)
    const db = client.db()
    const imagesCollection = db.collection('images')

    const images = await imagesCollection.find().toArray()
    await client.close()

    res.status(200).json(images)
  } catch (error) {
    console.error('Error fetching images:', error)
    res.status(500).json({ message: 'Error fetching images' })
  }
}