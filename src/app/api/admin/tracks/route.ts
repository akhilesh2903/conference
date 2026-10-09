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
    const { trackNumber, title, text } = body;

    if (!trackNumber || !title || !text) {
      return NextResponse.json({ error: 'trackNumber, title, and text are required' }, { status: 400 });
    }

    await connectToDatabase();
    const track = await Track.create({ trackNumber, title, text });
    return NextResponse.json({ success: true, track }, { status: 201 });
  } catch (error: any) {
    console.error('Create track error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const tracks = await Track.find({}).sort({ trackNumber: 1 });
    return NextResponse.json({ success: true, tracks });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
