import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Grade5 from '@/models/Grade5';

// GET a single Grade 5 course by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const grade5 = await Grade5.findById(params.id);

    if (!grade5) {
      return NextResponse.json(
        { error: 'Grade 5 course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ grade5 }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// PUT update a Grade 5 course (admin only)
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

    const grade5 = await Grade5.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!grade5) {
      return NextResponse.json(
        { error: 'Grade 5 course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ grade5 }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE a Grade 5 course (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const grade5 = await Grade5.findByIdAndDelete(params.id);

    if (!grade5) {
      return NextResponse.json(
        { error: 'Grade 5 course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Grade 5 course deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}


