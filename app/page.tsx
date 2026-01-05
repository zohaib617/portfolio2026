'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Removed AnimatePresence as it's not needed for this typewriter
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { resumeLoader } from '@/lib/resumeLoader';
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from 'react-icons/fa';

export default function Home() {
  const resume = resumeLoader.getResume();
  const [mounted, setMounted] = useState(false);

const roles = [
  'AI Engineer',
  'Full-Stack Developer',
  'Backend Developer (Python & SQL)',
  'AI Chatbot & Agent Developer',
  'Modern Web Developer (Next.js)',
  'AI-Driven Software Developer',
];


  // Typewriter States
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const currentFullText = roles[currentRoleIndex] || '';
    const typingSpeed = isDeleting ? 70 : 30;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Character by character typing
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000); // Pause at end
        }
      } else {
        // Character by character deleting
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const item = { hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  const socialLinks = [
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/zohaib-shah-b58252386/' },
    { icon: <FaGithub />, url: 'https://github.com/zohaib617' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/syedshah8722/' },
    { icon: <FaFacebook />, url: 'https://web.facebook.com/iam.single.9828' },
    { icon: <FaTwitter />, url: 'https://x.com/shah_zohai48222' },
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <Section
        animate={false}
        className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-[#020617] dark:via-slate-900 dark:to-[#020617]"
      >
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center" variants={container} initial="hidden" animate="show">
            {/* LEFT */}
            <motion.div className="space-y-6" variants={item}>
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                  <span className="block text-slate-900 dark:text-white">I&apos;m</span>
                  <span className="relative inline-block">
                    <span className="absolute -inset-1 blur-2xl bg-blue-600/30 dark:bg-blue-400/20 rounded-full" />
                    <span className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-500 bg-clip-text text-transparent">
                      {resume.personalInfo.fullName}
                    </span>
                  </span>
                </h1>
              </div>

              {/* Typewriter Display */}
              <div className="h-10 text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono flex items-center">
                <span>{mounted ? displayText : ''}</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="ml-1 inline-block w-1 h-8 bg-blue-600 dark:bg-blue-400"
                />
              </div>

              <p className="text-slate-600 dark:text-slate-400">📍 {resume.personalInfo.location}</p>

              <p className="text-lg text-slate-700 dark:text-slate-300 max-w-xl">{resume.careerObjective}</p>

<div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
  <Link href="/projects" className="flex-1">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full h-[52px] flex items-center justify-center px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl text-sm font-semibold transition-all"
    >
      View My Work
    </motion.button>
  </Link>

  <Link href="/chat" className="flex-1">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full h-[52px] flex items-center justify-center px-8 rounded-xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 text-sm font-semibold bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
    >
      Ask AI Assistant
    </motion.button>
  </Link>
</div>

              <div className="flex gap-4 mt-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-2xl text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — IMAGE POP-OUT */}
            <motion.div
              className="flex justify-center lg:justify-end top-10 lg:top-0 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 shadow-[0_0_50px_rgba(37,99,235,0.3)]" />
                <div className="absolute inset-[-15px] rounded-full border-2 border-dashed border-blue-400/30 animate-[spin_20s_linear_infinite]" />
                <motion.div
                  className="absolute inset-0 flex justify-center items-start z-10 pointer-events-none"
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="relative w-[170%] h-[210%] -top-56 lg:-top-64 ">
                    <Image
                      src="/profile.png"
                      alt={resume.personalInfo.fullName}
                      fill
                      priority
                      className="object-contain scale-110 drop-shadow-[0_55px_60px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* ================= SKILLS ================= */}
      <Section title="Featured Skills" subtitle="Core Competencies">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {resume.skills.map((skill, idx) => (
              <motion.div key={skill.category ?? idx} variants={item}>
                <Card animate={false} className="hover:shadow-lg transition-shadow">
                  <h3 className="font-bold mb-4">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.slice(0, 3).map((s, i) => (
                      <Badge key={`${s}-${i}`} size="sm" variant="primary">
                        {s}
                      </Badge>
                    ))}
                    {skill.items.length > 3 && <Badge size="sm" variant="default">+{skill.items.length - 3}</Badge>}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ================= PROJECTS ================= */}
      <Section title="Featured Projects" subtitle="Recent Work" dark>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {resume.projects.slice(0, 3).map((project, idx) => (
              <motion.div key={project.title ?? idx} variants={item}>
                <Card
                  title={project.title}
                  subtitle={project.description}
                  animate={false}
                  hover
                >
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <Badge key={`${tech}-${i}`} variant="info" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.projectUrl && (
                    <div className="mt-4">
                      <iframe
                        className="w-full h-40 rounded-md"
                        src={project.projectUrl.replace('watch?v=', 'embed/')}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>
    </>
  );
}