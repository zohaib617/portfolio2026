'use client';

import Section from '@/components/ui/Section';
import Timeline from '@/components/ui/Timeline';
import Card from '@/components/ui/Card';
import { resumeLoader } from '@/lib/resumeLoader';

export default function EducationPage() {
  const resume = resumeLoader.getResume();

  // Transform education data to timeline format
  const educationTimeline = resume.education.map((edu) => ({
    id: edu.id || `edu-${edu.degree}-${edu.year}`,
    date: edu.year.toString(),
    title: edu.degree,
    subtitle: edu.institution,
    description: edu.details || `${edu.degree} from ${edu.institution}`,
  }));

  return (
    <>
      {/* Hero Section */}
      <Section
        className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
        animate
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
            Education
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            My academic background and learning journey that shaped my professional expertise.
          </p>
        </div>
      </Section>

      {/* Education Timeline */}
      <Section title="Academic Background" subtitle="Educational Journey" dark={false}>
        <div className="max-w-3xl mx-auto">
          <Timeline items={educationTimeline} />
        </div>
      </Section>

      {/* Education Highlights */}
<Section dark={true}>
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-white mb-12">Learning Highlights</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold 
                       text-slate-900 dark:text-slate-100 
                       mb-3">
          📚 Comprehensive Curriculum
        </h3>
        <p className="text-sm leading-relaxed
                      text-slate-600 dark:text-slate-300">
          Studied a well-rounded curriculum covering software engineering, web technologies,
          and modern development practices.
        </p>
      </Card>

      <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold 
                       text-slate-900 dark:text-slate-100 
                       mb-3">
          🎓 Quality Institutions
        </h3>
        <p className="text-sm leading-relaxed
                      text-slate-600 dark:text-slate-300">
          Education from reputable institutions that emphasize practical skills and
          theoretical knowledge in computer science.
        </p>
      </Card>

      <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold 
                       text-slate-900 dark:text-slate-100 
                       mb-3">
          🚀 Continuous Learning
        </h3>
        <p className="text-sm leading-relaxed
                      text-slate-600 dark:text-slate-300">
          Beyond formal education, I continuously learn emerging technologies and stay
          updated with industry trends.
        </p>
      </Card>
    </div>
  </div>
</Section>

      {/* CTA Section */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Continuous Learner
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Always seeking to expand knowledge and skills in emerging technologies and best
            practices.
          </p>
        </div>
      </Section>
    </>
  );
}
