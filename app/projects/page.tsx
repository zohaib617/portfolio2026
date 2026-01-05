'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { resumeLoader } from '@/lib/resumeLoader';

export default function ProjectsPage() {
  const updatedProjects = [
    {
      id: 'gym-management',
      name: 'Gym Management Software',
      description: 'Complete gym management solution with payments, memberships, and reports.',
      features: ['Membership Management', 'Payment Tracking', 'Reports & Analytics', 'Slip Generation'],
      technologies: ['Next.js', 'Tailwind CSS', 'React', 'Node.js'],
      projectUrl: 'https://www.youtube.com/watch?v=TmyQ9leoIOs',
    },
    {
      id: 'billing-system',
      name: 'Billing System',
      description: 'Efficient billing system for businesses with invoice generation and tracking.',
      features: ['Invoice Management', 'Payment Tracking', 'Tax Calculation', 'Reports'],
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Node.js'],
      projectUrl: 'https://www.youtube.com/watch?v=QA5MNxE23dM',
    },
    {
      id: 'installment-app',
      name: 'Vehicle EMI Installment App',
      description: 'Track car & bike EMIs easily with reminders and payment history.',
      features: ['Add Vehicle EMIs', 'Track Due Dates', 'Get Notifications', 'User-Friendly Interface'],
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Node.js'],
      projectUrl: 'https://www.youtube.com/watch?v=jyzzavuqJ0g',
    },
    {
      id: 'physical-ai',
      name: 'Physical AI & Humanoid Robotics',
      description:
        'This project/documentary/book is built on AI-driven development and covers the full journey.',
      features: [
       
        'AI-driven Development Workflow',
        'Integration with RAG Chatbot',
        'Project Documentation with Docusaurus',
      ],
      technologies: ['Speckit Plus', 'Docusaurus (JavaScript)', 'RAG Chatbot', 'Qdrant', 'AI Agent SDK'],
      projectUrl: 'https://www.youtube.com/watch?v=CpF7CLcR4Tw',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section
        className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-900 dark:to-slate-800"
        animate
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Featured Projects
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            Showcasing my best work and innovative projects that demonstrate technical skills,
            creativity, and problem-solving abilities.
          </p>
        </div>
      </Section>

      {/* Projects Grid */}
      <Section title="My Work" subtitle="Project Showcase" dark={false}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updatedProjects.map((project) => (
              <Card
                key={project.id}
                title={project.name}
                subtitle={project.description}
                className="h-full bg-white dark:bg-slate-700 hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="space-y-4 h-full flex flex-col">
                  {/* Project Features */}
                  {project.features && (
                    <div className="flex-grow">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex gap-2 text-sm text-slate-600 dark:text-slate-300"
                          >
                            <span className="text-purple-600 dark:text-purple-400 flex-shrink-0">
                              ✓
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies && (
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">
                        Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="primary" size="sm" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* YouTube Video Embed */}
                  {project.projectUrl && (
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-600">
                      <iframe
                        className="w-full h-48 md:h-56 rounded-md"
                        src={project.projectUrl.replace('watch?v=', 'embed/')}
                        title={project.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects Statistics */}
      <Section dark={true}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Project Impact</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">
                {updatedProjects.length}
              </div>
              <p className="text-slate-300">Featured Projects</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">
                {updatedProjects.reduce((sum, p) => sum + (p.technologies?.length || 0), 0)}
              </div>
              <p className="text-slate-300">Technologies Used</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">∞</div>
              <p className="text-slate-300">Learning Opportunity</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Development Approach */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            My Development Approach
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-slate-700 border-l-4 border-l-purple-600">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                🔍 Specification-Driven
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Every project starts with clear specifications and requirements, ensuring alignment
                with goals and expectations.
              </p>
            </Card>

            <Card className="bg-white dark:bg-slate-700 border-l-4 border-l-purple-600">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                🏗️ Clean Architecture
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Building scalable, maintainable solutions following SOLID principles and best
                practices.
              </p>
            </Card>

            <Card className="bg-white dark:bg-slate-700 border-l-4 border-l-purple-600">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                🤖 AI-Driven Development
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Leveraging AI tools and methodologies to enhance productivity and code quality
                throughout development.
              </p>
            </Card>

            <Card className="bg-white dark:bg-slate-700 border-l-4 border-l-purple-600">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                ✅ Quality Assurance
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Comprehensive testing, code reviews, and validation ensuring robust, reliable
                solutions.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Ready to Collaborate */}
      <Section dark={true} className="bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have an Exciting Project?</h2>
          <p className="text-lg text-purple-100 mb-8">
            I am interested in collaborating on projects that challenge me and create meaningful
            impact.
          </p>
          <a
            href={`mailto:${resumeLoader.getResume().personalInfo.email}`}
            className="inline-block px-8 py-3 bg-white hover:bg-purple-50 text-purple-900 rounded-lg font-medium transition-colors"
          >
            Discuss Your Project
          </a>
        </div>
      </Section>
    </>
  );
}
