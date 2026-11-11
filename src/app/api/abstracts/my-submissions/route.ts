import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AbstractSubmission from '@/models/AbstractSubmission';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email')?.toLowerCase().trim();
    const submissionId = searchParams.get('submissionId')?.trim();

    if (!email && !submissionId) {
      return NextResponse.json(
        { error: 'Please provide either an email or a submission ID to retrieve submission status.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const query: Record<string, unknown> = {};
    if (email && submissionId) {
      query.$or = [
        { userEmail: email },
        { 'primaryAuthor.email': email },
        { submissionId },
      ];
    } else if (email) {
      query.$or = [
        { userEmail: email },
        { 'primaryAuthor.email': email },
      ];
    } else if (submissionId) {
      query.submissionId = submissionId;
    }

    const submissions = await AbstractSubmission.find(query)
      .sort({ createdAt: -1 })
      .select('submissionId track secondaryTrack title abstract keywords status rejectionReason createdAt primaryAuthor wordCount emailNotification.status');

    return NextResponse.json({
      success: true,
      submissions: submissions.map((s) => ({
        _id: s._id,
        submissionId: s.submissionId,
        title: s.title,
        track: s.track,
        secondaryTrack: s.secondaryTrack,
        keywords: s.keywords,
        status: s.status,
        rejectionReason: s.status === 'Rejected' ? s.rejectionReason : undefined,
        createdAt: s.createdAt,
        primaryAuthor: s.primaryAuthor,
        wordCount: s.wordCount,
      })),
    });
  } catch (error: unknown) {
    console.error('Fetch my-submissions error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve submission status.';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

