import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AbstractSubmission from '@/models/AbstractSubmission';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await connectToDatabase();

    const abstract = await AbstractSubmission.findById(id);
    if (!abstract) {
      return NextResponse.json({ error: 'Abstract submission not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, abstract });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { status, rejectionReason } = await request.json();
    const validStatuses = ['Pending', 'Approved', 'Rejected', 'Submitted', 'Under Review', 'Accepted', 'Revision'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const { id } = await context.params;
    await connectToDatabase();

    const updateFields: Record<string, unknown> = { status };
    if (typeof rejectionReason === 'string') {
      updateFields.rejectionReason = rejectionReason;
    }
    if (status === 'Approved' || status === 'Rejected') {
      updateFields.decisionDate = new Date();
      updateFields.decisionBy = auth.username || 'admin';
    }

    const abstract = await AbstractSubmission.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!abstract) {
      return NextResponse.json({ error: 'Abstract submission not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, abstract });
  } catch (error: unknown) {
    console.error('Update abstract status error:', error);
    const errorMsg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await connectToDatabase();
    await AbstractSubmission.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Abstract deleted successfully' });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
