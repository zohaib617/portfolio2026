'use client';

import { useState, useEffect } from 'react';
import ChatWindow from '@/components/chat/ChatWindow';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

export default function ChatPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Section
        className="bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden"
        animate={false}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-6">
              <span className="text-2xl">🤖</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              AI Portfolio Assistant
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Have questions about my skills, experience, or projects? Chat with my AI assistant
              powered by Claude.
            </p>
          </div>
        </div>
      </Section>

      {/* Chat Container */}
      <Section className="bg-slate-50 dark:bg-slate-900/50 py-8 md:py-12">

        <div className="max-w-4xl mx-auto">
          <div className="min-h-screen md:min-h-0 md:h-[700px]">

            {isMounted && (
              <ChatWindow
                initialMessage="👋 Hi! I'm Mohammad's AI Resume Assistant. I can help you learn about his experience, skills, projects, education, certifications, and more. Feel free to ask me anything!"
                title="Chat with Mohammad's AI Assistant"
                description="Ask about experience, skills, projects, education, and certifications"
              />
            )}
          </div>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section title="How It Works" subtitle="AI Assistant Features" dark={false}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  AI Powered
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Built with Claude AI, providing intelligent and contextual responses about my
                  professional background.
                </p>
              </div>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Resume Grounded
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  All responses are based on my actual resume and portfolio data. No fabricated
                  information.
                </p>
              </div>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Conversational
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Ask follow-up questions and have natural conversations about my skills and
                  experience.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section dark={true}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">
                What can I ask the AI assistant?
              </h3>
              <p className="text-slate-300">
                You can ask about my professional experience, technical skills, completed projects,
                education, certifications, languages, and achievements. The assistant will provide
                relevant information from my resume.
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">
                Is the information accurate?
              </h3>
              <p className="text-slate-300">
                Yes! All responses are based on my actual resume and portfolio data. The AI
                assistant is constrained to only use verified information from my professional
                profile.
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">
                Can I have a multi-turn conversation?
              </h3>
              <p className="text-slate-300">
                Absolutely! The chat maintains conversation history, so you can ask follow-up
                questions and have natural conversations about any aspect of my background.
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">
                What if you ask something not in my resume?
              </h3>
              <p className="text-slate-300">
                The assistant will let you know that the information is not available in my
                portfolio and suggest asking about areas where I do have documented expertise.
              </p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">
                How quickly do I get responses?
              </h3>
              <p className="text-slate-300">
                Responses are generated in real-time using Claude AI. Most messages receive a
                response within a few seconds, depending on server load.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Learn More?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Scroll up to chat with my AI assistant, or explore my portfolio pages for more
            detailed information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/about"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              About Me
            </a>
            <a
              href="/projects"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg font-medium transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              View Projects
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}