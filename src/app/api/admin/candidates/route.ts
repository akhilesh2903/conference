import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Candidate from '@/models/Candidate';

export async function GET(request: Request) {
  try {
    // For a real production app, we should check cookie/session here.
    // We are trusting the admin page to send a valid request or using simple UI guard out of scope.
    // We can also accept an authorization header for simple protection.
    const authHeader = request.headers.get('authorization');
    
    // Simple basic auth check
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectToDatabase();
    
    // Fetch all candidates sorted by most recent
    const candidates = await Candidate.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, candidates });
  } catch (error: any) {
    console.error('Fetch candidates error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectToDatabase();
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing candidate ID or status' }, { status: 400 });
    }

    const updated = await Candidate.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, candidate: updated });
  } catch (error: any) {
    console.error('Update candidate error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
