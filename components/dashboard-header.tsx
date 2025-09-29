'use client'

import { useRouter } from 'next/navigation'

export function DashboardHeader() {
  const router = useRouter()

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between gap-6 py-8 px-8 border-b border-border bg-background">
      {/* Left side - Main Title */}
      <h1 
        className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight cursor-pointer hover:opacity-90 transition-opacity"
        style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
        onClick={() => router.push('/')}
      >
        Making Recruitment Easy for Big-Tech
      </h1>
      
    </header>
  )
}