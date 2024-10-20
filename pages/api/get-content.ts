import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const filePath = path.join(process.cwd(), 'data', 'content.json')
      const fileContents = await fs.readFile(filePath, 'utf8')
      const content = JSON.parse(fileContents)

      res.status(200).json(content)
    } catch (error) {
      console.error('Error reading content:', error)
      res.status(500).json({ message: 'Error reading content', error: error.message })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}