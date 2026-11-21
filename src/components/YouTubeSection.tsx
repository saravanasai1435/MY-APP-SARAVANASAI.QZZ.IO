import React, { useState } from 'react';
import { 
  Youtube, 
  Play, 
  ExternalLink, 
  Radio, 
  CheckCircle2, 
  Tv, 
  Clock, 
  Sliders, 
  X,
  ArrowUpRight 
} from 'lucide-react';
import { YOUTUBE_CONFIG } from '../data/youtube';
import { YouTubeVideo } from '../types';

export const YouTubeSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);

  return (
    <section id="youtube" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-950/60 border border-red-800/60 text-red-400 font-mono text-xs mb-3">
              <Youtube className="w-3.5 h-3.5" />
              <span>YOUTUBE CHANNEL • @ELECTROTECH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {YOUTUBE_CONFIG.channelName}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-1.5">
              Hands-on video walkthroughs, circuit breadboard testing, hardware demonstrations, and microcontroller programming guides.
            </p>
          </div>

          <a
            href={YOUTUBE_CONFIG.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="youtube-channel-subscribe-btn"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-mono text-xs font-semibold shadow-lg shadow-red-950/60 transition-all self-start sm:self-auto group"
          >
            <Youtube className="w-4 h-4 fill-white" />
            <span>Subscribe on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Channel Overview Card */}
        <div className="bg-gradient-to-r from-[#120f18] via-[#0d121c] to-[#0c111c] border border-red-950/80 hover:border-red-800/50 rounded-2xl p-6 sm:p-8 mb-10 shadow-xl transition-all">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-700/60 flex items-center justify-center shrink-0 shadow-lg shadow-red-950/50">
                <Tv className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">
                    {YOUTUBE_CONFIG.channelName}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </div>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  {YOUTUBE_CONFIG.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {YOUTUBE_CONFIG.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end font-mono text-xs text-slate-400 shrink-0 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
              <span className="text-slate-200 font-semibold text-sm">ELECTROTECH CHANNEL</span>
              <span className="text-[11px] text-slate-500 mt-0.5">Focus: Hardware &amp; Embedded</span>
              <a
                href={YOUTUBE_CONFIG.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-red-400 hover:text-red-300 flex items-center gap-1 font-mono text-xs hover:underline"
              >
                <span>youtube.com/channel/UCbHVsz...</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Video Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {YOUTUBE_CONFIG.videoItems.map((video) => (
            <div
              key={video.id}
              className="group flex flex-col rounded-2xl bg-[#0d131f] border border-slate-800 hover:border-red-600/40 shadow-lg hover:shadow-xl hover:shadow-red-950/20 transition-all overflow-hidden"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative aspect-video overflow-hidden bg-slate-900 cursor-pointer"
                onClick={() => setActiveVideo(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-500 transition-all">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-slate-300 backdrop-blur-sm border border-slate-800">
                    {video.duration}
                  </span>
                )}
              </div>

              {/* Video Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 
                    onClick={() => setActiveVideo(video)}
                    className="font-semibold text-slate-100 text-sm group-hover:text-red-300 transition-colors cursor-pointer line-clamp-2 mb-2 leading-snug"
                  >
                    {video.title}
                  </h4>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-3">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">{video.publishedAt}</span>
                  <a
                    href={YOUTUBE_CONFIG.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 hover:underline"
                  >
                    <span>Watch</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Configuration Notice for Maintainer */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Configured for <strong className="text-slate-200">Electrotech with Saravanasai</strong>. Video IDs and topics are centrally editable in <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">src/data/youtube.ts</code>.
            </span>
          </div>
          <a
            href={YOUTUBE_CONFIG.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:underline shrink-0"
          >
            Open Channel Page &rarr;
          </a>
        </div>

      </div>

      {/* Video Modal Preview */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#0e131d] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
                <Youtube className="w-4 h-4" />
                <span>ELECTROTECH VIDEO SHOWCASE</span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/60 backdrop-blur-[2px]">
                <h3 className="text-lg sm:text-xl font-bold text-white max-w-lg mb-4">
                  {activeVideo.title}
                </h3>
                <a
                  href={YOUTUBE_CONFIG.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-semibold shadow-lg shadow-red-950 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch on Electrotech Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {activeVideo.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
