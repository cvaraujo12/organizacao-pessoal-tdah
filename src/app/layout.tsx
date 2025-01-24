'use client'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Organizador Pessoal TDAH</title>
        <meta name="description" content="Sistema de organização pessoal para pessoas com TDAH" />
      </head>
      <body>{children}</body>
    </html>
  )
} 