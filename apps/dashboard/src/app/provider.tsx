// app/providers.tsx
"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { env } from "~/env";

if (env.NODE_ENV === "production") {
  if (typeof window !== "undefined") {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    });
  }
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
