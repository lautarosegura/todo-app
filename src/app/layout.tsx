import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Todo App',
    description: 'Simple todo app built with Next.js 13 and TailwindCSS'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body>{children}</body>
        </html>
    )
}
