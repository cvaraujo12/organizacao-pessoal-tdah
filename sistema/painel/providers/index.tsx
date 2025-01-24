'use client'

import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AccessibilityProvider } from './AccessibilityProvider'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <AccessibilityProvider>
            {children}
          </AccessibilityProvider>
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  )
} 