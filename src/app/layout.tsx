import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'

export const metadata: Metadata = {
  title: 'Assets App',
  description: 'EAM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
        
        
      </body>
    </html>
  )
}
