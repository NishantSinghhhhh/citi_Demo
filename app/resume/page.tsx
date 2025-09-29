'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { Footer } from '@/components/footer'
import { JetBrains_Mono } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { ResumeProcessingAnimation } from '@/components/resume-processing-animation'
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function ResumePage() {
  const router = useRouter()
  const [isLoadingResumes, setIsLoadingResumes] = useState(false)
  const [resumesLoaded, setResumesLoaded] = useState(false)
  const [loadedResumes, setLoadedResumes] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  const handleLoadResumes = async () => {
    setIsLoadingResumes(true)

    // Simulate loading resumes from the assets/ENGINEERING folder
    setTimeout(() => {
      const resumes = [
        '10030015.pdf',
        '10219099.pdf',
        '10624813.pdf',
        '10712803.pdf',
        '10985403.pdf',
        '11890896.pdf',
        '11981094.pdf',
        '12011623.pdf',
        '12022566.pdf',
        '12472574.pdf',
        '12488356.pdf',
        '12518008.pdf',
        '12748557.pdf',
        '13149176.pdf',
        '13264796.pdf',
        '14049846.pdf',
        '14208561.pdf',
        '14554542.pdf',
        '15139979.pdf',
        '15601399.pdf',
        '15858254.pdf',
        '15941675.pdf',
        '16803215.pdf',
        '16911115.pdf',
        '17043822.pdf',
        '17103000.pdf',
        '17108676.pdf',
        '17488801.pdf',
        '17926546.pdf',
        '18753387.pdf'
      ]
      setLoadedResumes(resumes)
      setResumesLoaded(true)
      setIsLoadingResumes(false)
    }, 2000)
  }

    const handleAnalyzeCandidates = () => {
        setIsAnalyzing(true)
    }

    const handleAnalysisComplete = () => {
        router.push('/candidates')
    }   

    if (isAnalyzing) {
        return <ResumeProcessingAnimation onComplete={handleAnalysisComplete} />
    }

  return (
    <div className={`${jetbrainsMono.className} min-h-screen flex flex-col`}>
      <DashboardHeader />

      <main className="flex-1 p-8 bg-background">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4">Load Student Resumes</h1>
            <p className="text-xl text-muted-foreground">
              Load resumes from the Engineering student database, we have used our own databse to show you how our process works
            </p>
          </div>

          {/* Load Button Section */}
          {!resumesLoaded ? (
            <div className="border border-border rounded-lg p-8 bg-card">
              <div className="flex flex-col items-center gap-6 py-12">
                <svg
                  className="w-24 h-24 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>

                <div className="text-center">
                  <h3 className="text-2xl font-semibold mb-2">
                    Engineering Students Database
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Click the button below to load all student resumes
                  </p>
                </div>

                <button
                  onClick={handleLoadResumes}
                  disabled={isLoadingResumes}
                  className="px-8 py-4 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 text-lg"
                >
                  {isLoadingResumes ? (
                    <span className="flex items-center gap-3">
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Loading Resumes...
                    </span>
                  ) : (
                    'Load Student Resumes'
                  )}
                </button>
              </div>

              {/* Instructions */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl mb-2">📁</div>
                  <h4 className="font-semibold mb-1">Database Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Access to 30+ engineering student resumes
                  </p>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl mb-2">🤖</div>
                  <h4 className="font-semibold mb-1">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    BERT model will analyze and rank candidates
                  </p>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <h4 className="font-semibold mb-1">Quick Matching</h4>
                  <p className="text-sm text-muted-foreground">
                    Get ranked results in seconds
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Loaded Resumes Display */
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">
                      {loadedResumes.length} Resumes Loaded
                    </h3>
                    <p className="text-muted-foreground">
                      Engineering student database
                    </p>
                  </div>
                  <button
                    onClick={handleAnalyzeCandidates}
                    className="px-8 py-3 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Analyze Candidates
                  </button>
                </div>
              </div>

              {/* Resume List */}
              <div className="border border-border rounded-lg bg-card overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/20">
                  <h3 className="font-semibold text-lg">Loaded Resume Files</h3>
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-4">
                    {loadedResumes.map((resume, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 border border-border rounded hover:bg-muted/20 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-red-500 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm truncate">{resume}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border rounded-lg p-6 bg-card text-center">
                  <div className="text-3xl font-bold mb-1">
                    {loadedResumes.length}
                  </div>
                  <p className="text-muted-foreground text-sm">Total Resumes</p>
                </div>
                <div className="border border-border rounded-lg p-6 bg-card text-center">
                  <div className="text-3xl font-bold mb-1">100%</div>
                  <p className="text-muted-foreground text-sm">Load Success Rate</p>
                </div>
                <div className="border border-border rounded-lg p-6 bg-card text-center">
                  <div className="text-3xl font-bold mb-1">Ready</div>
                  <p className="text-muted-foreground text-sm">Status</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}