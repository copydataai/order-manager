import "@/globals.css"

import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Orders",
    description: "Orders make your dream restaurant in clicks",
    icons: [{ rel: "icon", url: "/orders-transformed.webp" }],
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
