import React, { useState } from 'react';
import { Radio, Play, ChevronDown, ChevronUp, Sparkles, Send } from 'lucide-react';
import { spectralAudio } from '../utils/spectralAudio';

const PRESETS = [
  {
    label: 'git push --force (Exit: 0)',
    cmd: 'git push --force',
    exit: 0,
    path: '~/projects/web'
  },
  {
    label: 'python main.py (Exit: 1 IndexError)',
    cmd: 'python main.py',
    exit: 1,
    path: '~/scripts'
  },
  {
    label: 'cargo build --release (Exit: 0)',
    cmd: 'cargo build --release',
    exit: 0,
    path: '~/projects/kernel'
  },
  {
    label: 'npm run dev (Exit: 1 EADDRINUSE)',
    cmd: 'npm run dev',
    exit: 1,
    path: '~/apps/frontend'
  },
  {
    label: 'docker run -d redis (Exit: 0)',
    cmd: 'docker run -d redis',
    exit: 0,
    path: '~/services'
  },
  {
    label: 'gcc -Wall -Werror main.c (Exit: 139 SegFault)',
    cmd: 'gcc -Wall -Werror main.c',
    exit: 139,
    path: '~/firmware'
  }
];

export default function ShellEventSimulator({ onFeedEvent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customCmd, setCustomCmd] = useState('');
  const [customExit, setCustomExit] = useState(0);
  const [customPath, setCustomPath] = useState('~/workspace');

  const handleFeedPreset = (preset) => {
    spectralAudio.playKeyClack();
    const eventString = `[SHELL_EVENT] Command: ${preset.cmd} | Exit: ${preset.exit} | Path: ${preset.path}`;
    onFeedEvent({
      command: preset.cmd,
      exitCode: preset.exit,
      path: preset.path,
      rawEvent: eventString
    });
  };

  const handleFeedCustom = (e) => {
    e.preventDefault();
    if (!customCmd.trim()) return;

    spectralAudio.playKeyClack();
    const eventString = `[SHELL_EVENT] Command: ${customCmd.trim()} | Exit: ${customExit} | Path: ${customPath.trim()}`;
    onFeedEvent({
      command: customCmd.trim(),
      exitCode: parseInt(customExit, 10) || 0,
      path: customPath.trim() || '~/workspace',
      rawEvent: eventString
    });
    setCustomCmd('');
  };

  return (
    <div className="border-b border-[#6e6259]/40 bg-[#1c1a17]/90 text-xs font-terminal">
      {/* Collapsible Bar Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-[#2b2621]/60 transition-colors select-none text-[#a8c3a0]"
      >
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-[#e8b058] animate-pulse" />
          <span className="font-semibold text-[#e8b058]">Passive Whisper Simulator</span>
          <span className="text-[#6e6259] hidden sm:inline">
            (Feed `[SHELL_EVENT]` to watch Séan-Shell react)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#6e6259]">
          <span className="text-[11px] font-mono">{isOpen ? 'Hide Panel' : 'Feed Event'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* Expanded Simulator Body */}
      {isOpen && (
        <div className="p-4 bg-[#2b2621]/40 border-t border-[#6e6259]/30 space-y-3">
          {/* Quick Presets */}
          <div>
            <div className="text-[#e8b058] font-bold mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Instant Test Shell Events:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleFeedPreset(p)}
                  className={`px-2.5 py-1.5 rounded border text-left transition-all cursor-pointer flex items-center justify-between font-mono text-xs ${
                    p.exit === 0
                      ? 'border-[#a8c3a0]/40 bg-[#1c1a17] hover:border-[#a8c3a0] text-[#a8c3a0]'
                      : 'border-[#e0a899]/40 bg-[#1c1a17] hover:border-[#e0a899] text-[#e0a899]'
                  }`}
                >
                  <span className="truncate mr-1">{p.label}</span>
                  <Play className="w-3 h-3 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Shell Event Form */}
          <form onSubmit={handleFeedCustom} className="pt-2 border-t border-[#6e6259]/30">
            <div className="text-[#6e6259] mb-1.5 font-bold">Custom Shell Event Hook:</div>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <input
                type="text"
                placeholder="Command (e.g. npm test)"
                value={customCmd}
                onChange={(e) => setCustomCmd(e.target.value)}
                className="flex-1 bg-[#1c1a17] border border-[#6e6259] rounded px-2.5 py-1 text-[#fdfbf7] placeholder-[#6e6259] text-xs font-mono focus:outline-none focus:border-[#e8b058]"
              />
              <select
                value={customExit}
                onChange={(e) => setCustomExit(Number(e.target.value))}
                className="bg-[#1c1a17] border border-[#6e6259] rounded px-2 py-1 text-xs font-mono text-[#fdfbf7] focus:outline-none focus:border-[#e8b058]"
              >
                <option value={0}>Exit: 0 (Success)</option>
                <option value={1}>Exit: 1 (Error)</option>
                <option value={2}>Exit: 2 (Misuse)</option>
                <option value={127}>Exit: 127 (NotFound)</option>
                <option value={139}>Exit: 139 (SegFault)</option>
              </select>
              <input
                type="text"
                placeholder="Path"
                value={customPath}
                onChange={(e) => setCustomPath(e.target.value)}
                className="w-28 bg-[#1c1a17] border border-[#6e6259] rounded px-2 py-1 text-[#fdfbf7] placeholder-[#6e6259] text-xs font-mono focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1 rounded bg-[#a8c3a0]/20 hover:bg-[#a8c3a0]/30 border border-[#a8c3a0] text-[#a8c3a0] font-semibold text-xs cursor-pointer flex items-center gap-1"
              >
                <Send className="w-3 h-3" /> Broadcast
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
