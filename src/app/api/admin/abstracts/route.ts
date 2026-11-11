import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AbstractSubmission from '@/models/AbstractSubmission';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(request: Request) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const abstracts = await AbstractSubmission.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, abstracts });
  } catch (error: unknown) {
    console.error('Fetch admin abstracts error:', error);
    const errorMsg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { id, status, rejectionReason } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing abstract ID or status' }, { status: 400 });
    }

    const updateFields: Record<string, unknown> = { status };
    if (typeof rejectionReason === 'string') {
      updateFields.rejectionReason = rejectionReason;
    }
    if (status === 'Approved' || status === 'Rejected') {
      updateFields.decisionDate = new Date();
      updateFields.decisionBy = auth.username || 'admin';
    }

    const updated = await AbstractSubmission.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updated) {
      return NextResponse.json({ error: 'Abstract submission not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, abstract: updated });
  } catch (error: unknown) {
    console.error('Update abstract status error:', error);
    const errorMsg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
