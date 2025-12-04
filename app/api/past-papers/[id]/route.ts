import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PastPaper from '@/models/PastPaper';

// GET a single past paper by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const pastPaper = await PastPaper.findById(params.id);

    if (!pastPaper) {
      return NextResponse.json(
        { error: 'Past paper not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ pastPaper }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// PUT update a past paper (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { subject, driveLink, level } = await request.json();

    const updateData: any = {};
    if (subject) updateData.subject = subject;
    if (driveLink) updateData.driveLink = driveLink;
    if (level) updateData.level = level;

    const pastPaper = await PastPaper.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!pastPaper) {
      return NextResponse.json(
        { error: 'Past paper not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ pastPaper }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE a past paper (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const pastPaper = await PastPaper.findByIdAndDelete(params.id);

    if (!pastPaper) {
      return NextResponse.json(
        { error: 'Past paper not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Past paper deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
