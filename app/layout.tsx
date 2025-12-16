import './globals.css'

export const metadata = {
  title: 'I_MergeCode v2 - Intelligent Code Merger',
  description: 'Intelligently merge AI-generated code changes with real-time diff preview',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
