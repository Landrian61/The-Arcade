import type { Metadata } from "next";
import ThemeRegistry from "@/theme/registry";
import "./globals.css";
import QueryProvider from "@/lib/query-provider";

export const metadata: Metadata = {
  title: "The Arcade - Frontend Playground",
  description:
    "A shared sandbox for the frontend team to experiment and create",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
