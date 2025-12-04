import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Psychology from '@/models/Psychology';

// GET a single psychology course by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const psychology = await Psychology.findById(params.id);

    if (!psychology) {
      return NextResponse.json(
        { error: 'Psychology course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ psychology }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// PUT update a psychology course (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { subject, driveLink } = await request.json();

    const updateData: any = {};
    if (subject) updateData.subject = subject;
    if (driveLink) updateData.driveLink = driveLink;

    const psychology = await Psychology.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!psychology) {
      return NextResponse.json(
        { error: 'Psychology course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ psychology }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE a psychology course (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const psychology = await Psychology.findByIdAndDelete(params.id);

    if (!psychology) {
      return NextResponse.json(
        { error: 'Psychology course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Psychology course deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

