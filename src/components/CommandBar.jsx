import React, { useState, useRef, useEffect } from 'react';
import { Send, CornerDownLeft, Sparkles, HelpCircle } from 'lucide-react';
import { spectralAudio } from '../utils/spectralAudio';

const SUGGESTIONS = [
  'help',
  'summon cobol',
  'summon ada',
  'summon fortran 77',
  'summon algol 68',
  'summon intercal',
  'summon lisp',
  'summon forth',
  'dismiss',
  'punchcard SPOOKY BITS',
  'clear',
  'whoami',
  'status'
];

export default function CommandBar({ onExecute, activeSpirit = null }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  // Focus input automatically
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeSpirit]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    spectralAudio.playKeyClack();
    const cmd = input.trim();
    // Add to local history
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    onExecute(cmd);
    setInput('');
  };

  const handleKeyDown = (e) => {
    // Play mechanical sound on key clacks
    if (e.key.length === 1 || e.key === 'Backspace') {
      spectralAudio.playKeyClack();
    }

    // Up arrow history traversal
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }
    // Down arrow history traversal
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
    // Tab auto-complete
    else if (e.key === 'Tab') {
      e.preventDefault();
      const match = SUGGESTIONS.find(s => s.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <footer className="border-t border-[#6e6259]/60 bg-[#2b2621]/95 px-3 sm:px-6 py-3">
      {/* Quick Suggestion Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs no-scrollbar">
        <span className="text-[#6e6259] select-none flex items-center gap-1 font-pixel text-sm mr-1">
          <Sparkles className="w-3.5 h-3.5 text-[#e8b058]" /> RITES:
        </span>
        {SUGGESTIONS.slice(0, 6).map((cmd, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              spectralAudio.playKeyClack();
              setInput(cmd);
              inputRef.current?.focus();
            }}
            className="px-2 py-0.5 rounded bg-[#1c1a17] hover:bg-[#1c1a17]/80 border border-[#6e6259]/40 hover:border-[#a8c3a0] text-[#a8c3a0] hover:text-[#fdfbf7] transition-all whitespace-nowrap cursor-pointer text-xs font-mono"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Spirit Board Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
        <div className="flex-1 flex items-center bg-[#1c1a17] border border-[#6e6259] focus-within:border-[#e8b058] rounded px-3 py-2 transition-all shadow-inner">
          <span className="text-[#a8c3a0] font-mono font-bold select-none whitespace-nowrap mr-2 text-sm sm:text-base">
            {activeSpirit ? `séan-shell (${activeSpirit.name.toLowerCase()}) ❯` : 'séan-shell ❯'}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              activeSpirit
                ? `Ask ${activeSpirit.name} or type "dismiss" to end séance...`
                : "Type command, 'summon <lang>', or '[SHELL_EVENT]...'"
            }
            className="w-full bg-transparent text-[#fdfbf7] placeholder-[#6e6259] focus:outline-none font-mono text-sm sm:text-base"
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        <button
          type="submit"
          className="p-2.5 sm:px-4 rounded bg-[#e8b058]/20 border border-[#e8b058]/60 hover:bg-[#e8b058]/30 text-[#e8b058] transition-all cursor-pointer flex items-center gap-1 font-mono text-xs sm:text-sm font-semibold"
          title="Send Command"
        >
          <span className="hidden sm:inline">RITE</span>
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>
    </footer>
  );
}
