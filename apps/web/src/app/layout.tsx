import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";

import { PHProvider } from "~/app/provider";

import "~/app/globals.css";

import { Toaster } from "@order/ui/toaster";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Orders",
  description: "Orders make your dream restaurant in clicks",
  icons: [{ rel: "icon", url: "/orders-transformed.webp" }],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          <PostHogPageView />
          <main>{props.children}</main>
          <Toaster />
          <Analytics />
        </body>
      </PHProvider>
    </html>
  );
}
