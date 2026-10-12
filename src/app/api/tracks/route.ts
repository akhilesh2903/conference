import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Track from '@/models/Track';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const rawTracks = await Track.find({}).lean();
    const tracks = [...rawTracks].sort((a: any, b: any) => {
      const numA = parseInt(a.trackNumber, 10);
      const numB = parseInt(b.trackNumber, 10);
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
  } catch (error: any) {
    console.error('Fetch tracks error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
