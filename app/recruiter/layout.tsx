
"use client"

import { JetBrains_Mono } from "next/font/google"
import AppSidebar from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/dashboard-header"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${jetbrainsMono.className} flex h-screen bg-white`}>
      {/* Sidebar - Fixed */}
      <AppSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Fixed */}
        <DashboardHeader />
        
        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}