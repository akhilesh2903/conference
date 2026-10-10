import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Candidate from '@/models/Candidate';

function checkAuth(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) return false;
  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { status } = await request.json();
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const { id } = await context.params;
    await connectToDatabase();

    const candidate = await Candidate.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!candidate) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, candidate });
  } catch (error: any) {
    console.error('Update candidate status error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
