import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import DriveLink from '@/models/DriveLink';

// GET a single drive link by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const driveLink = await DriveLink.findById(params.id);

    if (!driveLink) {
      return NextResponse.json(
        { error: 'Drive link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ driveLink }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// PUT update a drive link (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { subject, link } = await request.json();

    const updateData: any = {};
    if (subject) updateData.subject = subject;
    if (link) updateData.link = link;

    const driveLink = await DriveLink.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!driveLink) {
      return NextResponse.json(
        { error: 'Drive link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ driveLink }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE a drive link (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const driveLink = await DriveLink.findByIdAndDelete(params.id);

    if (!driveLink) {
      return NextResponse.json(
        { error: 'Drive link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Drive link deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

