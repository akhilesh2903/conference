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
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const hashed = hashPassword(password);

    // 1. Try finding in Candidate collection
    const candidate = await Candidate.findOne({ email: cleanEmail });
    if (candidate) {
      if (candidate.password && candidate.password !== hashed && candidate.password !== password) {
        return NextResponse.json(
          { error: 'Incorrect password. Please verify your credentials.' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Signed in successfully.',
        user: {
          id: candidate._id,
          email: candidate.email,
          firstName: candidate.firstName || candidate.fullName.split(' ')[0],
          lastName: candidate.lastName || candidate.fullName.split(' ').slice(1).join(' '),
          fullName: candidate.fullName,
          organization: candidate.institution,
          institution: candidate.institution,
          country: candidate.country || 'India',
          phoneNumber: candidate.phoneNumber,
          category: candidate.category,
          presentationType: candidate.presentationType,
          domainConflicts: candidate.domainConflicts || '',
        },
      });
    }

    // 2. Fallback to CmtUser collection
    const user = await CmtUser.findOne({ email: cleanEmail });
    if (user) {
      if (user.password !== password && user.password !== hashed) {
        return NextResponse.json(
          { error: 'Incorrect password. Please verify your credentials.' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Signed in successfully.',
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: `${user.firstName} ${user.lastName}`.trim(),
          organization: user.organization,
          institution: user.organization,
          country: user.country,
          phoneNumber: user.phone || '',
          domainConflicts: user.domainConflicts || '',
        },
      });
    }

    return NextResponse.json(
      { error: 'No account found with this email. Please register.' },
      { status: 401 }
    );
  } catch (error: any) {
    console.error('Author Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}
