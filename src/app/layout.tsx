import type { Metadata } from 'next'
import ThemeRegistry from '@/theme/registry'
import QueryProvider from '@/lib/providers/QueryProvider'
import './globals.css'

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
        {/*
          QueryProvider wraps the entire app so any page can use
          useQuery/useMutation without extra setup. The QueryClient
          cache is shared across all routes during a session.
        */}
        <QueryProvider>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
