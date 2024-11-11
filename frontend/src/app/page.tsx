import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">nenya 0</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Your personal financial guardian.
      </p>
      <Link
        href="/budget"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Budget
      </Link>
    </main>
  )
}
