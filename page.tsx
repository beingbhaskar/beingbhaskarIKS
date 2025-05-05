import Quiz from "@/components/quiz"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">Bhaskar Kumar Presents</h1>
          <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">IKS Practice Questions</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Test your knowledge on Indian Knowledge Systems</p>
        </header>
        <Quiz />
      </div>
    </div>
  )
}
