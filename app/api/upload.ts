import type { NextApiRequest, NextApiResponse } from 'next';
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

export const config = {
    api: {
        bodyParser: false, // Disables Next.js's default body parsing
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (!req.url) {
            return res.status(400).json({ error: 'Invalid request URL' });
        }
        const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
        const fileName = searchParams.get('filename');
        if (!fileName) {
            return res.status(400).json({ error: 'Filename is required' });
        }

        // Ensure fileName is a string before proceeding
        const safeFileName = fileName as string; // Type assertion to ensure it's treated as a string

        // Upload the file to Vercel Blob
        const blob = await put(safeFileName, req, {
            access: 'public', // Make the file publicly accessible
        });

        // Prepare the metadata
        const metadata = {
            id: uuidv4(), // Generate a unique identifier for the image
            name: fileName, // File name
            contentType: req.headers['content-type'] || 'application/octet-stream', // MIME type
            url: blob.url, // Publicly accessible URL of the uploaded image
            status: 'uploaded', // Indicates the upload is complete
        };

        res.status(200).json(metadata);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file.' });
    }
}
