import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Track from '@/models/Track';

function checkAuth(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) return false;
  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  return username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
}

export async function POST(request: Request) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { trackNumber, title, text, image } = body;

    if (!trackNumber || !title || !text) {
      return NextResponse.json({ error: 'trackNumber, title, and text are required' }, { status: 400 });
    }

    await connectToDatabase();
    const track = await Track.create({
      trackNumber: String(trackNumber).trim(),
      title: String(title).trim(),
      text: String(text).trim(),
      image: image ? String(image).trim() : undefined,
    });
    return NextResponse.json({ success: true, track }, { status: 201 });
  } catch (error: unknown) {
    console.error('Create track error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const rawTracks = await Track.find({}).lean();
    const tracks = [...rawTracks].sort((a, b) => {
      const numA = parseInt(String(a.trackNumber || ''), 10);
      const numB = parseInt(String(b.trackNumber || ''), 10);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return String(a.trackNumber || '').localeCompare(String(b.trackNumber || ''), undefined, { numeric: true, sensitivity: 'base' });
    });
    return NextResponse.json({ success: true, tracks });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
