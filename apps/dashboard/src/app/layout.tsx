import "~/app/globals.css";

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ThemeProvider, ThemeToggle } from "@order/ui/theme";

import { PHProvider } from "~/app/provider";
import { Footer } from "~/components/Footer.tsx";
import { Header } from "~/components/Header.tsx";
import { TRPCReactProvider } from "~/trpc/react";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Orders' Dashboard",
  description: "Manage your orders dashboard",
  icons: [{ rel: "icon", url: "/vite.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          <PostHogPageView />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TRPCReactProvider>
              <Header />
              {children}
              <Footer />
            </TRPCReactProvider>
            <div className="absolute bottom-4 right-4">
              <ThemeToggle />
            </div>
          </ThemeProvider>
        </body>
      </PHProvider>
    </html>
  );
}
