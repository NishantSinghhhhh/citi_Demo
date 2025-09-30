"use client"

import { JetBrains_Mono } from "next/font/google"
import { useState } from "react"
import * as XLSX from 'xlsx'

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface Interview {
  id: number
  candidateName: string
  college: string
  position: string
  date: string
  time: string
  status: string
  interviewer: string
  round: string
  feedback?: string
}

interface ExcelRow {
  'Candidate Name'?: string
  candidateName?: string
  College?: string
  college?: string
  Position?: string
  position?: string
  Date?: string
  date?: string
  Time?: string
  time?: string
  Status?: string
  status?: string
  Interviewer?: string
  interviewer?: string
  Round?: string
  round?: string
  Feedback?: string
  feedback?: string
}

const INITIAL_INTERVIEWS: Interview[] = [
  {
    id: 1,
    candidateName: "Rajesh Kumar",
    college: "Army Institute of Technology, Pune",
    position: "Software Engineer",
    date: "2025-10-05",
    time: "10:00 AM",
    status: "scheduled",
    interviewer: "John Smith",
    round: "Technical Round 1",
  },
  {
    id: 2,
    candidateName: "Priya Deshmukh",
    college: "College of Engineering Pune (COEP)",
    position: "Full Stack Developer",
    date: "2025-10-05",
    time: "2:00 PM",
    status: "scheduled",
    interviewer: "Sarah Johnson",
    round: "Technical Round 2",
  },
  {
    id: 3,
    candidateName: "Amit Patil",
    college: "Army Institute of Technology, Pune",
    position: "Data Scientist",
    date: "2025-10-06",
    time: "11:00 AM",
    status: "scheduled",
    interviewer: "Michael Chen",
    round: "Technical Round 1",
  },
  {
    id: 4,
    candidateName: "Sneha Joshi",
    college: "College of Engineering Pune (COEP)",
    position: "Frontend Developer",
    date: "2025-10-06",
    time: "3:00 PM",
    status: "completed",
    interviewer: "Emma Davis",
    round: "HR Round",
    feedback: "Strong technical skills, good communication",
  },
  {
    id: 5,
    candidateName: "Vikram Singh",
    college: "Pune Institute of Computer Technology (PICT)",
    position: "Backend Developer",
    date: "2025-10-07",
    time: "10:30 AM",
    status: "scheduled",
    interviewer: "David Wilson",
    round: "Technical Round 1",
  },
  {
    id: 6,
    candidateName: "Ananya Sharma",
    college: "Army Institute of Technology, Pune",
    position: "Product Manager",
    date: "2025-10-07",
    time: "1:00 PM",
    status: "scheduled",
    interviewer: "Lisa Anderson",
    round: "Managerial Round",
  },
  {
    id: 7,
    candidateName: "Rohan Mehta",
    college: "College of Engineering Pune (COEP)",
    position: "DevOps Engineer",
    date: "2025-10-08",
    time: "9:00 AM",
    status: "scheduled",
    interviewer: "John Smith",
    round: "Technical Round 1",
  },
  {
    id: 8,
    candidateName: "Kavita Reddy",
    college: "Vishwakarma Institute of Technology, Pune",
    position: "UI/UX Designer",
    date: "2025-10-08",
    time: "11:30 AM",
    status: "completed",
    interviewer: "Emily White",
    round: "Design Round",
    feedback: "Excellent portfolio, creative thinking",
  },
  {
    id: 9,
    candidateName: "Sanjay Kulkarni",
    college: "Army Institute of Technology, Pune",
    position: "Machine Learning Engineer",
    date: "2025-10-09",
    time: "2:30 PM",
    status: "scheduled",
    interviewer: "Michael Chen",
    round: "Technical Round 2",
  },
  {
    id: 10,
    candidateName: "Pooja Nair",
    college: "College of Engineering Pune (COEP)",
    position: "Cloud Architect",
    date: "2025-10-09",
    time: "4:00 PM",
    status: "scheduled",
    interviewer: "David Wilson",
    round: "Technical Round 1",
  },
]

export default function Page() {
  const [interviews, setInterviews] = useState(INITIAL_INTERVIEWS)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterCollege, setFilterCollege] = useState<string>("all")
  const [uploadStatus, setUploadStatus] = useState<string>("")

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadStatus("Processing...")

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)

      // Map Excel data to interview format
      const newInterviews: Interview[] = (jsonData as ExcelRow[]).map((row, index) => ({
        id: interviews.length + index + 1,
        candidateName: row['Candidate Name'] || row['candidateName'] || '',
        college: row['College'] || row['college'] || '',
        position: row['Position'] || row['position'] || '',
        date: row['Date'] || row['date'] || '',
        time: row['Time'] || row['time'] || '',
        status: (row['Status'] || row['status'] || 'scheduled').toLowerCase(),
        interviewer: row['Interviewer'] || row['interviewer'] || '',
        round: row['Round'] || row['round'] || '',
        feedback: row['Feedback'] || row['feedback'] || '',
      }))

      setInterviews([...interviews, ...newInterviews])
      setUploadStatus(`Successfully added ${newInterviews.length} interviews!`)
      
      // Clear status after 3 seconds
      setTimeout(() => setUploadStatus(""), 3000)
    } catch (error) {
      setUploadStatus("Error processing file. Please check the format.")
      setTimeout(() => setUploadStatus(""), 3000)
    }

    // Reset file input
    e.target.value = ""
  }

  const filteredInterviews = interviews.filter((interview) => {
    const statusMatch = filterStatus === "all" || interview.status === filterStatus
    const collegeMatch = filterCollege === "all" || interview.college === filterCollege
    return statusMatch && collegeMatch
  })

  const scheduledCount = interviews.filter(i => i.status === "scheduled").length
  const completedCount = interviews.filter(i => i.status === "completed").length
  const uniqueColleges = Array.from(new Set(interviews.map(i => i.college)))

  return (
    <main className={`${jetbrainsMono.className} p-8 bg-white`}>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Interviews</h1>
        <p className="mt-2 text-gray-600">Schedule, track feedback, and collaborate on interviews.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">📅</div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </div>
          <div className="text-3xl font-bold">{scheduledCount}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">✅</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-3xl font-bold">{completedCount}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">🎓</div>
            <div className="text-sm text-gray-600">Colleges</div>
          </div>
          <div className="text-3xl font-bold">{uniqueColleges.length}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">👥</div>
            <div className="text-sm text-gray-600">Total Interviews</div>
          </div>
          <div className="text-3xl font-bold">{interviews.length}</div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Add Interviews from Excel</h2>
        <p className="text-sm text-gray-600 mb-4">
          Upload an Excel file with columns: Candidate Name, College, Position, Date, Time, Status, Interviewer, Round
        </p>
        
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-gray-900 transition-colors">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
            id="excel-upload"
          />
          <label htmlFor="excel-upload" className="cursor-pointer">
            <div className="text-4xl mb-2">📊</div>
            <div className="font-semibold mb-1">Click to upload Excel file</div>
            <div className="text-sm text-gray-600">XLSX or XLS format</div>
          </label>
        </div>

        {uploadStatus && (
          <div className={`mt-4 p-4 rounded-lg ${
            uploadStatus.includes("Error") 
              ? "bg-red-50 border border-red-200 text-red-700" 
              : "bg-green-50 border border-green-200 text-green-700"
          }`}>
            {uploadStatus}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">College</label>
            <select
              value={filterCollege}
              onChange={(e) => setFilterCollege(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Colleges</option>
              {uniqueColleges.map((college) => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Interviews Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold">Interview Schedule</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">College</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Round</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interviewer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInterviews.map((interview) => (
                <tr key={interview.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold">{interview.candidateName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700 max-w-xs">{interview.college}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{interview.position}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium">{interview.date}</div>
                      <div className="text-gray-500">{interview.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {interview.round}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">{interview.interviewer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${
                      interview.status === "scheduled" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* College Breakdown */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Army Institute of Technology</h3>
          <div className="text-3xl font-bold mb-2">
            {interviews.filter(i => i.college === "Army Institute of Technology, Pune").length}
          </div>
          <p className="text-sm text-gray-600">Scheduled Interviews</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">COEP Pune</h3>
          <div className="text-3xl font-bold mb-2">
            {interviews.filter(i => i.college === "College of Engineering Pune (COEP)").length}
          </div>
          <p className="text-sm text-gray-600">Scheduled Interviews</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Other Colleges</h3>
          <div className="text-3xl font-bold mb-2">
            {interviews.filter(i => 
              i.college !== "Army Institute of Technology, Pune" && 
              i.college !== "College of Engineering Pune (COEP)"
            ).length}
          </div>
          <p className="text-sm text-gray-600">Scheduled Interviews</p>
        </div>
      </div>
    </main>
  )
}