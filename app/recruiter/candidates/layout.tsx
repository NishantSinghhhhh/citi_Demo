import { JetBrains_Mono } from 'next/font/google'
// import AppSidebar from "../../../components/AppSidebar"

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})


export default function CandidatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${jetbrainsMono.className} flex h-screen`}>
      {/* <AppSidebar /> */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}