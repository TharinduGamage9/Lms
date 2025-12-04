import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';

// GET all notes (with optional filtering by level and subject)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const subject = searchParams.get('subject');
    const category = searchParams.get('category');

    const query: any = {};
    if (level) query.level = level;
    if (subject) query.subject = subject;
    if (category) query.category = category;

    const notes = await Note.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// POST create a new note (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { subject, driveLink, level, category } = await request.json();

    if (!subject || !driveLink || !level) {
      return NextResponse.json(
        { error: 'Subject, drive link, and level are required' },
        { status: 400 }
      );
    }

    if (!['OL', 'AL'].includes(level)) {
      return NextResponse.json(
        { error: 'Level must be OL or AL' },
        { status: 400 }
      );
    }

    const note = await Note.create({
      subject,
      driveLink,
      level,
      category: category || undefined,
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

