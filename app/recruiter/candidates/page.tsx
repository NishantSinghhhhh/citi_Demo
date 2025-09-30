'use client'

import { JetBrains_Mono } from 'next/font/google'
import { useState } from 'react'
import * as XLSX from 'xlsx'
import {CANDIDATES_DATA} from "./data"
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})



export default function CandidatesPage() {
  const [candidates] = useState(CANDIDATES_DATA)

  const candidatesWithGPA = candidates.filter(c => c.cgpa !== null && c.cgpa > 0)
  const avgGPA = candidatesWithGPA.length > 0 
    ? candidatesWithGPA.reduce((sum, c) => sum + (c.cgpa || 0), 0) / candidatesWithGPA.length 
    : 0
  const totalSkills = candidates.reduce((sum, c) => sum + c.primarySkills.length, 0)
  const withExperience = candidates.filter(c => c.experience && c.experience.length > 0).length

  const handleExport = () => {
    // Prepare data for Excel
    const exportData = candidates.map(candidate => ({
      'Name': candidate.name,
      'Email': candidate.email,
      'Phone': candidate.phone || 'N/A',
      'Degree': candidate.degree,
      'CGPA': candidate.cgpa ? candidate.cgpa.toFixed(2) : 'N/A',
      'Primary Skills': candidate.primarySkills.join(', '),
      'Experience': candidate.experience || 'N/A',
      'Project Count': candidate.projectCount,
      'Top Project': candidate.topProject || 'N/A'
    }))

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(exportData)

    // Set column widths
    ws['!cols'] = [
      { wch: 20 }, // Name
      { wch: 30 }, // Email
      { wch: 18 }, // Phone
      { wch: 30 }, // Degree
      { wch: 8 },  // CGPA
      { wch: 40 }, // Primary Skills
      { wch: 30 }, // Experience
      { wch: 12 }, // Project Count
      { wch: 30 }  // Top Project
    ]

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Candidates')

    // Add summary sheet
    const summaryData = [
      { 'Metric': 'Total Candidates', 'Value': candidates.length },
      { 'Metric': 'Average GPA', 'Value': avgGPA > 0 ? avgGPA.toFixed(2) : 'N/A' },
      { 'Metric': 'Total Skills', 'Value': totalSkills },
      { 'Metric': 'Candidates with Experience', 'Value': withExperience }
    ]
    const wsSummary = XLSX.utils.json_to_sheet(summaryData)
    wsSummary['!cols'] = [{ wch: 30 }, { wch: 20 }]
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary')

    // Generate file name with current date
    const date = new Date().toISOString().split('T')[0]
    const fileName = `Candidates_Report_${date}.xlsx`

    // Download file
    XLSX.writeFile(wb, fileName)
  }

  return (
    <div className={`${jetbrainsMono.className} min-h-screen flex flex-col bg-white`}>
      {/* <DashboardHeader /> */}

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">📚</div>
                <div className="text-sm text-gray-600">Average GPA</div>
              </div>
              <div className="text-3xl font-bold">
                {avgGPA > 0 ? avgGPA.toFixed(2) : 'N/A'}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">👥</div>
                <div className="text-sm text-gray-600">Total Candidates</div>
              </div>
              <div className="text-3xl font-bold">{candidates.length}</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">💼</div>
                <div className="text-sm text-gray-600">Total Skills</div>
              </div>
              <div className="text-3xl font-bold">{totalSkills}</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">🎓</div>
                <div className="text-sm text-gray-600">With Experience</div>
              </div>
              <div className="text-3xl font-bold">{withExperience}</div>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">All Candidates</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CGPA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projects
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {candidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold">{candidate.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {candidate.degree}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="text-gray-900">{candidate.email}</div>
                          <div className="text-gray-500 text-xs mt-1">
                            {candidate.phone || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold">
                          {candidate.cgpa ? candidate.cgpa.toFixed(2) : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {candidate.primarySkills.slice(0, 3).map((skill, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                            >
                              {skill}
                            </span>
                          ))}
                          {candidate.primarySkills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{candidate.primarySkills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm max-w-xs">
                          <span className="text-gray-700">{candidate.experience}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium">{candidate.projectCount} projects</div>
                          {candidate.topProject && (
                            <div className="text-xs text-gray-500 mt-1">
                              Top: {candidate.topProject}
                            </div>
                          )}
                        </div>
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
              <button 
                onClick={handleExport}
                className="w-full bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors font-semibold"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}