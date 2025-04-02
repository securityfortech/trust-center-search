
'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useLocation } from 'react-router-dom';

// PostHog configuration
const POSTHOG_KEY = 'phc_dJKvUiBRRDQngpdHXSwPiEx72ypcgFD4Fj96WrivTpM';
const POSTHOG_HOST = 'https://eu.i.posthog.com';

// PostHog page view tracker component
function PostHogPageView() {
  const location = useLocation();
  
  // Track pageviews
  useEffect(() => {
    if (location.pathname) {
      let url = window.origin + location.pathname;
      if (location.search) {
        url = url + location.search;
      }
      
      posthog.capture('$pageview', { '$current_url': url });
    }
  }, [location]);

  return null;
}

// Main PostHog provider component
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true  // Enable page leave event tracking
    });

    // Set up the page leave event handler
    const handleBeforeUnload = () => {
      posthog.capture('$pageleave');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
