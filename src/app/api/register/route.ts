import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import Candidate from '@/models/Candidate';
import CmtUser from '@/models/CmtUser';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    const email = data.email?.toLowerCase().trim();
    if (!email) {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }

    const firstName = data.firstName?.trim() || '';
    const lastName = data.lastName?.trim() || '';
    const fullName = data.fullName?.trim() || (firstName && lastName ? `${firstName} ${lastName}`.trim() : firstName || email);
    const institution = data.institution?.trim() || data.organization?.trim() || '';
    const phoneNumber = data.phoneNumber?.trim() || data.phone?.trim() || '';
    const category = data.category || 'Research Scholars / Postgraduate Students';

    if (!fullName || !institution || !phoneNumber) {
      return NextResponse.json(
        { error: 'Please fill in all mandatory fields: Name, Email, Phone, Institution, and Category.' },
        { status: 400 }
      );
    }

    // Check if candidate already exists
    const existing = await Candidate.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address is already registered. Please sign in.' },
        { status: 409 }
      );
    }

    const hashedPassword = data.password ? hashPassword(data.password) : undefined;

    const candidate = await Candidate.create({
      fullName,
      firstName: firstName || fullName.split(' ')[0],
      lastName: lastName || fullName.split(' ').slice(1).join(' '),
      email,
      password: hashedPassword,
      phoneNumber,
      institution,
      country: data.country || 'India',
      city: data.city || '',
      state: data.state || '',
      category,
      presentationType: data.presentationType || 'Oral Presenter',
      paperId: data.paperId || '',
      paymentReference: data.paymentReference || '',
      googleScholarId: data.googleScholarId || '',
      orcidId: data.orcidId || '',
      semanticScholarId: data.semanticScholarId || '',
      dblpId: data.dblpId || '',
      openReviewId: data.openReviewId || '',
      domainConflicts: data.domainConflicts || '',
      status: 'pending',
    });

    // Also mirror to CmtUser so legacy auth endpoints stay synced if needed
    try {
      await CmtUser.create({
        email,
        password: hashedPassword || '',
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        organization: institution,
        country: data.country || 'India',
        city: data.city || '',
        state: data.state || '',
        phone: phoneNumber,
        googleScholarId: data.googleScholarId || '',
        orcidId: data.orcidId || '',
        semanticScholarId: data.semanticScholarId || '',
        dblpId: data.dblpId || '',
        openReviewId: data.openReviewId || '',
        domainConflicts: data.domainConflicts || '',
        agreedToTerms: true,
      });
    } catch (e) {
      // Ignore if CmtUser duplicate
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration completed successfully.',
        user: {
          id: candidate._id,
          fullName: candidate.fullName,
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          email: candidate.email,
          institution: candidate.institution,
          organization: candidate.institution,
          country: candidate.country,
          phoneNumber: candidate.phoneNumber,
          category: candidate.category,
          presentationType: candidate.presentationType,
          domainConflicts: candidate.domainConflicts,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
