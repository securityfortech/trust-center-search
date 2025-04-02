
import posthog from 'posthog-js';

export const useAnalytics = () => {
  const capture = (eventName: string, properties?: Record<string, any>) => {
    posthog.capture(eventName, properties);
  };

  const identify = (distinctId: string, properties?: Record<string, any>) => {
    posthog.identify(distinctId, properties);
  };

  const reset = () => {
    posthog.reset();
  };

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
