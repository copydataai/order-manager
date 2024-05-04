import "@/globals.css"

import type { Metadata } from "next";



export const metadata: Metadata = {
    title: "Orders' Dashboard",
    description: "Manage your orders dashboard",
    icons: [{ rel: "icon", url: "/vite.svg" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return(
        <html lang="en" >
            <body>
                {children}
            </body>
        </html>
    )
}
