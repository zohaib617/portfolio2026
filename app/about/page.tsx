'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { resumeLoader } from '@/lib/resumeLoader';

export default function AboutPage() {
  const resume = resumeLoader.getResume();

  return (
    <>
      {/* Hero Section */}
      <Section
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800"
        animate
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            About Me
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            Discover my professional journey, values, and what drives my passion for technology and innovation.
          </p>
        </div>
      </Section>

      {/* Career Objective Section */}
      <Section
        title="Career Objective"
        subtitle="My Professional Vision"
        dark={false}
      >
        <div className="max-w-3xl mx-auto">
          <Card className="bg-blue-50 dark:bg-slate-700 border-blue-200 dark:border-blue-900">
            <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
              {resume.careerObjective}
            </p>
          </Card>
        </div>
      </Section>

      {/* About Details */}
      <Section dark={true}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Who I Am</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">🎯 Focus</h3>
              <p className="text-slate-300 leading-relaxed">
                AI-driven development with a focus on creating scalable, maintainable web applications
                using modern technologies like Next.js, React, and TypeScript.
              </p>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">💡 Philosophy</h3>
              <p className="text-slate-300 leading-relaxed">
                I believe in specification-driven development, clean architecture, and the power of AI
                to augment human productivity and creativity.
              </p>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">📚 Learning</h3>
              <p className="text-slate-300 leading-relaxed">
                Continuous learner passionate about AI, Web3, and emerging technologies. I stay updated
                with industry trends and best practices.
              </p>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">🚀 Goal</h3>
              <p className="text-slate-300 leading-relaxed">
                To build innovative solutions that solve real problems and make a positive impact on
                businesses and communities.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Personal Info Quick Links */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Let&#39;s Connect</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Interested in learning more? Feel free to reach out or explore my portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${resume.personalInfo.email}`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Send Email
            </a>
            <a
              href={`tel:${resume.personalInfo.phone}`}
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
            >
              Call Me
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
