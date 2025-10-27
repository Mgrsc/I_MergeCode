import './globals.css'

export const metadata = {
  title: 'I_MergeCode - Intelligent Code Merger',
  description: 'Intelligently merge AI-generated code changes with your original code',
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
