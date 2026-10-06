import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Candidate from '@/models/Candidate';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    
    // Basic validation
    if (!data.fullName || !data.email || !data.phoneNumber || !data.institution || !data.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const candidate = await Candidate.create(data);
    return NextResponse.json({ success: true, candidate }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
