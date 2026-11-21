import React, { useState } from 'react';
import { 
  Send, 
  Github, 
  Youtube, 
  Mail, 
  Copy, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  Sparkles,
  Cpu
} from 'lucide-react';
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from '../services/github';
import { YOUTUBE_CONFIG } from '../data/youtube';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const contactEmail = 'chundurusaravanasai34@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMessage) return;

    // Build mailto link so user can send easily
    const subject = encodeURIComponent(`Project Collaboration / Query from ${senderName}`);
    const body = encodeURIComponent(`Hi Saravanasai,\n\n${senderMessage}\n\nFrom: ${senderName} (${senderEmail})`);
    
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-mono text-xs mb-3">
            <Send className="w-3.5 h-3.5" />
            <span>COMMUNICATION &amp; COLLABORATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get in Touch
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mt-2 font-medium">
            Interested in technology, building, or collaborating? Get in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Links & Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-[#0d131f] border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-700/50 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">Direct Email</h3>
                    <span className="text-[11px] font-mono text-slate-400">Collaborations &amp; Hardware Queries</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 flex items-center justify-between font-mono text-xs text-slate-200 truncate">
                <span className="truncate mr-2">{contactEmail}</span>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-cyan-400 hover:underline shrink-0 text-[11px]"
                >
                  Open Mail &rarr;
                </a>
              </div>
            </div>

            {/* GitHub Card */}
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-2xl bg-[#0d131f] border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 group-hover:text-cyan-300 transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-200 transition-colors">
                      GitHub Profile
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">@{GITHUB_USERNAME}</span>
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Explore open-source repositories, microcontroller firmware, and project documentation.
              </p>
            </a>

            {/* YouTube Card */}
            <a
              href={YOUTUBE_CONFIG.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-2xl bg-[#0d131f] border border-slate-800 hover:border-red-600/40 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-950/70 border border-red-800/60 text-red-400">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm group-hover:text-red-200 transition-colors">
                      {YOUTUBE_CONFIG.channelName}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">{YOUTUBE_CONFIG.handle}</span>
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Watch circuit builds, breadboard demonstrations, and engineering tutorials on YouTube.
              </p>
            </a>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-[#0b101b] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              Send a Collaboration Note
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Have an embedded project idea, question about a schematic, or want to discuss technology?
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Email Client Triggered</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your message was formatted and redirected to your mail app. You can also copy the email directly above anytime.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-mono text-cyan-400 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Your Name / Handle
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Alex (Robotics Club)"
                      className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    Message / Project Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    placeholder="Tell me about your hardware project, Arduino question, or ideas to collaborate..."
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold text-xs font-mono shadow-md shadow-cyan-950 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via Email</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
