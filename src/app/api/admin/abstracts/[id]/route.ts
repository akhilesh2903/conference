import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AbstractSubmission from '@/models/AbstractSubmission';

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
    const validStatuses = ['Submitted', 'Under Review', 'Accepted', 'Revision', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const { id } = await context.params;
    await connectToDatabase();

    const abstract = await AbstractSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!abstract) {
      return NextResponse.json({ error: 'Abstract submission not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, abstract });
  } catch (error: any) {
    console.error('Update abstract status error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await connectToDatabase();
    await AbstractSubmission.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Abstract deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
