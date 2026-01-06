'use client';

import Section from '@/components/ui/Section';
import Timeline from '@/components/ui/Timeline';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { resumeLoader } from '@/lib/resumeLoader';

export default function ExperiencePage() {
  const resume = resumeLoader.getResume();

  // Transform experience data to timeline format
  const experienceTimeline = resume.experience.map((exp) => ({
    id: exp.id || `exp-${exp.role}-${exp.company}`,
    date: exp.duration || `${exp.startDate} - ${exp.endDate || 'Present'}`,
    title: exp.position || exp.role,
    subtitle: exp.company,
    description: (
      <div className="space-y-4">
        <p className="text-slate-700 dark:text-slate-300">{exp.description || exp.role}</p>

        {exp.responsibilities && exp.responsibilities.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              Key Responsibilities:
            </h4>
            <ul className="space-y-2">
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-blue-600 dark:text-blue-400 flex-shrink-0">▸</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {exp.technologies && exp.technologies.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              Technologies Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <Badge key={tech} variant="primary" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {exp.achievements && exp.achievements.length > 0 && (
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              Key Achievements:
            </h4>
            <ul className="space-y-2">
              {exp.achievements.map((achievement, idx) => (
                <li key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-green-600 dark:text-green-400 flex-shrink-0">✓</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ),
  }));

  return (
    <>
      {/* Hero Section */}
      <Section
        className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800"
        animate
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Professional Experience
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            My career journey showcasing roles, responsibilities, achievements, and the impact
            I have made in organizations.
          </p>
        </div>
      </Section>

      {/* Experience Timeline */}
      <Section title="Career Journey" subtitle="Professional Timeline" dark={false}>
        <div className="max-w-3xl mx-auto">
          <Timeline items={experienceTimeline} />
        </div>
      </Section>

      {/* Experience Highlights */}
<Section dark={true}>
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-white mb-12">Professional Strengths</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold 
                       text-slate-900 dark:text-slate-100 
                       mb-3">
          🚀 Project Leadership
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Experienced in leading projects from conception to deployment, ensuring timely
          delivery and high quality standards.
        </p>
      </Card>

      <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold 
                       text-slate-900 dark:text-slate-100 
                       mb-3">
          👥 Team Collaboration
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Strong collaborative skills working with cross-functional teams to achieve common
          goals and deliver exceptional results.
        </p>
      </Card>

      <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold 
                       text-slate-900 dark:text-slate-100 
                       mb-3">
          🎯 Problem Solving
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Analytical mindset with ability to break down complex problems and develop scalable
          solutions.
        </p>
      </Card>

      <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold 
                       text-slate-900 dark:text-slate-100 
                       mb-3">
          📈 Continuous Improvement
        </h3>
        <p className="text-slate-600 dark:text-slate-300">
          Committed to continuous learning and implementing best practices to enhance
          productivity and code quality.
        </p>
      </Card>
    </div>
  </div>
</Section>

      {/* What I Bring Section */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            What I Bring to Your Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  💻
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Technical Excellence
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Deep expertise in full-stack development with modern technologies and best
                  practices.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  🎯
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Result Oriented
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Focused on delivering measurable results that align with business objectives.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  🤝
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Strong Communicator
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Clear communication with stakeholders and team members at all levels.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  📚
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Continuous Learner
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Always updating skills and staying ahead of industry trends and technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section dark={true} className="bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Let&#39;s Work Together</h2>
          <p className="text-lg text-blue-100 mb-8">
            Interested in collaborating? I am open to exciting opportunities and challenging
            projects.
          </p>
          <a
            href={`mailto:${resumeLoader.getResume().personalInfo.email}`}
            className="inline-block px-8 py-3 bg-white hover:bg-blue-50 text-blue-900 rounded-lg font-medium transition-colors"
          >
            Send me an Email
          </a>
        </div>
      </Section>
    </>
  );
}
