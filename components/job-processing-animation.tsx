'use client'

import { useState, useEffect } from 'react'
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

interface JobProcessingAnimationProps {
  onComplete: () => void
}

export function JobProcessingAnimation({ onComplete }: JobProcessingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = [
    { text: 'Converting the JD into embeddings by our BERT model...', duration: 2500 },
    { text: 'Converted into embeddings', duration: 2000 },
    { text: 'Job Description posted', duration: 1500 },
    { text: 'Going to Next Step', duration: 1500 }
  ]

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
    <div className={`${jetbrainsMono.className} fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50`}>
      <div className="max-w-2xl w-full px-8">
        <div className="bg-card border border-border rounded-lg p-12 shadow-2xl">
          {/* Icon Animation */}
          <div className="flex justify-center mb-8">
            {currentStep < steps.length - 1 ? (
              <div className="relative">
                <svg
                  className="w-24 h-24 text-primary animate-spin"
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
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="text-8xl animate-bounce">😊</div>
            )}
          </div>

          {/* Step Text */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {steps[currentStep]?.text || 'Processing...'}
            </h2>
            {currentStep < steps.length - 1 && (
              <p className="text-muted-foreground">
                Step {currentStep + 1} of {steps.length - 1}
              </p>
            )}
          </div>

          {/* Progress Bar */}
          {currentStep < steps.length - 1 && (
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-200 ease-linear rounded-full relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{Math.round(progress)}%</span>
                <span>Processing...</span>
              </div>
            </div>
          )}

          {/* Success Message */}
          {currentStep === steps.length - 1 && (
            <div className="text-center">
              <div className="inline-block px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-600 dark:text-green-400 font-semibold">
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