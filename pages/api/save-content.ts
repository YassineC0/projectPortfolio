import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { images, testimonials, experiences } = req.body;

      // Validate the received data
      if (!images || !testimonials || !experiences) {
        return res.status(400).json({ message: 'Missing required data' });
      }

      const content = { images, testimonials, experiences };
      const filePath = path.join(process.cwd(), 'data', 'content.json');

      // Ensure the data directory exists
      const dataDir = path.join(process.cwd(), 'data');
      await fs.mkdir(dataDir, { recursive: true });

      // Write the content to the file
      await fs.writeFile(filePath, JSON.stringify(content, null, 2));

      // Read the file back to verify it was written correctly
      const savedContent = await fs.readFile(filePath, 'utf-8');
      const parsedContent = JSON.parse(savedContent);

      if (JSON.stringify(parsedContent) === JSON.stringify(content)) {
        res.status(200).json({ message: 'Content saved successfully' });
      } else {
        throw new Error('Content verification failed');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      res.status(500).json({ message: 'Error saving content', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}