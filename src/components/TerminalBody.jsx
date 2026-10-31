import React, { useEffect, useRef } from 'react';
import { Terminal, Copy, Check, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';

export default function TerminalBody({ history, onRunPreset }) {
  const terminalEndRef = useRef(null);
  const [copiedIndex, setCopiedIndex] = React.useState(null);

  // Auto-scroll on new entries
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 font-terminal space-y-4 text-sm sm:text-base leading-relaxed bg-[#1c1a17]/95">
      {/* Welcome / Grimoire Intro banner */}
      <div className="border border-[#6e6259]/60 rounded bg-[#2b2621]/40 p-4 text-xs sm:text-sm text-[#6e6259]">
        <div className="flex items-center justify-between text-[#e8b058] mb-2 font-pixel text-base">
          <span>🕯️ [NECROTERM SESSION RESTORED FROM CORE STORAGE] 🕯️</span>
          <span>LOCATION: 0x7FFF_MEM</span>
        </div>
        <p className="text-[#a8c3a0] mb-2">
          Greetings, traveler of the modern shell. I am <strong>Séan-Shell</strong>. While your processor burns gigacycles, I listen to your commands and awaken the spirits of ancient compute.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs border-t border-[#6e6259]/30 pt-2 mt-2">
          <div>
            <span className="text-[#e8b058] font-semibold">◈ Passive Whisper:</span> Feeds on shell events (`[SHELL_EVENT] Command: ... | Exit: 0 | Path: ...`)
          </div>
          <div>
            <span className="text-[#e8b058] font-semibold">◈ Active Séance:</span> Issue <code className="text-[#e0a899] bg-[#1c1a17] px-1 rounded">summon cobol</code> or <code className="text-[#e0a899] bg-[#1c1a17] px-1 rounded">summon ada</code>
          </div>
          <div>
            <span className="text-[#e8b058] font-semibold">◈ Physical Artifacts:</span> Issue <code className="text-[#a8c3a0] bg-[#1c1a17] px-1 rounded">punchcard &lt;text&gt;</code>
          </div>
          <div>
            <span className="text-[#e8b058] font-semibold">◈ Grimoire Guide:</span> Type <code className="text-[#a8c3a0] bg-[#1c1a17] px-1 rounded">help</code> for all terminal rites
          </div>
        </div>
      </div>

      {/* Terminal History Entries */}
      {history.map((entry, index) => (
        <div
          key={index}
          className={`group rounded border transition-all duration-200 ${
            entry.isError
              ? 'border-[#e0a899]/40 bg-[#e0a899]/5'
              : entry.isSeance
              ? 'border-[#e8b058]/40 bg-[#e8b058]/5'
              : 'border-[#6e6259]/30 bg-[#2b2621]/20'
          } p-3 sm:p-4`}
        >
          {/* Header of Entry */}
          <div className="flex items-center justify-between text-xs text-[#6e6259] mb-1.5 pb-1 border-b border-[#6e6259]/20">
            <div className="flex items-center gap-2">
              <span className="text-[#e8b058] font-pixel text-sm">
                {entry.type === 'shell_event' ? '📡 [SHELL_EVENT]' : entry.type === 'seance' ? '📜 [SÉANCE]' : '❯ [PROMPT]'}
              </span>
              {entry.path && <span className="text-[#6e6259] font-mono hidden sm:inline">{entry.path}</span>}
              {entry.exitCode !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded font-mono text-[11px] ${
                    entry.exitCode === 0 || entry.exitCode === '0'
                      ? 'bg-[#a8c3a0]/20 text-[#a8c3a0] border border-[#a8c3a0]/40'
                      : 'bg-[#e0a899]/20 text-[#e0a899] border border-[#e0a899]/40'
                  }`}
                >
                  Exit: {entry.exitCode}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#6e6259]">{entry.timestamp}</span>
              <button
                onClick={() => handleCopy(entry.command || entry.output || '', index)}
                className="opacity-0 group-hover:opacity-100 text-[#6e6259] hover:text-[#e8b058] transition-opacity p-1 cursor-pointer"
                title="Copy contents"
              >
                {copiedIndex === index ? <Check className="w-3.5 h-3.5 text-[#a8c3a0]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Executed Command Line */}
          {entry.command && (
            <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#fdfbf7] mb-2 font-mono">
              <span className="text-[#a8c3a0]">séan-shell ❯</span>
              <span>{entry.command}</span>
            </div>
          )}

          {/* Standard Command Output / Code block if present */}
          {entry.rawOutput && (
            <div className="bg-[#1c1a17] rounded p-2.5 my-2 border border-[#6e6259]/40 text-xs sm:text-sm text-[#fdfbf7] font-mono overflow-x-auto whitespace-pre">
              {entry.rawOutput}
            </div>
          )}

          {/* Punch Card ASCII View if present */}
          {entry.punchCard && (
            <div className="bg-[#2b2621]/90 rounded p-3 my-2 border border-[#e8b058]/50 overflow-x-auto shadow-md">
              <div className="text-[10px] text-[#e8b058] font-pixel tracking-wider uppercase mb-1">
                📇 Physical Hollerith Card Punching Simulation:
              </div>
              <pre className="text-[#e8b058] text-xs font-mono leading-tight whitespace-pre select-all">
                {entry.punchCard}
              </pre>
            </div>
          )}

          {/* Inline Whispered Commentary / Ethereal Echo */}
          {entry.whisper && (
            <div
              className={`mt-2 pt-2 border-t border-[#6e6259]/20 flex items-start gap-2.5 ${
                entry.isError ? 'text-[#e0a899]' : 'text-[#e8b058]'
              }`}
            >
              <span className="text-base select-none mt-0.5">
                {entry.isError ? '👻' : entry.isSeance ? '📜' : '🕯️'}
              </span>
              <div className="flex-1 text-sm sm:text-base leading-relaxed tracking-wide">
                <span className="font-semibold select-none">
                  {entry.isError ? '[haunt] ' : entry.isSeance ? `[séance] ` : '[whisper] '}
                </span>
                <span className="italic">{entry.whisper}</span>
              </div>
            </div>
          )}
        </div>
      ))}

      <div ref={terminalEndRef} />
    </div>
  );
}
