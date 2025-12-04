import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BAExternal from '@/models/BAExternal';

// GET a single BA External course by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const baExternal = await BAExternal.findById(params.id);

    if (!baExternal) {
      return NextResponse.json(
        { error: 'BA External course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ baExternal }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// PUT update a BA External course (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { subject, medium, driveLink } = await request.json();

    const updateData: any = {};
    if (subject) updateData.subject = subject;
    if (medium) updateData.medium = medium;
    if (driveLink) updateData.driveLink = driveLink;

    const baExternal = await BAExternal.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!baExternal) {
      return NextResponse.json(
        { error: 'BA External course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ baExternal }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE a BA External course (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const baExternal = await BAExternal.findByIdAndDelete(params.id);

    if (!baExternal) {
      return NextResponse.json(
        { error: 'BA External course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'BA External course deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

