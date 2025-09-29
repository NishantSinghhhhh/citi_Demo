'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { Footer } from '@/components/footer'
import { JobProcessingAnimation } from '@/components/job-processing-animation'
import { JetBrains_Mono } from 'next/font/google'
import { useRouter } from 'next/navigation'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function PostJobPage() {
  const router = useRouter()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setUploadedFile(file)
      
      if (file.type === 'application/pdf') {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      }
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setUploadedFile(file)
      
      if (file.type === 'application/pdf') {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

  const handleLoadSamplePDF = async () => {
    try {
      const response = await fetch('/JD_Citi_Bank.pdf')
      const blob = await response.blob()
      const file = new File([blob], 'JD_Citi_Bank.pdf', { type: 'application/pdf' })
      setUploadedFile(file)
      
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } catch (error) {
      console.error('Error loading sample PDF:', error)
      alert('Failed to load sample PDF. Please make sure JD_Citi_Bank.pdf is in the public folder.')
    }
  }

  const handleProcessJob = () => {
    if (!uploadedFile) return
    setIsProcessing(true)
  }

  const handleAnimationComplete = () => {
    router.push('/resume')
  }

  if (isProcessing) {
    return <JobProcessingAnimation onComplete={handleAnimationComplete} />
  }

  return (
    <div className={`${jetbrainsMono.className} min-h-screen flex flex-col`}>
      <DashboardHeader />

      <main className="flex-1 p-8 bg-background">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4">Post a Job</h1>
            <p className="text-xl text-muted-foreground">
              Upload your Job Notification Form (JNF) to find the best candidates
            </p>
          </div>

          {/* Upload Section */}
          {!uploadedFile ? (
            <div className="border border-border rounded-lg p-8 bg-card">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="flex flex-col items-center gap-4">
                  <svg
                    className="w-16 h-16 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Drop your JNF document here
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, DOC, DOCX (Max 10MB)
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <label
                      htmlFor="file-upload"
                      className="px-6 py-3 bg-foreground text-background rounded-lg font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      Choose File
                    </label>
                    <button
                      onClick={handleLoadSamplePDF}
                      className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                    >
                      Use Sample (Citi Bank JD)
                    </button>
                  </div>
                  
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl mb-2">📄</div>
                  <h4 className="font-semibold mb-1">Valid JNF Format</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure your document follows the standard JNF format
                  </p>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl mb-2">✓</div>
                  <h4 className="font-semibold mb-1">Clear Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    Include detailed skill requirements and qualifications
                  </p>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="font-semibold mb-1">AI Matching</h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI will match candidates based on your requirements
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Preview Section */
            <div className="space-y-6">
              {/* File Info Card */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-primary"
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
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{uploadedFile.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => document.getElementById('file-upload-replace')?.click()}
                    className="px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
                  >
                    Replace File
                  </button>
                  <input
                    id="file-upload-replace"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    onClick={handleProcessJob}
                    className="px-6 py-2 bg-foreground text-background rounded font-semibold hover:opacity-90 transition-opacity"
                  >
                    Post Job Description
                  </button>
                </div>
              </div>

              {/* PDF Preview */}
              {previewUrl && (
                <div className="border border-border rounded-lg overflow-hidden bg-card">
                  <div className="p-4 border-b border-border bg-muted/20">
                    <h3 className="font-semibold">Document Preview</h3>
                  </div>
                  <div className="p-4">
                    <iframe
                      src={previewUrl}
                      className="w-full h-[600px] border-0 rounded"
                      title="Document Preview"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}