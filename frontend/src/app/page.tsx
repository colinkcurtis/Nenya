import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Nenya</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Your personal financial guardian, preserving and protecting your financial future.
      </p>
      <Link 
        href="/budget" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        View Monthly Budget
      </Link>
    </main>
  )
}