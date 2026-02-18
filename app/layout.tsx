import { Poppins } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import { ClerkProvider } from '@clerk/nextjs';

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" className="scroll-smooth">
                <head>
                    <link rel="preload" href="/assets/background-splash.svg" as="image" />
                </head>
                <body>
                    <LenisScroll />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}