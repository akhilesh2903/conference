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

    if (!track || !title || !abstract || !keywords || !userEmail || !primaryAuthor?.name || !primaryAuthor?.email) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (Track, Title, Abstract, Keywords, and Author details).' },
        { status: 400 }
      );
    }

    const wordCount = abstract.trim().split(/\s+/).filter(Boolean).length;

    // Generate unique conference submission ID: ICMEMS-2027-ABS-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const submissionId = `ICMEMS-2027-ABS-${randomSuffix}`;

    // Status is set to 'Pending' initially.
    // NOTE: In accordance with conference requirements, NO email notification is sent immediately upon submission.
    const newSubmission = await AbstractSubmission.create({
      submissionId,
      track,
      secondaryTrack: secondaryTrack || '',
      title: title.trim(),
      abstract: abstract.trim(),
      keywords: keywords.trim(),
      userEmail: userEmail.toLowerCase().trim(),
      primaryAuthor: {
        name: primaryAuthor.name.trim(),
        email: primaryAuthor.email.toLowerCase().trim(),
        organization: primaryAuthor.organization?.trim() || '',
        country: primaryAuthor.country?.trim() || 'India',
      },
      coAuthors: coAuthors || [],
      domainConflicts: domainConflicts || '',
      wordCount,
      status: 'Pending',
      rejectionReason: '',
      emailNotification: {
        status: 'not_sent',
        attempts: 0,
      },
      emailLogs: [],
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Abstract submitted successfully. Status is currently Pending review.',
        submission: {
          id: newSubmission._id,
          submissionId: newSubmission.submissionId,
          title: newSubmission.title,
          track: newSubmission.track,
          wordCount: newSubmission.wordCount,
          status: newSubmission.status,
          createdAt: newSubmission.createdAt,
          primaryAuthor: newSubmission.primaryAuthor,
          userEmail: newSubmission.userEmail,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Abstract submission error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to submit abstract';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
