import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BAExternal from '@/models/BAExternal';

// GET all BA External courses (with optional filtering by subject and medium)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const medium = searchParams.get('medium');

    const query: any = {};
    if (subject) query.subject = subject;
    if (medium) query.medium = medium;

    const baExternalCourses = await BAExternal.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ baExternalCourses }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// POST create a new BA External course (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { subject, medium, driveLink } = await request.json();

    if (!subject || !medium || !driveLink) {
      return NextResponse.json(
        { error: 'Subject, medium, and drive link are required' },
        { status: 400 }
      );
    }

    const baExternal = await BAExternal.create({
      subject,
      medium,
      driveLink,
    });

    return NextResponse.json({ baExternal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

