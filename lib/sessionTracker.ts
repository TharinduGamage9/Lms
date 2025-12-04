// In-memory session tracker for live visitors
// A visitor is considered "active" if they've visited within the last 5 minutes

interface ActiveSession {
  sessionId: string;
  ip: string;
  page: string;
  userAgent?: string;
  lastSeen: Date;
}

class SessionTracker {
  private sessions: Map<string, ActiveSession> = new Map();
  private readonly SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Generate a unique session ID
  generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Update or create a session
  updateSession(sessionId: string, ip: string, page: string, userAgent?: string): string {
    const now = new Date();
    
    // If session exists, update it; otherwise create new
    if (this.sessions.has(sessionId)) {
      const session = this.sessions.get(sessionId)!;
      session.page = page;
      session.lastSeen = now;
      session.userAgent = userAgent || session.userAgent;
    } else {
      this.sessions.set(sessionId, {
        sessionId,
        ip,
        page,
        userAgent,
        lastSeen: now,
      });
    }

    // Clean up expired sessions
    this.cleanupExpiredSessions();

    return sessionId;
  }

  // Get active sessions (within timeout period)
  getActiveSessions(): ActiveSession[] {
    this.cleanupExpiredSessions();
    return Array.from(this.sessions.values());
  }

  // Get live visitor count
  getLiveVisitorCount(): number {
    this.cleanupExpiredSessions();
    return this.sessions.size;
  }

  // Get active sessions by page
  getActiveSessionsByPage(): Record<string, number> {
    this.cleanupExpiredSessions();
    const pageCounts: Record<string, number> = {};
    
    this.sessions.forEach((session) => {
      const page = session.page || '/';
      pageCounts[page] = (pageCounts[page] || 0) + 1;
    });

    return pageCounts;
  }

  // Remove expired sessions
  private cleanupExpiredSessions(): void {
    const now = new Date();
    const expiredSessions: string[] = [];

    this.sessions.forEach((session, sessionId) => {
      const timeSinceLastSeen = now.getTime() - session.lastSeen.getTime();
      if (timeSinceLastSeen > this.SESSION_TIMEOUT) {
        expiredSessions.push(sessionId);
      }
    });

    expiredSessions.forEach((sessionId) => {
      this.sessions.delete(sessionId);
    });
  }

  // Remove a specific session (for logout or explicit removal)
  removeSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Clear all sessions (for testing or reset)
  clearAll(): void {
    this.sessions.clear();
  }
}

// Export singleton instance
export const sessionTracker = new SessionTracker();

