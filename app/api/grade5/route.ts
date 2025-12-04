import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Grade5 from '@/models/Grade5';

// GET all Grade 5 courses (with optional filtering by subject)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');

    const query: any = {};
    if (subject) query.subject = subject;

    const grade5Courses = await Grade5.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ grade5Courses }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// POST create a new Grade 5 course (admin only)
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

    const grade5 = await Grade5.create({
      subject,
      driveLink,
    });

    return NextResponse.json({ grade5 }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

