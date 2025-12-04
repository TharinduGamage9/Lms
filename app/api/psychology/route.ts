import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Psychology from '@/models/Psychology';

// GET all psychology courses (with optional filtering by subject)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');

    const query: any = {};
    if (subject) query.subject = subject;

    const psychologyCourses = await Psychology.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ psychologyCourses }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// POST create a new psychology course (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { subject, driveLink } = await request.json();

    if (!subject || !driveLink) {
      return NextResponse.json(
        { error: 'Subject and drive link are required' },
        { status: 400 }
      );
    }

    const psychology = await Psychology.create({
      subject,
      driveLink,
    });

    return NextResponse.json({ psychology }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}


