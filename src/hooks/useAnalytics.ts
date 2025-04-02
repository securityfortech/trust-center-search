
import posthog from 'posthog-js';

/**
 * Hook for PostHog analytics operations
 */
export const useAnalytics = () => {
  /**
   * Capture a custom event
   */
  const capture = (eventName: string, properties?: Record<string, any>) => {
    posthog.capture(eventName, properties);
  };

  /**
   * Identify a user
   */
  const identify = (distinctId: string, properties?: Record<string, any>) => {
    posthog.identify(distinctId, properties);
  };

  /**
   * Reset the current user
   */
  const reset = () => {
    posthog.reset();
  };

  /**
   * Track when a user leaves the page
   */
  const trackPageLeave = () => {
    posthog.capture('$pageleave');
  };

  return {
    capture,
    identify,
    reset,
    trackPageLeave
  };
};
