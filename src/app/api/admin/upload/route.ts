import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

function checkAuth(request: Request): boolean {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) return false;
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    return username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate safe clean filename
    const ext = path.extname(file.name) || '.png';
    const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `track_${Date.now()}_${cleanBase}${ext}`;
    
    const uploadDir = path.join(process.cwd(), 'public', 'tracks', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, buffer);

    const publicUrl = `/tracks/uploads/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl, filename });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload image' }, { status: 500 });
  }
}
