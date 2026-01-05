'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const roles = [
    'AI Engineer',
    'AI Chatbot Expert',
    'AI-Driven Developer',
    'Web Developer',
    'Backend Expert',
    'Software Developer',
    'AI Agent Expert',
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

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
        {/* Background Orbs */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center" variants={container} initial="hidden" animate="show">
            {/* LEFT */}
            <motion.div className="space-y-6" variants={item}>
              <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {resume.personalInfo.fullName}
              </h1>

              <div className="h-10 text-2xl font-semibold text-blue-600 dark:text-blue-400">
                {mounted && (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentRoleIndex}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      {roles[currentRoleIndex]}
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-400">📍 {resume.personalInfo.location}</p>

              <p className="text-lg text-slate-700 dark:text-slate-300 max-w-xl">{resume.careerObjective}</p>

              {/* Buttons */}
              <div className="flex gap-4 flex-wrap">
                <Link href="/projects">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl"
                  >
                    View My Work
                  </motion.button>
                </Link>
                <Link href="/chat">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  >
                    Ask AI Assistant
                  </motion.button>
                </Link>
              </div>

              {/* Social Icons */}
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
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-80 h-80 overflow-visible">
                {/* Circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 shadow-2xl" />
                {/* Glow */}
                <div className="absolute inset-0 rounded-full bg-indigo-500/40 blur-3xl scale-110 -z-10" />

                <motion.div
                  className="absolute inset-0 flex justify-center items-start z-10 pointer-events-none"
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="relative w-[170%] h-[210%] -top-56">
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
                      <Badge key={`${s}-${i}`} size="sm">
                        {s}
                      </Badge>
                    ))}
                    {skill.items.length > 3 && <Badge size="sm">+{skill.items.length - 3}</Badge>}
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
                  {/* Optional YouTube Embed */}
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
