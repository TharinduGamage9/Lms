import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import OtherNote from '@/models/OtherNote';

// GET a single other note by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const otherNote = await OtherNote.findById(params.id);

    if (!otherNote) {
      return NextResponse.json(
        { error: 'Other note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ otherNote }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// PUT update an other note (admin only)
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

    const otherNote = await OtherNote.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!otherNote) {
      return NextResponse.json(
        { error: 'Other note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ otherNote }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE an other note (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const otherNote = await OtherNote.findByIdAndDelete(params.id);

    if (!otherNote) {
      return NextResponse.json(
        { error: 'Other note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Other note deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

