import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BCom from '@/models/BCom';

// GET a single B Com course by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const bcom = await BCom.findById(params.id);

    if (!bcom) {
      return NextResponse.json(
        { error: 'B Com course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ bcom }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// PUT update a B Com course (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { subject, driveLink, year } = await request.json();

    const updateData: any = {};
    if (subject) updateData.subject = subject;
    if (driveLink) updateData.driveLink = driveLink;
    if (year) updateData.year = year;

    const bcom = await BCom.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!bcom) {
      return NextResponse.json(
        { error: 'B Com course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ bcom }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE a B Com course (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const bcom = await BCom.findByIdAndDelete(params.id);

    if (!bcom) {
      return NextResponse.json(
        { error: 'B Com course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'B Com course deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}


