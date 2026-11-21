import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  RotateCcw, 
  Cpu, 
  ArrowUpRight, 
  Check, 
  Copy, 
  HelpCircle,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { GITHUB_PROFILE_URL } from '../services/github';
import { YOUTUBE_CONFIG } from '../data/youtube';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const DEFAULT_SUGGESTIONS = [
  'What components are needed for the Arduino RFID Door Lock?',
  'How does the ESP32-CAM Video Streamer work and what is the pinout?',
  'Tell me about the Arduino Obstacle Avoidance Robot Car',
  'How is the ESP32 BLE Gamepad Steering Wheel wired?',
  'What files and code can I find on Saravanasai\'s GitHub?'
];

interface AIAssistantProps {
  embedded?: boolean;
  className?: string;
  defaultOpen?: boolean;
  onClose?: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ 
  embedded = false, 
  className = '',
  defaultOpen = false,
  onClose 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "👋 Hi! I am Saravanasai's AI Technical Assistant. Ask me about his hardware builds, required components, GPIO wiring, GitHub firmware code, or his YouTube tutorials!",
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Here is what you need to know about Saravanasai\'s projects.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('Backend chat failed, falling back to local technical assistant knowledge', err);
      // Client-side fallback if server is unreachable
      const lower = messageText.toLowerCase();
      let fallbackReply = "";
      if (lower.includes('smart update') || lower.includes('update box')) {
        fallbackReply = "The Smart Update Box uses an ESP32 dual-core chip, 2.4\" ST7789 TFT display (SPI: MOSI GPIO 23, SCLK GPIO 18, CS GPIO 5, DC GPIO 2, RST GPIO 4), TTP223 capacitive touch pad on GPIO 15, and 5V USB-C power with 3.3V LDO. Firmware code is on GitHub: " + GITHUB_PROFILE_URL;
      } else if (lower.includes('rfid') || lower.includes('attendance')) {
        fallbackReply = "The RFID Attendance System runs on Arduino/ESP32 with an MFRC522 RFID reader (SPI: D10, D11, D12, D13) and SSD1306 OLED (I2C: A4, A5). Buzzer is on pin D8. Firmware and pinout can be viewed on GitHub: " + GITHUB_PROFILE_URL;
      } else if (lower.includes('esp32-s3') || lower.includes('ai') || lower.includes('voice')) {
        fallbackReply = "The ESP32-S3 AI Edge Assistant uses an INMP441 I2S microphone (GPIO 14, 15, 32) and MAX98357A I2S DAC amplifier (GPIO 26, 25, 22) for voice interaction. Files and DMA ring buffer code are in the repo.";
      } else {
        fallbackReply = "Saravanasai builds practical hardware systems with Arduino, ESP32, Raspberry Pi Pico, and sensors. You can explore all files, pinouts, and code on his GitHub (" + GITHUB_PROFILE_URL + ") or watch demos on YouTube (Electrotech with Saravanasai)!";
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: "Chat cleared. What project or component would you like to explore?",
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <div 
      id="ai-assistant-container"
      className={`flex flex-col rounded-2xl border border-cyan-500/30 bg-[#0a0f18]/95 backdrop-blur-xl shadow-2xl shadow-cyan-950/40 text-slate-100 overflow-hidden ${
        embedded ? 'w-full h-[520px]' : 'w-full max-w-lg h-[580px]'
      } ${className}`}
    >
      {/* Header */}
      <div className="px-4 py-3.5 bg-gradient-to-r from-slate-900 via-[#0d1524] to-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-sky-400 p-0.5 shadow-md shadow-cyan-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-mono">Saravanasai AI Assistant</h3>
              <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-mono font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                GEMINI 3.8
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>PROJECT &amp; HARDWARE GUIDE • ONLINE</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            title="Reset conversation"
            aria-label="Reset conversation"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              title="Close Assistant"
              aria-label="Close Assistant"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs font-sans">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div 
              key={msg.id} 
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group`}
            >
              <div 
                className={`max-w-[88%] rounded-xl px-3.5 py-2.5 shadow-sm text-xs leading-relaxed whitespace-pre-line ${
                  isUser 
                    ? 'bg-cyan-600 text-slate-950 font-medium rounded-br-none shadow-cyan-950/40' 
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-black/40'
                }`}
              >
                {msg.text}

                {/* Quick actions for assistant messages */}
                {!isUser && (
                  <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{msg.timestamp}</span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60 max-w-[200px]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>Analyzing hardware specs...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/60 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 mr-1">
            <HelpCircle className="w-3 h-3" />
            SUGGESTED:
          </span>
          {DEFAULT_SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(sug)}
              disabled={isLoading}
              className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-900 hover:bg-cyan-950/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-200 transition-all text-left truncate max-w-[240px] cursor-pointer"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about components, pinouts, code or projects..."
            disabled={isLoading}
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-semibold shadow-md shadow-cyan-950 transition-all cursor-pointer"
            title="Send Message"
            aria-label="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500 font-mono">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>Trained on Saravanasai's GitHub &amp; Hardware Data</span>
          </div>
          <a 
            href={GITHUB_PROFILE_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-cyan-400 flex items-center gap-0.5"
          >
            <span>GitHub Repos</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
