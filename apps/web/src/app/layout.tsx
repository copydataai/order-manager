import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "~/app/globals.css";

import { Toaster } from "@order/ui/toaster";

export const metadata: Metadata = {
  title: "Orders",
  description: "Orders make your dream restaurant in clicks",
  icons: [{ rel: "icon", url: "/orders-transformed.webp" }],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{props.children}</main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
