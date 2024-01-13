import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['greek'] })

export const metadata: Metadata = {
  title: 'ParlaTR NFT',
  description: 'Türkiye \' nin 100 yıllık yadigarların NFT teknolojisi ile koruyoruz.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
