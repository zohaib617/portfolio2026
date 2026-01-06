'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { resumeLoader } from '@/lib/resumeLoader';

export default function CertificationsPage() {
  const resume = resumeLoader.getResume();

  return (
    <>
      {/* Hero Section */}
      <Section
        className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800"
        animate
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Certifications
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            Professional certifications validating expertise and commitment to continuous learning
            and skill development.
          </p>
        </div>
      </Section>

      {/* Certifications Grid */}
      <Section title="Professional Credentials" subtitle="Earned Certifications" dark={false}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resume.certifications.map((cert) => (
              <Card
                key={cert.id || cert.title}
                title={cert.name || cert.title}
                subtitle={cert.issuer}
                className="bg-white dark:bg-slate-700 border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">{cert.description || cert.title}</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="warning" size="sm">
                      📅 {cert.year}
                    </Badge>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Badge variant="primary" size="sm">
                          🔗 View Credential
                        </Badge>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Certifications Stats */}
      <Section dark={true}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Certification Impact</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {resume.certifications.length}
              </div>
              <p className="text-slate-300">Professional Certifications</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {new Date().getFullYear() - (resume.certifications[0]?.year ? parseInt(resume.certifications[0].year.toString()) - 1 : 0)}
              </div>
              <p className="text-slate-300">Years of Credential Progress</p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
              <p className="text-slate-300">Commitment to Excellence</p>
            </div>
          </div>

          {/* Why Certifications Matter */}
          <div className="mt-12 space-y-6">
            <h3 className="text-2xl font-bold text-white">Why These Matter</h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
    <h4 className="text-lg font-bold 
                   text-slate-900 dark:text-slate-100 
                   mb-3">
      ✓ Expertise Validation
    </h4>
    <p className="text-slate-600 dark:text-slate-300">
      Certifications demonstrate verified knowledge and mastery in specific domains and
      technologies.
    </p>
  </Card>

  <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
    <h4 className="text-lg font-bold 
                   text-slate-900 dark:text-slate-100 
                   mb-3">
      ✓ Professional Growth
    </h4>
    <p className="text-slate-600 dark:text-slate-300">
      Continuous pursuit of certifications reflects commitment to staying current with
      industry standards.
    </p>
  </Card>

  <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
    <h4 className="text-lg font-bold 
                   text-slate-900 dark:text-slate-100 
                   mb-3">
      ✓ Industry Recognition
    </h4>
    <p className="text-slate-600 dark:text-slate-300">
      Recognized credentials from respected organizations enhance professional
      credibility.
    </p>
  </Card>

  <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
    <h4 className="text-lg font-bold 
                   text-slate-900 dark:text-slate-100 
                   mb-3">
      ✓ Practical Skills
    </h4>
    <p className="text-slate-600 dark:text-slate-300">
      Certification programs focus on practical, real-world skills applicable to
      professional work.
    </p>
  </Card>
</div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Verified Expertise
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            These certifications validate my dedication to professional excellence and continuous
            skill development.
          </p>
        </div>
      </Section>
    </>
  );
}
