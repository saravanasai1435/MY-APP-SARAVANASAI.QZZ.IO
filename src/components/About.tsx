import React from 'react';
import { 
  CheckCircle2, 
  Cpu, 
  Terminal, 
  Wrench, 
  CircuitBoard, 
  Zap, 
  Boxes, 
  Radio,
  ArrowUpRight 
} from 'lucide-react';
import { GITHUB_PROFILE_URL } from '../services/github';
import { YOUTUBE_CONFIG } from '../data/youtube';

export const About: React.FC = () => {
  const coreInterests = [
    {
      title: 'Building Hardware',
      description: 'Designing circuit connections, soldering components, power distribution, and breadboarding physical systems.',
      icon: CircuitBoard,
      color: 'text-cyan-400'
    },
    {
      title: 'Programming Microcontrollers',
      description: 'Writing performant C/C++ firmware, configuring timer interrupts, FreeRTOS tasks, and memory management on ESP32 & Arduino.',
      icon: Cpu,
      color: 'text-orange-400'
    },
    {
      title: 'Experimenting with Electronics',
      description: 'Characterizing active/passive analog components, reading sensor voltages with ADCs, and analyzing signal timing.',
      icon: Zap,
      color: 'text-yellow-400'
    },
    {
      title: 'Creating Automation Systems',
      description: 'Engineering closed-loop physical systems like toll gates, contactless RFID logging, and reservoir water level regulators.',
      icon: Boxes,
      color: 'text-emerald-400'
    },
    {
      title: 'Exploring AI & Edge ML',
      description: 'Connecting low-power edge chips with vision processing (OpenCV) and LLM inference endpoints for voice and smart sensors.',
      icon: Terminal,
      color: 'text-teal-400'
    },
    {
      title: 'Learning Networking & Protocols',
      description: 'Working with hardware buses (I2C, SPI, UART) and networked communication layers (Wi-Fi 802.11, TCP/IP, MQTT, REST).',
      icon: Radio,
      color: 'text-sky-400'
    },
    {
      title: 'Turning Ideas into Working Prototypes',
      description: 'Translating concepts from sketches to breadboards, flashing firmware, testing edge cases, and building working prototypes.',
      icon: Wrench,
      color: 'text-purple-400'
    }
  ];

  return (
    <section id="about" className="py-24 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-mono text-xs mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>ABOUT SARAVANASAI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Young Engineer, Hardware Tinkerer &amp; Builder
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mt-2">
            A high-curiosity student committed to practical engineering—building real devices, writing firmware, and learning through execution.
          </p>
        </div>

        {/* Narrative & Workbench Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 bg-[#0b101b] border border-slate-800/90 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2.5">
              <span className="w-2 h-5 bg-cyan-500 rounded-sm inline-block" />
              Philosophy: Working Systems Over Pure Theory
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              I am a school student with a deep passion for electronics, embedded hardware, programming, and robotics. 
              While textbooks provide principles, I believe the true mastery of engineering comes when you wire components together on a breadboard, 
              probe signals, troubleshoot logic bugs, and witness physical actuators respond to your code.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              My workshop projects range from low-level microcontroller firmware on the <strong className="text-cyan-300 font-medium">Arduino</strong> and <strong className="text-orange-300 font-medium">ESP32-S3</strong>, 
              to wireless IoT telemetry, RFID access control, and edge AI experiments. I actively document my circuit discoveries, code, and project builds 
              on my GitHub and my YouTube channel, <strong className="text-white font-medium">Electrotech with Saravanasai</strong>.
            </p>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                <span>Browse Code on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-slate-600">•</span>
              <a
                href={YOUTUBE_CONFIG.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-red-400 hover:text-red-300 hover:underline"
              >
                <span>Watch Tutorials on YouTube</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Hardware Workbench Spec Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0e1422] to-[#0a0d16] border border-cyan-500/20 rounded-2xl p-6 shadow-xl font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-cyan-400 font-bold tracking-wider uppercase flex items-center gap-1.5">
                <CircuitBoard className="w-4 h-4" />
                WORKBENCH &amp; LAB SPECS
              </span>
              <span className="text-[10px] text-slate-500">LAB SETUP</span>
            </div>

            <div className="space-y-3.5">
              <div>
                <span className="text-slate-400 text-[11px] block">PRIMARY MCUs &amp; BOARDS:</span>
                <span className="text-slate-200 font-semibold">ESP32, ESP32-S3 Dual-Core, Arduino Uno/Nano, Raspberry Pi Pico RP2040</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">HARDWARE PROTOCOLS:</span>
                <span className="text-slate-200 font-semibold">I2C (400kHz), SPI (up to 40MHz), UART, PWM, I2S Audio, 1-Wire</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">TEST EQUIPMENT &amp; TOOLS:</span>
                <span className="text-slate-200 font-semibold">Digital Multimeter, USB-Logic Analyzer, Soldering Station, Breadboards</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">DEVELOPMENT WORKFLOW:</span>
                <span className="text-slate-200 font-semibold">VS Code + PlatformIO, Arduino IDE 2.x, Git CLI, Thonny MicroPython</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">ENGINEERING GOAL:</span>
                <span className="text-emerald-300 font-medium">Build robust, reliable physical hardware that solves practical tasks</span>
              </div>
            </div>
          </div>

        </div>

        {/* Core Interests Grid */}
        <div className="pt-4">
          <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
            <span>KEY AREAS OF EXPLORATION &amp; PRACTICE</span>
            <span className="flex-1 h-px bg-slate-800" />
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreInterests.map((interest) => {
              const Icon = interest.icon;
              return (
                <div
                  key={interest.title}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className={`p-2 rounded-lg bg-slate-950 border border-slate-800 ${interest.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h5 className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">
                      {interest.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {interest.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
