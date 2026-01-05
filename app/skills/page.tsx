'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Grid from '@/components/ui/Grid';
import { resumeLoader } from '@/lib/resumeLoader';
import { SKILLS_CATEGORIES } from '@/lib/constants';

export default function SkillsPage() {
  const resume = resumeLoader.getResume();

  return (
    <>
      {/* Hero Section */}
      <Section
        className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
        animate
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Skills & Expertise
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            A comprehensive overview of my technical skills, programming languages, tools, and
            specialized expertise across multiple domains.
          </p>
        </div>
      </Section>

      {/* Skills Overview Section */}
      <Section title="My Expertise" subtitle="Skills Overview" dark={false}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {resume.skills.map((category) => (
              <Card key={category.category} className="bg-slate-50 dark:bg-slate-700 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {category.items.length}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{category.category}</p>
              </Card>
            ))}
          </div>

          {/* Detailed Skills by Category */}
          <div className="space-y-8">
            {resume.skills.map((category) => {
              const categoryColor = SKILLS_CATEGORIES[category.category as keyof typeof SKILLS_CATEGORIES] || {
                color: 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100',
                borderColor: 'border-blue-300 dark:border-blue-700',
              };

              return (
                <div key={category.category}>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="default"
                        size="md"
                        className={categoryColor.color + ' ' + categoryColor.borderColor}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Technical Focus Section */}
      <Section dark={true}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Technical Focus Areas</h2>

          <Grid columns={{ mobile: 1, tablet: 1, desktop: 2 }} gap="lg">
            <Card className="bg-slate-800 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">🔧 Full-Stack Development</h3>
              <p className="text-slate-300 leading-relaxed">
                Expertise in building complete web applications with modern frameworks and
                technologies. Proficient in both frontend and backend development with a focus on
                scalability and maintainability.
              </p>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">🤖 AI-Driven Development</h3>
              <p className="text-slate-300 leading-relaxed">
                Specialized in AI-driven development methodologies using tools like Claude Code,
                Spec-Kit Plus, and AI agents. Leveraging AI to augment productivity and code
                quality.
              </p>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">💻 Frontend Excellence</h3>
              <p className="text-slate-300 leading-relaxed">
                Strong focus on building intuitive, responsive, and accessible user interfaces
                using React, Next.js, and Tailwind CSS. Creating delightful user experiences with
                smooth animations and interactions.
              </p>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">🏗️ Architecture & Design</h3>
              <p className="text-slate-300 leading-relaxed">
                Expertise in designing clean, scalable architectures following SOLID principles.
                Specification-driven development ensuring clear communication and maintainable
                codebases.
              </p>
            </Card>
          </Grid>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Collaborate?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Let&#39;s discuss how these skills can add value to your project or organization.
          </p>
          <a
            href={`mailto:${resume.personalInfo.email}`}
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </Section>
    </>
  );
}
