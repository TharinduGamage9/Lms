import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { page, userAgent, referer } = await request.json();
    
    // Get IP address from request headers
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check if this is a unique visit (same IP within last 24 hours)
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);
    
    const recentVisit = await Visitor.findOne({
      ip,
      timestamp: { $gte: oneDayAgo },
    });

    const isUnique = !recentVisit;

    // Create visitor record
    await Visitor.create({
      ip,
      userAgent: userAgent || 'unknown',
      page: page || '/',
      referer: referer || '',
      timestamp: new Date(),
      isUnique,
    });

    return NextResponse.json(
      { message: 'Visit tracked', isUnique },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error tracking visit:', error);
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}


