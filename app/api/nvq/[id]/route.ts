import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NVQ from '@/models/NVQ';

// GET a single NVQ course by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const nvq = await NVQ.findById(params.id);

    if (!nvq) {
      return NextResponse.json(
        { error: 'NVQ course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ nvq }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// PUT update an NVQ course (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { subject, driveLink, category } = await request.json();

    const updateData: any = {};
    if (subject) updateData.subject = subject;
    if (driveLink) updateData.driveLink = driveLink;
    if (category) updateData.category = category;

    const nvq = await NVQ.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!nvq) {
      return NextResponse.json(
        { error: 'NVQ course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ nvq }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE an NVQ course (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const nvq = await NVQ.findByIdAndDelete(params.id);

    if (!nvq) {
      return NextResponse.json(
        { error: 'NVQ course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'NVQ course deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

