import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-900 via-indigo-900 to-gray-900 min-h-screen text-white">
      {/* Header Section */}
      <header className="flex items-center justify-between p-5 bg-blue-950 shadow-md">
        <h1 className="text-3xl font-bold tracking-wider">PodLearn</h1>
        <nav className="flex items-center gap-5">
          <Link href="/auth/sign-in">
            <button className="bg-blue-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition">
              Sign In
            </button>
          </Link>
          <Link href="/auth/sign-up">
            <button className="bg-white text-blue-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition">
              Sign Up
            </button>
          </Link>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-12">
        <h2 className="text-5xl font-extrabold leading-tight mb-4">
          Welcome to the <span className="text-blue-400">Podcast Learning Platform</span>
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Learn, earn, and grow with our decentralized podcast platform.
        </p>

        <div className="flex space-x-4">
          <Link href="/auth/sign-up">
            <button className="bg-blue-500 px-6 py-3 text-lg rounded-full font-semibold hover:bg-blue-600 transition">
              Get Started
            </button>
          </Link>
          <Link href="/auth/sign-in">
            <button className="bg-gray-700 px-6 py-3 text-lg rounded-full font-semibold hover:bg-gray-800 transition">
              Sign In
            </button>
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-12 px-6 bg-gray-800 mt-10">
        <h3 className="text-2xl font-semibold text-center mb-6">Why Choose PodLearn?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
          <div className="bg-gray-900 p-6 rounded-md text-center">
            <h4 className="text-xl font-bold text-blue-400 mb-3">Decentralized Learning</h4>
            <p>Access a vast repository of learning material designed for growth.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-md text-center">
            <h4 className="text-xl font-bold text-blue-400 mb-3">Earn as You Learn</h4>
            <p>Contribute, grow, and earn rewards as you master new skills.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-md text-center">
            <h4 className="text-xl font-bold text-blue-400 mb-3">Podcast Community</h4>
            <p>Engage with podcasters and listeners to grow your network.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
