'use client'

import { DashboardHeader } from '@/components/dashboard-header'
import { Footer } from '@/components/footer'
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

interface Candidate {
  id: string
  name: string
  university: string
  major: string
  matchScore: number
  skills: string[]
  githubUrl: string
  portfolioUrl: string
  topCourses: string[]
  experience: string
  gpa: number
  graduationDate: string
  views: number
  clicks: number
}

export default function CandidatesPage() {
  const candidates: Candidate[] = [
    {
      id: '10030015',
      name: 'Rajesh Kumar',
      university: 'IIT Delhi',
      major: 'Computer Science',
      matchScore: 95,
      skills: ['Python', 'Machine Learning', 'Java', 'React', 'AWS'],
      githubUrl: 'https://github.com/rajeshkumar',
      portfolioUrl: 'https://rajeshkumar.dev',
      topCourses: ['Data Structures', 'Machine Learning', 'Cloud Computing'],
      experience: '2 internships, 5 projects',
      gpa: 8.9,
      graduationDate: 'May 2025',
      views: 456,
      clicks: 23
    },
    {
      id: '10219099',
      name: 'Priya Sharma',
      university: 'BITS Pilani',
      major: 'Software Engineering',
      matchScore: 92,
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Docker'],
      githubUrl: 'https://github.com/priyasharma',
      portfolioUrl: 'https://priyasharma.io',
      topCourses: ['Web Development', 'Database Systems', 'DevOps'],
      experience: '1 internship, 8 projects',
      gpa: 8.7,
      graduationDate: 'June 2025',
      views: 234,
      clicks: 12
    },
    {
      id: '10624813',
      name: 'Amit Patel',
      university: 'NIT Trichy',
      major: 'Information Technology',
      matchScore: 88,
      skills: ['Java', 'Spring Boot', 'MySQL', 'Kubernetes', 'Git'],
      githubUrl: 'https://github.com/amitpatel',
      portfolioUrl: 'https://amitpatel.com',
      topCourses: ['Software Architecture', 'Distributed Systems', 'Algorithms'],
      experience: '1 internship, 6 projects',
      gpa: 8.5,
      graduationDate: 'July 2025',
      views: 544,
      clicks: 54
    },
    {
      id: '10712803',
      name: 'Sneha Reddy',
      university: 'IIIT Hyderabad',
      major: 'Computer Science',
      matchScore: 85,
      skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Linux'],
      githubUrl: 'https://github.com/snehareddy',
      portfolioUrl: 'https://snehareddy.dev',
      topCourses: ['Operating Systems', 'Computer Networks', 'Backend Development'],
      experience: '2 internships, 4 projects',
      gpa: 8.3,
      graduationDate: 'May 2025',
      views: 321,
      clicks: 18
    }
  ]

  const totalViews = candidates.reduce((sum, c) => sum + c.views, 0)
  const totalClicks = candidates.reduce((sum, c) => sum + c.clicks, 0)
  const clickRate = ((totalClicks / totalViews) * 100).toFixed(2)

  return (
    <div className={`${jetbrainsMono.className} min-h-screen flex flex-col bg-white`}>
      <DashboardHeader />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Candidate Dashboard</h1>
            <p className="text-gray-600">
              Manage your candidates and track performance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">$</div>
                <div className="text-sm text-gray-600">Match Score Avg</div>
              </div>
              <div className="text-3xl font-bold">
                {(candidates.reduce((sum, c) => sum + c.matchScore, 0) / candidates.length).toFixed(1)}%
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">📱</div>
                <div className="text-sm text-gray-600">Active Candidates</div>
              </div>
              <div className="text-3xl font-bold">{candidates.length}</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">👁️</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              <div className="text-3xl font-bold">{totalViews.toLocaleString()}</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">📊</div>
                <div className="text-sm text-gray-600">Click Rate</div>
              </div>
              <div className="text-3xl font-bold">{clickRate}%</div>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">Recent Candidates</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Match Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Graduation
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {candidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold">{candidate.name}</div>
                          <div className="text-sm text-gray-600">
                            {candidate.university}
                          </div>
                          <div className="text-xs text-gray-500">{candidate.major}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono">{candidate.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold">{candidate.matchScore}%</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>{candidate.views} views</div>
                          <div className="text-gray-500">{candidate.clicks} clicks</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">{candidate.graduationDate}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">View Analytics</h3>
              <p className="text-gray-600 mb-6">
                Get detailed insights into your candidate performance and engagement.
              </p>
              <button className="w-full bg-white border border-gray-900 text-gray-900 px-6 py-3 rounded hover:bg-gray-50 transition-colors font-semibold">
                View Analytics
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Compare Candidates</h3>
              <p className="text-gray-600 mb-6">
                Side-by-side comparison of candidate skills and qualifications.
              </p>
              <button className="w-full bg-white border border-gray-900 text-gray-900 px-6 py-3 rounded hover:bg-gray-50 transition-colors font-semibold">
                Compare
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Export Report</h3>
              <p className="text-gray-600 mb-6">
                Download a comprehensive report of all candidates and metrics.
              </p>
              <button className="w-full bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors font-semibold">
                Export
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}