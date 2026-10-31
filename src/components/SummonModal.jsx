import React from 'react';
import { X, Sparkles, BookOpen, Scroll, Flame, Terminal, Play } from 'lucide-react';
import { VINTAGE_SPIRITS } from '../utils/vintageSpirits';
import { spectralAudio } from '../utils/spectralAudio';

export default function SummonModal({
  isOpen,
  onClose,
  onSummon,
  onDismiss,
  activeSpiritId
}) {
  if (!isOpen) return null;

  const spiritsList = Object.values(VINTAGE_SPIRITS);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      {/* Drawer Container */}
      <div className="w-full max-w-md sm:max-w-lg bg-[#2b2621] border-l border-[#6e6259] h-full flex flex-col shadow-2xl overflow-hidden font-terminal">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#6e6259]/60 bg-[#1c1a17] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <div>
              <h2 className="text-base font-altar text-[#e8b058] tracking-wider">
                The Séance Grimoire
              </h2>
              <p className="text-xs text-[#a8c3a0]">
                Summon Ancient Compilers & Vintage Hardware Spirits
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#6e6259] hover:text-[#fdfbf7] hover:bg-[#2b2621] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Spirit Cards */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-xs text-[#6e6259] bg-[#1c1a17] p-2.5 rounded border border-[#6e6259]/30">
            <span className="text-[#e8b058] font-bold">How to Summon:</span> Issue <code className="text-[#a8c3a0]">summon &lt;language&gt;</code> in the terminal prompt or tap any spirit below. When summoned, Séan-Shell channels their philosophy and strict physical constraints.
          </div>

          {spiritsList.map((spirit) => {
            const isActive = activeSpiritId?.toLowerCase() === spirit.id;

            return (
              <div
                key={spirit.id}
                className={`rounded border transition-all duration-200 p-3.5 ${
                  isActive
                    ? 'border-[#e8b058] bg-[#e8b058]/10 shadow-[0_0_12px_rgba(232,176,88,0.2)]'
                    : 'border-[#6e6259]/50 bg-[#1c1a17]/80 hover:border-[#a8c3a0]/80'
                }`}
              >
                {/* Header & Badges */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-1 rounded bg-[#2b2621] border border-[#6e6259]/40">
                      {spirit.avatar}
                    </span>
                    <div>
                      <h3 className="font-bold text-[#fdfbf7] text-sm flex items-center gap-1.5">
                        {spirit.name}
                        <span className="text-xs font-mono font-normal text-[#6e6259]">
                          ({spirit.year})
                        </span>
                      </h3>
                      <p className="text-xs text-[#a8c3a0] italic">{spirit.title}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-pixel px-2 py-0.5 rounded bg-[#2b2621] border border-[#6e6259]/60 text-[#e8b058]">
                    {spirit.badge}
                  </span>
                </div>

                {/* Media & Temperament */}
                <div className="text-xs space-y-1 mb-2.5 text-[#6e6259]">
                  <div>
                    <span className="text-[#e8b058]">Physical Media:</span> {spirit.media}
                  </div>
                  <div>
                    <span className="text-[#e0a899]">Temperament:</span> {spirit.temperament}
                  </div>
                  <div className="italic text-[#fdfbf7]/80 pt-1 border-t border-[#6e6259]/20">
                    {spirit.quote}
                  </div>
                </div>

                {/* Summon or Dismiss Action Button */}
                <div className="flex items-center justify-between pt-2 border-t border-[#6e6259]/30">
                  <span className="text-[11px] text-[#6e6259] font-mono">
                    `summon {spirit.id}`
                  </span>

                  {isActive ? (
                    <button
                      onClick={() => {
                        spectralAudio.playKeyClack();
                        onDismiss();
                      }}
                      className="px-3 py-1 rounded bg-[#e0a899]/20 hover:bg-[#e0a899]/30 border border-[#e0a899] text-[#e0a899] text-xs font-semibold cursor-pointer transition-all flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Dismiss Spirit
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        spectralAudio.playSeanceGong();
                        onSummon(spirit.id);
                        onClose();
                      }}
                      className="px-3 py-1 rounded bg-[#e8b058]/20 hover:bg-[#e8b058]/30 border border-[#e8b058] text-[#e8b058] text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 shadow-sm"
                    >
                      <Flame className="w-3.5 h-3.5" /> Summon Spirit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#6e6259]/60 bg-[#1c1a17] text-xs text-[#6e6259] flex items-center justify-between">
          <span>*rattles punch cards*</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded border border-[#6e6259]/50 text-[#fdfbf7] hover:bg-[#2b2621] cursor-pointer"
          >
            Close Grimoire
          </button>
        </div>
      </div>
    </div>
  );
}
