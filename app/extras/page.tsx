'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { resumeLoader } from '@/lib/resumeLoader';

export default function ExtrasPage() {
  const resume = resumeLoader.getResume();


  return (
    <>
      {/* Hero Section */}
      <Section
        className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
        animate
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Additional Information
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            Languages, achievements, and other notable accomplishments that complement my
            professional profile.
          </p>
        </div>
      </Section>

      {/* Languages Section */}
      <Section title="Languages" subtitle="Communication Skills" dark={false}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resume.languages.map((lang) => (
              <Card
                key={lang.id || lang.language}
                title={lang.name || lang.language}
                className="bg-white dark:bg-slate-700"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-grow">
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            lang.proficiency === 'Native'
                              ? 'w-full bg-green-500'
                              : lang.proficiency === 'Fluent'
                              ? 'w-4/5 bg-blue-500'
                              : lang.proficiency === 'Intermediate'
                              ? 'w-3/5 bg-amber-500'
                              : 'w-2/5 bg-slate-400'
                          }`}
                        />
                      </div>
                    </div>
                    <Badge
                      variant={
                        lang.proficiency === 'Native'
                          ? 'success'
                          : lang.proficiency === 'Fluent'
                          ? 'primary'
                          : lang.proficiency === 'Intermediate'
                          ? 'warning'
                          : 'default'
                      }
                      size="sm"
                    >
                      {lang.proficiency}
                    </Badge>
                  </div>

                  {lang.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {lang.description}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Achievements Section */}
      {resume.achievements && resume.achievements.length > 0 && (
        <Section dark={true}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Notable Achievements</h2>

            <div className="space-y-6">
              {resume.achievements.map((achievement, idx) => (
                <Card
                  key={idx}
                  className="bg-slate-800 border-l-4 border-l-green-500 hover:border-l-green-400 transition-colors"
                >
                  <div className="flex gap-4">
                    <div className="text-3xl flex-shrink-0">🏆</div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {achievement}
                      </h3>
                      <p className="text-slate-300">{achievement}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* About Languages & Communication */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Global Communication
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-slate-700">
              <div className="text-center">
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Multilingual
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Ability to communicate effectively in multiple languages enhances collaboration
                  on international projects.
                </p>
              </div>
            </Card>

            <Card className="bg-white dark:bg-slate-700">
              <div className="text-center">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Clear Communication
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Strong communication skills ensure clear understanding across technical and
                  non-technical stakeholders.
                </p>
              </div>
            </Card>

            <Card className="bg-white dark:bg-slate-700">
              <div className="text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Team Collaboration
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Linguistic diversity supports effective teamwork in diverse, multicultural
                  environments.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Recognition & Summary */}
      <Section dark={true} className="bg-gradient-to-r from-indigo-900 to-blue-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Beyond the Basics</h2>
          <p className="text-lg text-indigo-100 mb-8">
            These additional skills and achievements represent my commitment to continuous growth
            and excellence in all areas of professional development.
          </p>
        </div>
      </Section>
    </>
  );
}
