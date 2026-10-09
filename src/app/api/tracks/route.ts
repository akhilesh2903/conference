import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Track from '@/models/Track';

export async function GET() {
  try {
    await connectToDatabase();
    const tracks = await Track.find({}).sort({ trackNumber: 1 });
    return NextResponse.json({ success: true, tracks });
  } catch (error: any) {
    console.error('Fetch tracks error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
