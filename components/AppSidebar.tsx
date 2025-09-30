"use client"

import { JetBrains_Mono } from "next/font/google"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState("dashboard")

  // Update active item based on current pathname
  useEffect(() => {
    const path = pathname.split("/")[1] || "dashboard"
    setActiveItem(path)
  }, [pathname])

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      href: "/recruiter/dashboard",
    },
    {
      id: "candidates",
      label: "Candidates",
      icon: "👥",
      href: "/recruiter/candidates",
    },
    {
      id: "jobs",
      label: "Job Postings",
      icon: "💼",
      href: "/recruiter/jobs",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: "📈",
      href: "/recruiter/analytics",
    },
    {
      id: "interviews",
      label: "Interviews",
      icon: "🎯",
      href: "/recruiter/interviews",
    },
    {
      id: "messages",
      label: "Messages",
      icon: "💬",
      href: "/recruiter/messages",
    },
  ]

  const bottomItems = [
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      href: "/settings",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: "❓",
      href: "/help",
    },
  ]

  return (
    <div className={`${jetbrainsMono.className} h-screen w-64 bg-white border-r border-gray-200 flex flex-col`}>
      {/* Logo Header */}
      <div className="px-8 py-7 border-b border-gray-200">
        <h1 className="text-xl font-bold">RecruiterPro</h1>
        <p className="text-xs text-gray-500 mt-1">Talent Management</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id)
                router.push(item.href)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeItem === item.id ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="space-y-1 mb-4">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id)
                router.push(item.href)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeItem === item.id ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
              HR
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">HR Manager</div>
              <div className="text-xs text-gray-500 truncate">hr@company.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}