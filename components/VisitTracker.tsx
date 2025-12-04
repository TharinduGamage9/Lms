'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Don't track admin pages
    if (pathname?.startsWith('/admin')) {
      return;
    }

    // Track the visit (for statistics)
    const trackVisit = async () => {
      try {
        await fetch('/api/visitors/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: pathname || '/',
            userAgent: navigator.userAgent,
            referer: document.referrer || '',
          }),
        });
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.error('Failed to track visit:', error);
      }
    };

    // Update live session
    const updateLiveSession = async () => {
      try {
        const response = await fetch('/api/visitors/live', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            page: pathname || '/',
            userAgent: navigator.userAgent,
          }),
        });

        const data = await response.json();
        if (data.sessionId && !sessionIdRef.current) {
          sessionIdRef.current = data.sessionId;
        }
      } catch (error) {
        // Silently fail
        console.error('Failed to update live session:', error);
      }
    };

    // Track visit immediately
    trackVisit();
    updateLiveSession();

    // Update live session every 30 seconds to keep it active
    intervalRef.current = setInterval(() => {
      updateLiveSession();
    }, 30000); // 30 seconds

    // Cleanup on unmount or pathname change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}

