'use client';

import Image from 'next/image';
import Link from 'next/link';
import { resumeLoader } from '@/lib/resumeLoader';

export default function Home() {
  const resume = resumeLoader.getResume();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation placeholder - will be replaced with Header component */}
      <nav className="fixed top-0 w-full bg-white dark:bg-slate-900 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Portfolio</h1>
            <Link href="/chat" className="text-primary hover:underline">Chat</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                  {resume.personalInfo.fullName}
                </h1>
                <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 font-semibold">
                  AI-Driven Web Developer
                </p>
                <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">
                  📍 {resume.personalInfo.location}
                </p>
              </div>

              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
                {resume.careerObjective}
              </p>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/about"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  View My Work
                </Link>
                <Link
                  href="/chat"
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
                >
                  Ask My AI Assistant
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {resume.skills.reduce((acc, cat) => acc + cat.items.length, 0)}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Skills</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {resume.projects.length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {resume.certifications.length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Certs</div>
                </div>
              </div>
            </div>

            {/* Right: Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl">
                <Image
                  src="/profile.jpg"
                  alt={resume.personalInfo.fullName}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-slate-900 dark:text-white">
            Featured Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resume.skills.map((skillCategory, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
                  {skillCategory.category}
                </h3>
                <ul className="space-y-2">
                  {skillCategory.items.slice(0, 4).map((skill, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-300">
                      • {skill}
                    </li>
                  ))}
                  {skillCategory.items.length > 4 && (
                    <li className="text-sm text-blue-600 dark:text-blue-400">
                      + {skillCategory.items.length - 4} more
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/skills"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              View all skills →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 dark:bg-blue-900">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">
            Let's Work Together
          </h2>
          <p className="text-xl text-blue-100">
            Interested in learning more? Explore my portfolio or chat with my AI assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-slate-100 transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/chat"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Chat Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">© 2026 Mohammad Zohaib Shah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
