'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { resumeLoader } from '@/lib/resumeLoader';

export default function PersonalPage() {
  const resume = resumeLoader.getResume();

  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: resume.personalInfo.email,
      href: `mailto:${resume.personalInfo.email}`,
      type: 'email',
    },
    {
      icon: '📱',
      label: 'Phone',
      value: resume.personalInfo.phone,
      href: `tel:${resume.personalInfo.phone}`,
      type: 'phone',
    },
    {
      icon: '📍',
      label: 'Location',
      value: resume.personalInfo.location,
      href: null,
      type: 'location',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section
        className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
        animate
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            Let&#39;s connect and explore opportunities to collaborate on exciting projects or discuss
            how I can contribute to your organization.
          </p>
        </div>
      </Section>

      {/* Contact Information */}
      <Section title="Contact Information" subtitle="How to Reach Me" dark={false}>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method) => (
              <div key={method.label}>
                {method.href ? (
                  <a href={method.href}>
                    <Card className="bg-white dark:bg-slate-700 h-full hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                      <div className="text-center">
                        <div className="text-4xl mb-4">{method.icon}</div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                          {method.label}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 break-all">
                          {method.value}
                        </p>
                      </div>
                    </Card>
                  </a>
                ) : (
                  <Card className="bg-white dark:bg-slate-700 h-full">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{method.icon}</div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {method.label}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">{method.value}</p>
                    </div>
                  </Card>
                )}
              </div>
            ))}
          </div>

          {/* Quick Contact Section */}
          <div className="bg-blue-50 dark:bg-slate-700 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Quick Connect
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              Feel free to reach out directly via email or phone. I typically respond within 24
              hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${resume.personalInfo.email}`}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-center"
              >
                Send Email
              </a>
              <a
                href={`tel:${resume.personalInfo.phone}`}
                className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-600 rounded-lg font-medium transition-colors text-center"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Personal Information */}
      <Section dark={true}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">About Me</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">👤 Personal Details</h3>
              <div className="space-y-3 text-slate-300">
                <div>
                  <p className="text-sm text-slate-400">Full Name</p>
                  <p className="font-medium">{resume.personalInfo.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Date of Birth</p>
                  <p className="font-medium">{resume.personalInfo.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="font-medium">{resume.personalInfo.location}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">💼 Professional Details</h3>
              <div className="space-y-3 text-slate-300">
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <a
                    href={`mailto:${resume.personalInfo.email}`}
                    className="font-medium text-blue-400 hover:text-blue-300"
                  >
                    {resume.personalInfo.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <a
                    href={`tel:${resume.personalInfo.phone}`}
                    className="font-medium text-blue-400 hover:text-blue-300"
                  >
                    {resume.personalInfo.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Time Zone</p>
                  <p className="font-medium">PKT (Pakistan Standard Time)</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Why Connect */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Why Connect With Me?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                🎯 Results-Focused
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                I am committed to delivering solutions that meet objectives and exceed expectations.
              </p>
            </Card>

            <Card className="bg-white dark:bg-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                🚀 Innovation-Driven
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Always exploring new technologies and methodologies to solve problems creatively.
              </p>
            </Card>

            <Card className="bg-white dark:bg-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                💡 Problem Solver
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                I approach challenges analytically and develop thoughtful, scalable solutions.
              </p>
            </Card>

            <Card className="bg-white dark:bg-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                🤝 Team Player
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Collaborative approach ensures seamless integration and effective teamwork.
              </p>
            </Card>

            <Card className="bg-white dark:bg-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                📈 Growth Mindset
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Continuous learner committed to personal and professional development.
              </p>
            </Card>

            <Card className="bg-white dark:bg-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                ⏰ Reliable
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Dependable professional who meets deadlines and maintains high quality standards.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section dark={true} className="bg-gradient-to-r from-teal-900 to-blue-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Let&#39;s Start Something Great</h2>
          <p className="text-lg text-teal-100 mb-8">
            Whether you have a project in mind, a position to discuss, or just want to connect,
            I would love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${resume.personalInfo.email}?subject=Let's%20Connect`}
              className="px-8 py-3 bg-white hover:bg-teal-50 text-teal-900 rounded-lg font-medium transition-colors"
            >
              Send Email
            </a>
            <a
              href={`tel:${resume.personalInfo.phone}`}
              className="px-8 py-3 border-2 border-white text-white hover:bg-teal-800 rounded-lg font-medium transition-colors"
            >
              Call Me
            </a>
          </div>
          <p className="text-teal-100 text-sm mt-6">
            Looking forward to connecting and exploring opportunities together!
          </p>
        </div>
      </Section>
    </>
  );
}
