import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AbstractSubmission from '@/models/AbstractSubmission';

export async function GET(request: Request) {
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

    const abstracts = await AbstractSubmission.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, abstracts });
  } catch (error: any) {
    console.error('Fetch admin abstracts error:', error);
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
      return NextResponse.json({ error: 'Missing abstract ID or status' }, { status: 400 });
    }

    const updated = await AbstractSubmission.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return NextResponse.json({ error: 'Abstract submission not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, abstract: updated });
  } catch (error: any) {
    console.error('Update abstract status error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
