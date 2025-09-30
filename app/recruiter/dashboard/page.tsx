"use client"

import { JetBrains_Mono } from "next/font/google"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function Page() {
  return (
    <main className={`${jetbrainsMono.className} p-8 bg-white`}>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of key metrics and activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">👥</div>
            <div className="text-sm text-gray-600">Total Candidates</div>
          </div>
          <div className="text-3xl font-bold">1,248</div>
          <div className="text-xs text-green-600 mt-2">↑ 12% from last month</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">💼</div>
            <div className="text-sm text-gray-600">Active Jobs</div>
          </div>
          <div className="text-3xl font-bold">47</div>
          <div className="text-xs text-green-600 mt-2">↑ 5 new this week</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">🎯</div>
            <div className="text-sm text-gray-600">Interviews Scheduled</div>
          </div>
          <div className="text-3xl font-bold">89</div>
          <div className="text-xs text-gray-600 mt-2">23 this week</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">✅</div>
            <div className="text-sm text-gray-600">Offers Extended</div>
          </div>
          <div className="text-3xl font-bold">12</div>
          <div className="text-xs text-green-600 mt-2">↑ 3 accepted</div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
              <div className="text-xl">👤</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">New Candidate Applied</div>
                <div className="text-xs text-gray-500 mt-1">John Doe applied for Senior Developer</div>
                <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
              <div className="text-xl">📅</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">Interview Scheduled</div>
                <div className="text-xs text-gray-500 mt-1">Sarah Smith - Technical Round</div>
                <div className="text-xs text-gray-400 mt-1">5 hours ago</div>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
              <div className="text-xl">✉️</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">Offer Accepted</div>
                <div className="text-xs text-gray-500 mt-1">Mike Johnson accepted Product Manager role</div>
                <div className="text-xs text-gray-400 mt-1">1 day ago</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-xl">💼</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">New Job Posted</div>
                <div className="text-xs text-gray-500 mt-1">Frontend Developer position published</div>
                <div className="text-xs text-gray-400 mt-1">2 days ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm">
              Post New Job
            </button>
            <button className="w-full bg-white border border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm">
              Schedule Interview
            </button>
            <button className="w-full bg-white border border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm">
              Review Applications
            </button>
            <button className="w-full bg-white border border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm">
              Send Offer Letter
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-bold text-sm mb-3">Need Help?</h3>
            <p className="text-xs text-gray-600 mb-3">
              Check out our resources to get the most out of RecruiterPro.
            </p>
            <button className="w-full bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              View Documentation
            </button>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Time to Hire</h3>
          <div className="text-4xl font-bold mb-2">18 <span className="text-lg text-gray-600">days</span></div>
          <p className="text-xs text-gray-600 mb-4">
            Average time from application to offer acceptance
          </p>
          <div className="text-xs text-green-600">↓ 3 days faster than last quarter</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Acceptance Rate</h3>
          <div className="text-4xl font-bold mb-2">87<span className="text-lg text-gray-600">%</span></div>
          <p className="text-xs text-gray-600 mb-4">
            Percentage of candidates accepting offers
          </p>
          <div className="text-xs text-green-600">↑ 5% improvement</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Quality of Hire</h3>
          <div className="text-4xl font-bold mb-2">4.6<span className="text-lg text-gray-600">/5</span></div>
          <p className="text-xs text-gray-600 mb-4">
            Average performance rating after 90 days
          </p>
          <div className="text-xs text-gray-600">Stable from last period</div>
        </div>
      </div>
    </main>
  )
}