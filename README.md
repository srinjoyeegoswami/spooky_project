# spooky_project — Séan-Shell (NecroTerm) 👻🕯️

> **A Cute & Spooky Retro Spectral Terminal for developers, haunted by vintage programming spirits and antique computing relics.**

---

## 🔮 Overview

**Séan-Shell (NecroTerm)** is a playful, antique-themed retro terminal built with React and Vite. It blends the nostalgia of cathode-ray tube terminals, 80-column Hollerith punch cards, and vintage magnetic tapes with an interactive 8-bit ghost companion. 

Whether observing passive shell events or summoning the ghosts of historical programming languages, Séan-Shell keeps you company with eerie whispers, retro soundscapes, and offline-first local intelligence.

---

## ✨ Features

- 👻 **8-Bit Ghost Mascot & Altar**: Animated spectral mascot responding dynamically to successes, command errors, and ongoing séances with flickering candlelight.
- 📜 **Parchment & CRT Aesthetic**: Retro monospace typography (`Courier Prime`, `VT323`, `Cinzel Decorative`), CRT scanline vignette, and warm amber-green spectral palette.
- 🕯️ **Séance Mode (Summon Vintage Spirits)**: Channel the ghosts of historic languages and paradigms:
  - **COBOL** (1959) — Mainframe record-keeper & business logic specter
  - **Ada** (1980) — Mission-critical defense & strict type-safety guardian
  - **Fortran 77** (1977) — High-performance numeric & punch-card phantom
  - **LISP** (1958) — Symbolic recursion & parenthetical seer
  - **Algol 68** (1968) — Orthogonal formalist & BNF architect
  - **INTERCAL** (1972) — Parodic trickster demanding polite `PLEASE` syntax
  - **FORTH** (1970) — Stack-oriented, dictionary-driven minimalist
- 📇 **Hollerith Punch Card Generator**: Stamp any text directly into authentic 80-column ASCII punch cards (`punchcard <text>`).
- 🔊 **Spectral Web Audio Synthesizer**: Built-in procedural sound effects (séance gongs, mechanical key clacks, spectral chimes, error shudders) using Web Audio API — zero external audio assets required.
- 🛡️ **Air-Gapped & Local Inference Ready**: Connects to local LLMs (such as Ollama with `gemma2:2b`) with automatic fallback to built-in offline spectral dialogue generators.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- Optional: [Ollama](https://ollama.com/) running locally on `http://localhost:11434` for AI-powered séances.

### Installation

```bash
# Clone the repository
git clone https://github.com/srinjoyeegoswami/spooky_project.git

# Navigate into the project folder
cd spooky_project

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to enter the spectral terminal.

---

## 📖 Terminal Commands (Grimoire of Rites)

Type any of the following rites in the terminal bar:

| Rite / Command | Description |
| :--- | :--- |
| `summon <language>` | Awaken a vintage spirit (e.g., `summon cobol`, `summon ada`, `summon lisp`) |
| `summon` | Open the Grimoire drawer to browse and select spirits |
| `dismiss` | Conclude the active séance and release the spirit back into the ether |
| `punchcard <text>` | Generate an 80-column Hollerith punch card from your text |
| `[SHELL_EVENT] ...` | Feed raw shell events to trigger passive ghost evaluations |
| `whoami` | Discover the origin story of Séan-Shell |
| `status` | Display core storage telemetry and air-gap security status |
| `clear` | Cleanse the terminal parchment |
| `help` | Consult the Grimoire for available rites |

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 + Custom CRT & Parchment CSS filters
- **Icons**: Lucide React
- **Audio**: Web Audio API (procedural synthesized soundscapes)
- **Effects**: Canvas Confetti & retro CSS animations

---

## 📜 License

MIT License. Designed with 🕯️ and 👻 for developers who enjoy vintage computing aesthetics.
