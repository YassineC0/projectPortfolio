import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const content = req.body
      const filePath = path.join(process.cwd(), 'data', 'content.json')

      await fs.writeFile(filePath, JSON.stringify(content, null, 2))

      res.status(200).json({ message: 'Content saved successfully' })
    } catch (error) {
      console.error('Error saving content:', error)
      res.status(500).json({ message: 'Error saving content' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}