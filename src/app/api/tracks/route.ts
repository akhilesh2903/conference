import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Track from '@/models/Track';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const rawTracks = await Track.find({}).lean();
    const tracks = [...rawTracks].sort((a, b) => {
      const numA = parseInt(String(a.trackNumber || ''), 10);
      const numB = parseInt(String(b.trackNumber || ''), 10);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      return String(a.trackNumber || '').localeCompare(String(b.trackNumber || ''), undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });

    return NextResponse.json(
      { success: true, tracks },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: unknown) {
    console.error('Fetch tracks error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
