import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // Parse the query parameters
        const { searchParams } = new URL(req.url);
        const fileName = searchParams.get('filename');
        if (!fileName) {
            return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
        }

        // Upload the file to Vercel Blob
        if (!req.body) {
            return NextResponse.json({ error: 'No file content provided' }, { status: 400 });
        }
        const blob = await put(fileName, req.body, {
            access: 'public',
        });

        // Prepare the metadata
        const metadata = {
            id: uuidv4(),
            name: fileName, // File name
            contentType: req.headers.get('content-type') || 'application/octet-stream', // MIME type
            url: blob.url, // Publicly accessible URL of the uploaded image
            status: 'uploaded', // Indicates the upload is complete
        };

        return NextResponse.json(metadata, { status: 200 });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
    }
}
