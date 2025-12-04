import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import DriveLink from '@/models/DriveLink';

// GET all drive links (with optional filtering by level and subject)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');

    const query: any = {};
    if (subject) query.subject = subject;

    const driveLinks = await DriveLink.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ driveLinks }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// POST create a new drive link (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { subject, link } = await request.json();

    if (!subject || !link) {
      return NextResponse.json(
        { error: 'Subject and link are required' },
        { status: 400 }
      );
    }

    const driveLink = await DriveLink.create({
      subject,
      link,
    });

    return NextResponse.json({ driveLink }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

