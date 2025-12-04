import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BCom from '@/models/BCom';

// GET all B Com courses (with optional filtering by year and subject)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const subject = searchParams.get('subject');

    const query: any = {};
    if (year) query.year = year;
    if (subject) query.subject = subject;

    const bcomCourses = await BCom.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ bcomCourses }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// POST create a new B Com course (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { subject, driveLink, year } = await request.json();

    if (!subject || !driveLink || !year) {
      return NextResponse.json(
        { error: 'Subject, drive link, and year are required' },
        { status: 400 }
      );
    }

    if (!['1st Year', '2nd Year', '3rd Year', '4th Year', 'English Medium'].includes(year)) {
      return NextResponse.json(
        { error: 'Year must be 1st Year, 2nd Year, 3rd Year, 4th Year, or English Medium' },
        { status: 400 }
      );
    }

    const bcom = await BCom.create({
      subject,
      driveLink,
      year,
    });

    return NextResponse.json({ bcom }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}


