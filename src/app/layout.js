import './globals.css'
import Header from './_components/Header'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
