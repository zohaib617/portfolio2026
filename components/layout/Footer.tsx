'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Mohammad Zohaib Shah</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-Driven Web Developer passionate about creating beautiful, functional web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:zohaib92shah@gmail.com"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="tel:+923198251617"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Phone
                </a>
              </li>
              <li>
                <Link href="/personal" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Contact Info
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-slate-400 text-sm">
          <p>
            © {currentYear} Mohammad Zohaib Shah. All rights reserved.
          </p>
          <p className="mt-2">
            Built with{' '}
            <span className="text-red-500">♥</span> using Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
