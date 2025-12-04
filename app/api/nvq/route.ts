import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NVQ from '@/models/NVQ';

// GET all NVQ courses (with optional filtering by category and subject)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subject = searchParams.get('subject');

    const query: any = {};
    if (category) query.category = category;
    if (subject) query.subject = subject;

    const nvqCourses = await NVQ.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ nvqCourses }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// POST create a new NVQ course (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { subject, driveLink, category } = await request.json();

    if (!subject || !driveLink || !category) {
      return NextResponse.json(
        { error: 'Subject, drive link, and category are required' },
        { status: 400 }
      );
    }

    const nvq = await NVQ.create({
      subject,
      driveLink,
      category,
    });

    return NextResponse.json({ nvq }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}


