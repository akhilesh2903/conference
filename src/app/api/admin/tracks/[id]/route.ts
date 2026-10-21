import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Track from '@/models/Track';

function checkAuth(request: Request): boolean {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) return false;
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    return username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await Promise.resolve(context?.params || {});
    const rawId = resolvedParams.id;
    if (!rawId) {
      return NextResponse.json({ error: 'Track ID is required' }, { status: 400 });
    }

    const id = decodeURIComponent(rawId);
    await connectToDatabase();

    let deleted = null;
    // 1. Try finding by ObjectId if valid
    if (mongoose.Types.ObjectId.isValid(id)) {
      deleted = await Track.findByIdAndDelete(id);
    }

    // 2. Fallback to finding by trackNumber, string _id, or title
    if (!deleted) {
      deleted = await Track.findOneAndDelete({
        $or: [{ trackNumber: id }, { _id: id }, { title: id }],
      });
    }

    if (!deleted) {
      return NextResponse.json({ error: `Track '${id}' not found in database` }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Track ${deleted.trackNumber || id} deleted successfully`,
      deletedId: deleted._id,
    });
  } catch (error: any) {
    console.error('Delete track error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
