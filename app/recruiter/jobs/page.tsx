"use client"

import { useState, useEffect, useMemo } from 'react'
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

interface JobProcessingAnimationProps {
  onComplete: () => void
}

function JobProcessingAnimation({ onComplete }: JobProcessingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = useMemo(() => [
    { text: 'Converting the JD into embeddings by our BERT model...', duration: 2500 },
    { text: 'Converted into embeddings', duration: 2000 },
    { text: 'Job Description posted', duration: 1500 },
    { text: 'Going to Next Step', duration: 1500 }
  ], [])

  useEffect(() => {
    if (currentStep >= steps.length) {
      setTimeout(() => {
        onComplete()
      }, 1000)
      return
    }

    const stepDuration = steps[currentStep].duration
    const interval = 20
    const increment = 100 / (stepDuration / interval)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            setCurrentStep((step) => step + 1)
            setProgress(0)
          }, 200)
          return 100
        }
        return Math.min(prev + increment, 100)
      })
    }, interval)

    return () => clearInterval(progressInterval)
  }, [currentStep, onComplete, steps])

  return (
    <div className={`${jetbrainsMono.className} fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50`}>
      <div className="max-w-2xl w-full px-8">
        <div className="bg-white border border-gray-200 rounded-lg p-12 shadow-2xl">
          {/* Icon Animation */}
          <div className="flex justify-center mb-8">
            {currentStep < steps.length - 1 ? (
              <div className="relative">
                <svg
                  className="w-24 h-24 text-gray-900 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ animationDuration: '2s' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-900 rounded-full animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="text-8xl">✅</div>
            )}
          </div>

          {/* Step Text */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {steps[currentStep]?.text || 'Processing...'}
            </h2>
            {currentStep < steps.length - 1 && (
              <p className="text-gray-600">
                Step {currentStep + 1} of {steps.length - 1}
              </p>
            )}
          </div>

          {/* Progress Bar */}
          {currentStep < steps.length - 1 && (
            <div className="space-y-2">
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gray-900 transition-all duration-200 ease-linear rounded-full relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{Math.round(progress)}%</span>
                <span>Processing...</span>
              </div>
            </div>
          )}

          {/* Success Message */}
          {currentStep === steps.length - 1 && (
            <div className="text-center">
              <div className="inline-block px-6 py-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-semibold">
                  Ready to find candidates!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  )
}

export default function Page() {
  const [showAnimation, setShowAnimation] = useState(false)
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowAnimation(true)
  }

  const handleAnimationComplete = () => {
    setShowAnimation(false)
    // Reset form
    setJobTitle('')
    setJobDescription('')
    setSelectedFile(null)
  }

  return (
    <>
      {showAnimation && <JobProcessingAnimation onComplete={handleAnimationComplete} />}
      
      <main className={`${jetbrainsMono.className} p-8 bg-white`}>
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Job Postings</h1>
          <p className="mt-2 text-gray-600">Manage openings, pipelines, and applications.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">💼</div>
              <div className="text-sm text-gray-600">Active Jobs</div>
            </div>
            <div className="text-3xl font-bold">47</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">📝</div>
              <div className="text-sm text-gray-600">Draft Jobs</div>
            </div>
            <div className="text-3xl font-bold">12</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">👥</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </div>
            <div className="text-3xl font-bold">3,421</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">⏱️</div>
              <div className="text-sm text-gray-600">Avg. Time to Fill</div>
            </div>
            <div className="text-3xl font-bold">18d</div>
          </div>
        </div>

        {/* Upload Job Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Post New Job</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="e.g. Senior Software Engineer"
                required
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 min-h-[200px]"
                placeholder="Describe the role, responsibilities, requirements..."
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2">Upload Job Description (Optional)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-gray-900 transition-colors">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">📄</div>
                  <div className="font-semibold mb-1">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                  </div>
                  <div className="text-sm text-gray-600">
                    PDF, DOC, DOCX, or TXT (max 10MB)
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              >
                Post Job & Generate Embeddings
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-white border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </div>

        {/* Recent Job Postings */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Recent Job Postings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applications</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posted</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Senior Software Engineer</td>
                  <td className="px-6 py-4 text-gray-600">Engineering</td>
                  <td className="px-6 py-4 font-semibold">124</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">2 days ago</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Product Manager</td>
                  <td className="px-6 py-4 text-gray-600">Product</td>
                  <td className="px-6 py-4 font-semibold">89</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">5 days ago</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">UX Designer</td>
                  <td className="px-6 py-4 text-gray-600">Design</td>
                  <td className="px-6 py-4 font-semibold">56</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">1 week ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}