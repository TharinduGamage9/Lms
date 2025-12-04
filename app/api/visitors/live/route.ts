import { NextRequest, NextResponse } from 'next/server';
import { sessionTracker } from '@/lib/sessionTracker';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, page, userAgent } = await request.json();

    // Get IP address from request headers
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Generate new session ID if not provided
    let currentSessionId = sessionId;
    if (!currentSessionId) {
      currentSessionId = sessionTracker.generateSessionId();
    }

    // Update session
    const updatedSessionId = sessionTracker.updateSession(
      currentSessionId,
      ip,
      page || '/',
      userAgent
    );

    return NextResponse.json(
      { 
        sessionId: updatedSessionId,
        message: 'Session updated' 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating live session:', error);
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const activeSessions = sessionTracker.getActiveSessions();
    const liveCount = sessionTracker.getLiveVisitorCount();
    const sessionsByPage = sessionTracker.getActiveSessionsByPage();

    return NextResponse.json(
      {
        liveCount,
        activeSessions: activeSessions.map(session => ({
          sessionId: session.sessionId,
          ip: session.ip,
          page: session.page,
          lastSeen: session.lastSeen,
        })),
        sessionsByPage,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error getting live visitors:', error);
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

