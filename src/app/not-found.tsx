import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center">
      <p className="text-amber-600 font-bold text-6xl mb-6">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Page not found</h1>
      <p className="text-gray-600 mb-10 text-lg">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="px-6 py-2.5 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors"
        >
          Back to home
        </Link>
        <Link
          href="/stories"
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md font-medium hover:border-gray-400 transition-colors"
        >
          Read stories
        </Link>
      </div>
    </div>
  );
}
