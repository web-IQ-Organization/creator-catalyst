// deliverables/creator_catalyst/app/src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center p-4 font-inter">
      <header className="w-full max-w-5xl absolute top-0 pt-8 flex justify-center">
        <nav className="w-full flex justify-between items-center px-4 md:px-8">
          <div className="text-2xl font-bold text-white">Creator Catalyst</div>
          <Link href="/intake" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition duration-200 text-white font-semibold">
            Build My Sprint Plan →
          </Link>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center text-center mt-20 max-w-3xl">
        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
          Turn Your SaaS Into a Creator-Led Growth Machine
        </h1>
        <p className="text-xl md:text-2xl text-zinc-300 mb-10 max-w-2xl">
          Match with the right creators. Run a sprint. See results in weeks.
        </p>
        <Link href="/intake" className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white font-bold text-lg shadow-lg">
          Build My Sprint Plan →
        </Link>
      </main>

      <section className="w-full max-w-5xl mt-24">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Why Creator Catalyst?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-lg">
            <h3 className="text-2xl font-semibold text-indigo-400 mb-4">Smart Creator Matching</h3>
            <p className="text-zinc-400">Our AI-powered engine connects you with the perfect creator archetypes based on your goals and target audience, ensuring optimal fit and impact.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-lg">
            <h3 className="text-2xl font-semibold text-indigo-400 mb-4">Sprint-Based Execution</h3>
            <p className="text-zinc-400">Get a clear, actionable sprint plan with defined tasks, timelines, and deliverables. Focus on results, not endless campaigns.</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-lg">
            <h3 className="text-2xl font-semibold text-indigo-400 mb-4">Revenue-Focused Results</h3>
            <p className="text-zinc-400">Every sprint is designed with clear success metrics aimed at driving awareness, signups, and ultimately, revenue for your SaaS.</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-3xl mt-24 mb-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Pricing</h2>
        <div className="bg-zinc-900 p-10 rounded-xl border border-zinc-800 shadow-lg">
          <p className="text-zinc-300 text-lg mb-4">
            <strong>Sprint Kickoff:</strong> <span className="text-indigo-400 text-2xl font-bold">$1,500</span> (Strategy + Matching)
          </p>
          <p className="text-zinc-300 text-lg mb-6">
            Get your personalized sprint plan, creator matching, and strategy session.
          </p>
          <p className="text-zinc-300 text-lg mb-4">
            <strong>Full Sprint:</strong> <span className="text-indigo-400 text-2xl font-bold">$5,000–$15,000</span> (Execution)
          </p>
          <p className="text-zinc-300 text-lg">
            Implement your sprint plan with chosen creators. Price varies by scope and duration.
          </p>
        </div>
      </section>

      <footer className="w-full max-w-5xl border-t border-zinc-800 py-8 text-center text-zinc-500 text-sm">
        &copy; {new Date().getFullYear()} Creator Catalyst. All rights reserved.
      </footer>
    </div>
  );
}
