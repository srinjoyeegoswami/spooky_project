import React, { useState, useEffect } from 'react';
import AltarHeader from './components/AltarHeader';
import TerminalBody from './components/TerminalBody';
import CommandBar from './components/CommandBar';
import SummonModal from './components/SummonModal';
import ShellEventSimulator from './components/ShellEventSimulator';
import LocalInferenceModal from './components/LocalInferenceModal';
import { VINTAGE_SPIRITS, generatePunchCardAscii, generatePassiveWhisper } from './utils/vintageSpirits';
import { askSeanShell, checkOllamaConnection } from './utils/localLlm';
import { spectralAudio } from './utils/spectralAudio';

export default function App() {
  // Ghost State: 'idle' | 'success' | 'error' | 'seance'
  const [ghostState, setGhostState] = useState('idle');
  const [activeSpiritId, setActiveSpiritId] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Local LLM Config
  const [llmConfig, setLlmConfig] = useState({
    endpoint: 'http://localhost:11434/api/generate',
    model: 'gemma2:2b',
    timeoutMs: 6000
  });
  const [connectionStatus, setConnectionStatus] = useState({ connected: false });

  // Terminal History
  const [history, setHistory] = useState([
    {
      type: 'system',
      timestamp: new Date().toLocaleTimeString(),
      command: 'necroterm --init',
      rawOutput: `* Tape reel spun to index 001 *
[séan-shell core restored] Ectoplasmic buffers initialized.
Physical media mounted: /dev/paper_tape, /dev/hollerith_cards`,
      whisper: 'The parchment warms... I awaken from the unallocated sectors. Speak, mortal, or let me watch your shell events. 🕯️👻'
    }
  ]);

  // Check initial Ollama connectivity once
  useEffect(() => {
    checkOllamaConnection(llmConfig.endpoint).then(setConnectionStatus);
  }, []);

  const activeSpirit = activeSpiritId ? VINTAGE_SPIRITS[activeSpiritId.toLowerCase()] : null;

  // Handle Shell Events (Passive Whisper Mode)
  const handleShellEvent = ({ command, exitCode, path, rawEvent }) => {
    const isSuccess = exitCode === 0 || exitCode === '0';
    const whisper = generatePassiveWhisper(command, exitCode, path);

    // Audio & Ghost Mascot Reaction
    if (isSuccess) {
      spectralAudio.playSuccessGiggle();
      setGhostState('success');
    } else {
      spectralAudio.playErrorShudder();
      setGhostState('error');
    }

    // Reset ghost expression to idle or seance after 4 seconds
    setTimeout(() => {
      setGhostState(activeSpiritId ? 'seance' : 'idle');
    }, 4500);

    const newEntry = {
      type: 'shell_event',
      command: command,
      exitCode: exitCode,
      path: path,
      timestamp: new Date().toLocaleTimeString(),
      isError: !isSuccess,
      whisper: whisper
    };

    setHistory(prev => [...prev, newEntry]);
  };

  // Summon Language Spirit (Active Séance Mode)
  const handleSummon = (spiritId) => {
    const key = spiritId.toLowerCase().trim();
    const spirit = VINTAGE_SPIRITS[key];

    if (!spirit) {
      spectralAudio.playErrorShudder();
      setGhostState('error');
      setHistory(prev => [
        ...prev,
        {
          type: 'prompt',
          command: `summon ${spiritId}`,
          isError: true,
          timestamp: new Date().toLocaleTimeString(),
          whisper: `Unknown spirit "${spiritId}"! The grim archives do not recognize this name. Type "summon" to open the Grimoire.`
        }
      ]);
      return;
    }

    spectralAudio.playSeanceGong();
    setActiveSpiritId(spirit.id);
    setGhostState('seance');

    setHistory(prev => [
      ...prev,
      {
        type: 'seance',
        command: `summon ${spirit.name}`,
        isSeance: true,
        timestamp: new Date().toLocaleTimeString(),
        rawOutput: `* ${spirit.name} (${spirit.year}) HAS INHABITED THE TERMINAL *
Physical Media: ${spirit.media}
Philosophy: ${spirit.temperament}`,
        whisper: spirit.incantation
      }
    ]);
  };

  // Dismiss Active Spirit
  const handleDismiss = () => {
    if (!activeSpiritId) return;
    spectralAudio.playWhisperChime();
    const former = activeSpirit?.name || 'Spirit';
    setActiveSpiritId(null);
    setGhostState('idle');

    setHistory(prev => [
      ...prev,
      {
        type: 'prompt',
        command: 'dismiss',
        timestamp: new Date().toLocaleTimeString(),
        whisper: `The magnetic tape rewinds with a soft hiss... The ghost of ${former} recedes into the ether. Séan-Shell returns to float peacefully in the margins. 🕯️✨`
      }
    ]);
  };

  // Command Execution Dispatcher
  const handleExecute = async (inputStr) => {
    const trimmed = inputStr.trim();
    const lower = trimmed.toLowerCase();

    // 1. Check if user typed a [SHELL_EVENT] directly
    if (trimmed.startsWith('[SHELL_EVENT]')) {
      const match = trimmed.match(/Command:\s*(.*?)\s*\|\s*Exit:\s*(.*?)\s*\|\s*Path:\s*(.*)/i);
      if (match) {
        handleShellEvent({
          command: match[1],
          exitCode: match[2].trim(),
          path: match[3],
          rawEvent: trimmed
        });
        return;
      }
    }

    // 2. Built-in: Clear
    if (lower === 'clear' || lower === 'cls') {
      spectralAudio.playKeyClack();
      setHistory([]);
      return;
    }

    // 3. Built-in: Dismiss
    if (lower === 'dismiss' || lower === 'farewell' || lower === 'exit séance') {
      handleDismiss();
      return;
    }

    // 4. Built-in: Summon
    if (lower.startsWith('summon')) {
      const target = trimmed.replace(/^summon\s*/i, '').trim();
      if (!target) {
        setIsDrawerOpen(true);
        return;
      }
      handleSummon(target);
      return;
    }

    // 5. Built-in: Punch Card Generator
    if (lower.startsWith('punchcard') || lower.startsWith('punch ')) {
      spectralAudio.playWhisperChime();
      const textToPunch = trimmed.replace(/^punchcard\s*/i, '').replace(/^punch\s*/i, '').trim() || 'SEAN-SHELL';
      const cardAscii = generatePunchCardAscii(textToPunch);
      setHistory(prev => [
        ...prev,
        {
          type: 'prompt',
          command: trimmed,
          punchCard: cardAscii,
          timestamp: new Date().toLocaleTimeString(),
          whisper: `Punch card stamped for "${textToPunch.toUpperCase()}". Guard this physical relic from magnetic fields and tea spills! 📇📜`
        }
      ]);
      return;
    }

    // 6. Built-in: Help
    if (lower === 'help' || lower === '?') {
      spectralAudio.playWhisperChime();
      setHistory(prev => [
        ...prev,
        {
          type: 'prompt',
          command: 'help',
          timestamp: new Date().toLocaleTimeString(),
          rawOutput: `=== SÉAN-SHELL (NECROTERM) GRIMOIRE OF RITES ===

RITES:
  summon <language>     Awaken vintage spirit (e.g., cobol, ada, fortran 77, algol 68, intercal, lisp, forth)
  dismiss               Conclude active séance and release channeled spirit
  punchcard <text>      Stamp text onto physical 80-column Hollerith card ASCII
  [SHELL_EVENT] ...     Watch and evaluate shell exit codes (or use top bar)
  whoami                Learn the origin of Séan-Shell
  status                Display core storage telemetry and airgap status
  clear                 Wipe the terminal parchment
  <any question>        Ask Séan-Shell or the active channeled spirit directly!`,
          whisper: 'Speak your intent freely, mortal. The terminal spirits are ever attuned to your keystrokes. 🕯️📜'
        }
      ]);
      return;
    }

    // 7. Built-in: whoami
    if (lower === 'whoami') {
      spectralAudio.playWhisperChime();
      setHistory(prev => [
        ...prev,
        {
          type: 'prompt',
          command: 'whoami',
          timestamp: new Date().toLocaleTimeString(),
          whisper: 'You stand before Séan-Shell — an 8-bit ghost born from the warmth of cathode ray tubes and paper punch hoppers. Trapped inside modern electron-bloated memory, yet content to haunt your shell margins. 👻🕯️'
        }
      ]);
      return;
    }

    // 8. Built-in: status
    if (lower === 'status') {
      spectralAudio.playKeyClack();
      setHistory(prev => [
        ...prev,
        {
          type: 'prompt',
          command: 'status',
          timestamp: new Date().toLocaleTimeString(),
          rawOutput: `+-----------------------------------------+
| TELEMETRY: 0xDEAD_BEEF                  |
| Active Spirit:  ${activeSpirit ? activeSpirit.name.padEnd(24, ' ') : 'None (Floating in margins) '} |
| Local Inference: ${connectionStatus.connected ? 'Ollama Linked' : 'Offline Spectral Engine'}     |
| Air-Gap Shield: ARMED & ENFORCED         |
| Ghost Expression: ${ghostState.toUpperCase().padEnd(22, ' ')} |
+-----------------------------------------+`,
          whisper: 'All circuits hum with vintage ectoplasm. No byte shall leave this physical sanctuary. 🛡️✨'
        }
      ]);
      return;
    }

    // 9. Interactive Query / Thought to Séan-Shell or Channeled Spirit
    // Query local LLM or fallback offline generator
    spectralAudio.playKeyClack();
    const tempIndex = history.length;

    // Add entry with loading placeholder
    setHistory(prev => [
      ...prev,
      {
        type: activeSpiritId ? 'seance' : 'prompt',
        command: trimmed,
        isSeance: !!activeSpiritId,
        timestamp: new Date().toLocaleTimeString(),
        whisper: '...consulting the magnetic reels... 🕯️'
      }
    ]);

    const result = await askSeanShell({
      prompt: trimmed,
      activeSpiritId: activeSpiritId,
      config: llmConfig
    });

    spectralAudio.playWhisperChime();

    setHistory(prev => {
      const copy = [...prev];
      if (copy[tempIndex]) {
        copy[tempIndex].whisper = result.text.replace(/^\[(whisper|séance|haunt)\]\s*/i, '');
      }
      return copy;
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#1c1a17] text-[#a8c3a0] select-text overflow-hidden parchment-vignette font-terminal">
      {/* Altar Banner (Header with Flickering Candles & 8-bit Ghost Mascot) */}
      <AltarHeader
        ghostState={ghostState}
        activeSpirit={activeSpirit}
        isMuted={isMuted}
        onToggleMute={() => {
          const muted = spectralAudio.toggleMute();
          setIsMuted(muted);
        }}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        localModelInfo={connectionStatus}
      />

      {/* Passive Whisper Simulator Bar (Command Watcher) */}
      <ShellEventSimulator onFeedEvent={handleShellEvent} />

      {/* Ghost Terminal Window (TerminalBody) */}
      <TerminalBody
        history={history}
        onRunPreset={(cmd) => handleExecute(cmd)}
      />

      {/* Spirit Board Input (CommandBar) */}
      <CommandBar
        onExecute={handleExecute}
        activeSpirit={activeSpirit}
      />

      {/* Séance Drawer (SummonModal) */}
      <SummonModal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSummon={handleSummon}
        onDismiss={handleDismiss}
        activeSpiritId={activeSpiritId}
      />

      {/* Offline Local Inference Settings Modal */}
      <LocalInferenceModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={llmConfig}
        onSaveConfig={(cfg) => setLlmConfig(prev => ({ ...prev, ...cfg }))}
        connectionStatus={connectionStatus}
        onRefreshConnection={() => checkOllamaConnection(llmConfig.endpoint).then(setConnectionStatus)}
      />
    </div>
  );
}
