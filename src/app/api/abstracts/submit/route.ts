import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AbstractSubmission from '@/models/AbstractSubmission';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    const {
      track,
      secondaryTrack,
      title,
      abstract,
      keywords,
      userEmail,
      primaryAuthor,
      coAuthors,
      domainConflicts,
    } = data;

    if (!track || !title || !abstract || !keywords || !userEmail || !primaryAuthor?.name) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (Track, Title, Abstract, Keywords, and Author details).' },
        { status: 400 }
      );
    }

    const wordCount = abstract.trim().split(/\s+/).filter(Boolean).length;

    // Generate unique Microsoft CMT style submission ID: ICMEMS-2027-ABS-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const submissionId = `ICMEMS-2027-ABS-${randomSuffix}`;

    const newSubmission = await AbstractSubmission.create({
      submissionId,
      track,
      secondaryTrack: secondaryTrack || '',
      title: title.trim(),
      abstract: abstract.trim(),
      keywords: keywords.trim(),
      userEmail: userEmail.toLowerCase(),
      primaryAuthor,
      coAuthors: coAuthors || [],
      domainConflicts: domainConflicts || '',
      wordCount,
      status: 'Submitted',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Abstract submitted successfully via Microsoft CMT system.',
        submission: {
          submissionId: newSubmission.submissionId,
          title: newSubmission.title,
          track: newSubmission.track,
          wordCount: newSubmission.wordCount,
          status: newSubmission.status,
          createdAt: newSubmission.createdAt,
          primaryAuthor: newSubmission.primaryAuthor,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Abstract submission error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit abstract' },
      { status: 500 }
    );
  }
}
