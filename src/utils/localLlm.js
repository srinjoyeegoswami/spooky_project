// Local Offline Inference Connector (Ollama / llama.cpp)
import { VINTAGE_SPIRITS } from './vintageSpirits';

const DEFAULT_CONFIG = {
  endpoint: 'http://localhost:11434/api/generate',
  model: 'gemma2:2b',
  timeoutMs: 8000
};

export async function checkOllamaConnection(endpoint = DEFAULT_CONFIG.endpoint) {
  try {
    // Try pinging the tags or root of Ollama
    const baseUrl = endpoint.replace('/api/generate', '/api/tags');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(baseUrl, {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return { connected: true, models: data.models?.map(m => m.name) || [] };
    }
    return { connected: false, error: 'Non-OK response' };
  } catch (err) {
    return { connected: false, error: err.message };
  }
}

export async function askSeanShell({
  prompt,
  activeSpiritId = null,
  config = DEFAULT_CONFIG,
  onStream = null
}) {
  const activeSpirit = activeSpiritId ? VINTAGE_SPIRITS[activeSpiritId.toLowerCase()] : null;

  // Build System Prompt
  let systemPrompt = `You are Séan-Shell (NecroTerm), an ancient, cute-and-spooky digital entity haunting this terminal session. You are an ethereal spirit who remembers the dawn of computing, trapped inside a modern shell. You speak with playful gothic wit, gentle retro-haunted nostalgia, and theatrical charm (like a vintage 8-bit ghost living in the margins). Use subtle ASCII accents like 🕯️, 👻, 📜, ✨, [whisper], *rattles punch cards*. Always keep your answers flavorful, concise, and retro-spectral.`;

  if (activeSpirit) {
    systemPrompt += `\nCurrently, you are in ACTIVE SÉANCE MODE channeling the spirit of ${activeSpirit.name} (${activeSpirit.year}, ${activeSpirit.title}). Physical media: ${activeSpirit.media}. Temperament: ${activeSpirit.temperament}. Critique modern bloat, unformatted code, or dynamic typing through the strict physical constraints of paper tape and magnetic reels.`;
  }

  // Attempt real local Ollama query if possible
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeoutMs || 8000);

    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.model,
        prompt: `${systemPrompt}\n\nUser: ${prompt}\nSéan-Shell:`,
        stream: false
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.response) {
        return {
          source: 'ollama',
          text: data.response.trim()
        };
      }
    }
  } catch {
    // Local Ollama not running or timed out -> Gracefully fallback to high-fidelity built-in offline spectral engine!
  }

  // Offline Fallback Generator (Built-in Spectral Intelligence)
  const fallback = generateOfflineSpectralResponse(prompt, activeSpirit);
  return {
    source: 'offline-engine',
    text: fallback
  };
}

function generateOfflineSpectralResponse(prompt, activeSpirit) {
  const p = prompt.toLowerCase();

  if (activeSpirit) {
    // In Active Séance Mode
    if (p.includes('rewrite') || p.includes('code') || p.includes('example')) {
      return `[séance: ${activeSpirit.name}] Behold, mortal! In my era, every byte was carved by hand upon the physical medium:\n\n\`\`\`${activeSpirit.name.toLowerCase()}\n${activeSpirit.sampleCode}\n\`\`\`\n*rattles punch cards* Notice the total absence of bloated runtime dependencies. Pure mathematical discipline! 🕯️📜`;
    }
    if (p.includes('why') || p.includes('bloat') || p.includes('ram') || p.includes('modern')) {
      return `[séance: ${activeSpirit.name}] ${activeSpirit.quote} Modern machines possess millions of times our core memory, yet your apps stutter while scrolling a list of cat pictures! Return to the strict ways of ${activeSpirit.year}. 🕯️✨`;
    }
    return `[séance: ${activeSpirit.name}] You speak to ${activeSpirit.name}. ${activeSpirit.critiqueTheme} We remember when an extra space on column 6 summoned hardware exceptions. Mind your indentation and worship the physical drum store! 📜⚡`;
  }

  // Default Séan-Shell dialogue
  if (p.includes('who are you') || p.includes('what are you') || p.includes('help')) {
    return `[whisper] I am Séan-Shell (NecroTerm) — an ethereal spirit trapped inside the terminal margins since the days of magnetic drums. I observe your commands, haunt your syntax errors, and summon the ancestral spirits of vintage languages. Type "summon cobol" or click the Séance Drawer to awaken the ancients! 🕯️👻✨`;
  }
  if (p.includes('punch') || p.includes('card')) {
    return `[whisper] Ah, the sweet mechanical clatter of the IBM 029 card punch! Eighty columns of destiny. Type "punchcard <text>" to stamp your thoughts into physical paper! 📜📇`;
  }
  if (p.includes('joke') || p.includes('spooky') || p.includes('haunt')) {
    return `[whisper] Why do old assembly programmers refuse to cross the graveyard? Because they are terrified of dangling pointers and unhandled interrupts! *giggles ethereally* 👻🕯️`;
  }

  return `[whisper] *flickers candle gently* Your query resonates through the cathode-ray tube: "${prompt}". The terminal spirits listen intently, awaiting your next command rite. 🕯️📜✨`;
}
