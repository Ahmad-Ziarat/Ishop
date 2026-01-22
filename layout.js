import './globals.css'

export const metadata = {
  title: 'Ishop – Complete Mobile Store',
  description: 'Modern, responsive smartphone e-commerce platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
