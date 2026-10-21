import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import CmtUser from '@/models/CmtUser';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    const {
      email,
      password,
      firstName,
      lastName,
      organization,
      country,
      city,
      phoneNumber,
      googleScholarId,
      semanticScholarId,
      dblpId,
      orcidId,
      openReviewId,
      domainConflicts,
    } = data;

    // Strict Microsoft CMT Required validation
    if (!email || !password || !firstName || !lastName || !organization || !country) {
      return NextResponse.json(
        { error: 'Please fill in all mandatory fields marked with an asterisk.' },
        { status: 400 }
      );
    }

    // Password policy check: at least 8 chars (CMT recommends 12)
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await CmtUser.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: 'A Microsoft CMT account already exists with this email address. Please log in.' },
        { status: 409 }
      );
    }

    const newUser = await CmtUser.create({
      email: email.toLowerCase(),
      password, // In a full prod setup this would be hashed with bcrypt
      firstName,
      lastName,
      organization,
      country,
      city: city || '',
      phoneNumber: phoneNumber || '',
      googleScholarId: googleScholarId || '',
      semanticScholarId: semanticScholarId || '',
      dblpId: dblpId || '',
      orcidId: orcidId || '',
      openReviewId: openReviewId || '',
      domainConflicts: domainConflicts || '',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Microsoft CMT account created successfully.',
        user: {
          id: newUser._id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          fullName: `${newUser.firstName} ${newUser.lastName}`,
          organization: newUser.organization,
          country: newUser.country,
          domainConflicts: newUser.domainConflicts,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('CMT Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create Microsoft CMT account' },
      { status: 500 }
    );
  }
}
