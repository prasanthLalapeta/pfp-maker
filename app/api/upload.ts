import type { NextApiRequest, NextApiResponse } from 'next';
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req, 'request')
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        if (!req.url) {
            return res.status(400).json({ error: 'Invalid request URL' });
        }
        const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
        const fileName = searchParams.get('filename');
        if (!fileName) {
            return res.status(400).json({ error: 'Filename is required' });
        }

        const safeFileName = fileName as string;

        const blob = await put(safeFileName, req, {
            access: 'public',
        });

        const metadata = {
            id: uuidv4(),
            name: fileName,
            contentType: req.headers['content-type'] || 'application/octet-stream',
            url: blob.url,
            status: 'uploaded',
        };

        res.status(200).json(metadata);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file.' });
    }
}
