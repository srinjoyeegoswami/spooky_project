import React from 'react';
import { Volume2, VolumeX, Sparkles, Shield, Cpu, BookOpen } from 'lucide-react';
import { spectralAudio } from '../utils/spectralAudio';

export default function AltarHeader({
  ghostState = 'idle', // 'idle' | 'success' | 'error' | 'seance'
  activeSpirit = null,
  isMuted = false,
  onToggleMute,
  onOpenDrawer,
  onOpenSettings,
  localModelInfo
}) {
  // Render Ghost ASCII sprite based on state
  const renderGhostSprite = () => {
    switch (ghostState) {
      case 'success':
        return (
          <div className="flex flex-col items-center">
            <pre className="text-[#a8c3a0] font-pixel text-xs sm:text-sm leading-tight text-center drop-shadow-[0_0_8px_rgba(168,195,160,0.6)]">
{`   .-'''''-.   
  /  ^   ^  \\  *blushes happily*
 |   (˶ᵔ ᵕ ᵔ˶)  |  ( exit: 0 )
  \\  '---'  /  
   'v'v'v'v'   `}
            </pre>
            <span className="text-xs text-[#a8c3a0] font-terminal mt-1">✨ Spirit Pleased ✨</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center">
            <pre className="text-[#e0a899] font-pixel text-xs sm:text-sm leading-tight text-center drop-shadow-[0_0_8px_rgba(224,168,153,0.7)] animate-pulse">
{`    /\\_巫_/\\   
   /  O   O  \\  *gasps dramatically*
  |   ( º Δ º ) |  [ BROKEN SPELL ]
   \\  '---'  /  
    'v'v'v'v'   `}
            </pre>
            <span className="text-xs text-[#e0a899] font-terminal mt-1">💀 Fractured Rite 💀</span>
          </div>
        );
      case 'seance':
        return (
          <div className="flex flex-col items-center">
            <pre className="text-[#e8b058] font-pixel text-xs sm:text-sm leading-tight text-center drop-shadow-[0_0_10px_rgba(232,176,88,0.8)] animate-bounce">
{`    .---[📇]---.  
   /  ⊙   ⊙  \\   *channeling trance*
  |   ( ~ ◡ ~ )  |   « ${activeSpirit ? activeSpirit.name : 'VINTAGE'} »
   \\  '====='  /   
    '~'~'~'~'~'    `}
            </pre>
            <span className="text-xs text-[#e8b058] font-terminal mt-1">📜 Channeling {activeSpirit?.name} 📜</span>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="flex flex-col items-center">
            <pre className="text-[#a8c3a0] font-pixel text-xs sm:text-sm leading-tight text-center drop-shadow-[0_0_6px_rgba(168,195,160,0.4)] animate-ghost-float">
{`   .-'''''-.   
  /  •   •  \\  
 |     ◡     |  
  \\  '---'  /  
   'v'v'v'v'   `}
            </pre>
            <span className="text-xs text-[#6e6259] font-terminal mt-1">👻 Floating in Margins</span>
          </div>
        );
    }
  };

  return (
    <header className="border-b border-[#6e6259]/60 bg-[#2b2621]/90 backdrop-blur-md px-3 sm:px-6 py-3 transition-colors duration-300">
      {/* Top Banner Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs text-[#6e6259]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1c1a17] border border-[#6e6259]/50 text-[#a8c3a0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a8c3a0] animate-ping" />
            NECRO-TERM v1.972
          </span>
          <span className="hidden sm:inline text-[#6e6259]">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[#e8b058]">
            <Shield className="w-3.5 h-3.5" /> 100% Offline Local Airgap
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              spectralAudio.playKeyClack();
              onToggleMute();
            }}
            className="flex items-center gap-1 px-2 py-1 rounded border border-[#6e6259]/40 hover:border-[#e8b058] text-[#e8b058] hover:bg-[#1c1a17] transition-all cursor-pointer"
            title={isMuted ? "Unmute spectral sounds" : "Mute spectral sounds"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#e0a899]" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isMuted ? "Muted" : "Chimes"}</span>
          </button>

          {/* Local Inference Status / Settings */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1 px-2 py-1 rounded border border-[#6e6259]/40 hover:border-[#a8c3a0] text-[#a8c3a0] hover:bg-[#1c1a17] transition-all cursor-pointer"
            title="Local Inference & Ollama Settings"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{localModelInfo?.connected ? "Ollama Linked" : "Offline Spirit"}</span>
          </button>

          {/* Séance Drawer Button */}
          <button
            onClick={() => {
              spectralAudio.playWhisperChime();
              onOpenDrawer();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#e8b058]/15 border border-[#e8b058]/60 hover:bg-[#e8b058]/25 text-[#e8b058] transition-all cursor-pointer shadow-sm hover:shadow-[0_0_8px_rgba(232,176,88,0.3)]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="font-semibold">Séance Grimoire</span>
          </button>
        </div>
      </div>

      {/* Main Altar Frame with Flickering Candles */}
      <div className="relative border border-[#6e6259] bg-[#1c1a17]/95 rounded p-3 sm:p-4 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Candle & Incense */}
        <div className="flex items-center gap-2 select-none">
          <div className="text-xl sm:text-2xl animate-candle" title="Flickering Altar Candle">
            🕯️
          </div>
          <div className="text-xs text-[#6e6259] font-terminal hidden md:block">
            <div>+-- ALTAR --+</div>
            <div>|  OCTAL: 077|</div>
            <div>+----------+</div>
          </div>
        </div>

        {/* Center: The Ghost Mascot & Altar Title */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-1">{renderGhostSprite()}</div>
          <h1 className="text-lg sm:text-2xl font-altar tracking-wider text-[#e8b058] drop-shadow-[0_0_10px_rgba(232,176,88,0.4)] flex items-center gap-2">
            <span>✧</span> Séan-Shell (NecroTerm) <span>✧</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#a8c3a0] font-terminal italic mt-0.5">
            Ancient Cute-and-Spooky Entity Haunting the Terminal Margins
          </p>
        </div>

        {/* Right Candle & Incense */}
        <div className="flex items-center gap-2 select-none">
          <div className="text-xs text-[#6e6259] font-terminal hidden md:block text-right">
            <div>+-- REEL --+</div>
            <div>| 800 BPI  |</div>
            <div>+---------+</div>
          </div>
          <div className="text-xl sm:text-2xl animate-candle-delay" title="Flickering Altar Candle">
            🕯️
          </div>
        </div>
      </div>

      {/* Active Séance Banner if channel active */}
      {activeSpirit && (
        <div className="mt-2 py-1.5 px-3 rounded bg-[#e8b058]/10 border border-[#e8b058]/50 flex items-center justify-between text-xs text-[#e8b058]">
          <div className="flex items-center gap-2">
            <span className="animate-spin text-sm">📜</span>
            <span>
              <strong>Active Séance:</strong> Channeling <strong>{activeSpirit.name}</strong> ({activeSpirit.year}) — {activeSpirit.title}
            </span>
          </div>
          <span className="font-pixel text-sm px-2 py-0.5 rounded bg-[#1c1a17] text-[#e8b058] border border-[#e8b058]/40">
            type "dismiss" to end rite
          </span>
        </div>
      )}
    </header>
  );
}
