
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
      person_profiles: 'always',
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true  // Enable page leave event tracking
    });

    // Clean up function
    return () => {
      // No clean up needed for PostHog initialization
    };
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
