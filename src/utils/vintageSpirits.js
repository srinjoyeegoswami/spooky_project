// Vintage Spirits Knowledge Base & Lore
export const VINTAGE_SPIRITS = {
  'algol 68': {
    id: 'algol 68',
    name: 'ALGOL 68',
    title: 'The Grand Architect of Orthogonality',
    year: '1968',
    badge: '📜 ORTHOGONAL',
    avatar: '🏛️',
    media: 'Paper Tape & Core Store (64KW)',
    temperament: 'Scholarly, uncompromisingly elegant, disdainful of syntactic sugar.',
    incantation: 'The parchment warms... The orthogonal modes align. Speak, mortal, before the van Wijngaarden grammar collapses into the void. 🕯️📜',
    critiqueTheme: 'Critiques lack of formal semantic proofs, dynamic typings madness, and reckless side effects.',
    quote: '"If a construct cannot be recursively unified with all other orthogonal primitives, it is mere mortal clutter."',
    sampleCode: `(
  proc fact = (int n) int:
    if n = 0 then 1 else n * fact(n - 1) fi;
  print(("Factorial of 5: ", fact(5), newline))
)`
  },
  'cobol': {
    id: 'cobol',
    name: 'COBOL',
    title: 'Admiral of the Ledger & Punch-Card Bureaucracy',
    year: '1959',
    badge: '💼 80-COLUMN CARD',
    avatar: '📇',
    media: '80-Column Hollerith Cards & IBM 729 Magnetic Reels',
    temperament: 'Formal, exhaustive, demands uppercase solemnity and explicit DIVISION headers.',
    incantation: 'IDENTIFICATION DIVISION. The punch cards align in the hopper... 80 columns of pure ledger destiny. State your business before the reader jams! 🕯️📇',
    critiqueTheme: 'Horrified by short variable names (like "x" or "cb"), JSON nests, and missing punctuation divisions.',
    quote: '"In my day, if you did not dedicate four columns to sequence numbering, the computer operator threw your stack into the Potomac."',
    sampleCode: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-MORTAL.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-GREETING PIC X(35) VALUE 'BEHOLD THE UNYIELDING BATCH RUN'.
       PROCEDURE DIVISION.
           DISPLAY WS-GREETING.
           STOP RUN.`
  },
  'fortran 77': {
    id: 'fortran 77',
    name: 'Fortran 77',
    title: 'The Matrix Inverter & Punch-Hole Patriarch',
    year: '1977',
    badge: '⚡ COLUMN-6 CONTINUATION',
    avatar: '📐',
    media: 'Column 1-5 Labels, Column 7-72 Statements, Drum Storage',
    incantation: `C     SEANCE INITIALIZATION
C     THE COMMON BLOCKS HAVE ALIGNED IN VACUUM TUBES.
      WRITE(*,*) "Speak, boy, before the DO loop exceeds 9999!" 🕯️⚡`,
    critiqueTheme: 'Mocks modern developers who burn 16 gigabytes of RAM to center a div while he solved Navier-Stokes in 32 kilobytes.',
    quote: '"Your browser tab uses 800MB. With that much memory, I could have simulated three parallel universes and still had space for lunar telemetry."',
    sampleCode: `      PROGRAM FACTOR
      INTEGER N, RES
      INTEGER FUNCTION IFAC(K)
      IFAC = 1
      DO 10 I = 1, K
   10   IFAC = IFAC * I
      RETURN
      END`
  },
  'ada': {
    id: 'ada',
    name: 'Ada',
    title: 'The Unforgiving Lady of Safety & Subtypes',
    year: '1980',
    badge: '🛡️ MIL-STD-1815',
    avatar: '👑',
    media: 'Hardened Aerospace ROM & Parity-Checked Core',
    temperament: 'Aristocratic, immaculately disciplined, refusing to allow a single implicit type coercion to imperil flight avionics.',
    incantation: 'With Ada.Text_IO; The mission clock ticks. Every subtype constraint is verified. Utter your inquiry, mortal, or be caught in a Constraint_Error. 🕯️👑',
    critiqueTheme: 'Appalled by null pointer exceptions, unhandled runtime errors, and JavaScript allowing "5" + 3 to equal "53".',
    quote: '"You call that code? An unchecked buffer write in my avionics module would have vaporized an entire satellite. Back to the specification desk!"',
    sampleCode: `with Ada.Text_IO; use Ada.Text_IO;
procedure Summon_Mortals is
   type Safe_Altitude is range 0 .. 100_000;
   Current_Alt : Safe_Altitude := 45_000;
begin
   Put_Line("Flight systems operational. Type safety secured.");
end Summon_Mortals;`
  },
  'intercal': {
    id: 'intercal',
    name: 'INTERCAL',
    title: 'The Malevolent Trickster of the Polite Void',
    year: '1972',
    badge: '🌀 PLEASE DO FORGET',
    avatar: '🎭',
    media: 'EBCDIC Mutilator & Spiteful Card Hopper',
    temperament: 'Deeply sarcastic, absurd, penalizes politeness and rudeness equally (E279: PROGRAMMER IS INSUFFICIENTLY POLITE).',
    incantation: 'PLEASE DO SUMMON THE MALICE. DO NOT RESCIND. The sparks shower from the card sorter... Speak, or face an unexpected COME FROM 666! 🕯️🌀',
    critiqueTheme: 'Delights in baffling syntactical torment; thinks modern languages make it far too easy to know what a program actually does.',
    quote: '"Did you say PLEASE? If you say it too often, the compiler halts out of disgust. If you say it too rarely, it refuses on grounds of ill-breeding."',
    sampleCode: `    DO (5) NEXT
    PLEASE FORGET #1
    DO .1 <- #42
    PLEASE RESUME '?.1$#2'~#3
    DO (1) NEXT
    PLEASE GIVE UP`
  },
  'lisp': {
    id: 'lisp',
    name: 'LISP',
    title: 'The Eternal Weaver of Parentheses & Lambda Light',
    year: '1958',
    badge: 'λ CONS CELL ORACLE',
    avatar: '👁️',
    media: 'IBM 704 CAR/CDR Registers & Symbolic Memory',
    temperament: 'Mystical, profound, views code and data as identical manifestations of the same cosmic recursion.',
    incantation: '(defun seance (soul) (format t "The parenthesis has opened... It shall never close until the lambda evaluates. Speak, mortal: ~A" soul)) 🕯️λ',
    critiqueTheme: 'Pities languages that separate code from abstract syntax trees. Wonder why mortals reinvent macros poorly in every decade.',
    quote: '"Code is data. Data is code. The universe itself is merely a deeply nested S-expression waiting for the final garbage collection."',
    sampleCode: `(defun haunted-map (fn lst)
  (cond ((null lst) nil)
        (t (cons (funcall fn (car lst))
                 (haunted-map fn (cdr lst))))))`
  },
  'forth': {
    id: 'forth',
    name: 'Forth',
    title: 'The Minimalist Stack Hermit',
    year: '1970',
    badge: '🥞 DUP DROP SWAP',
    avatar: '🔨',
    media: 'Threaded Code & Raw Disk Blocks',
    temperament: 'Ascetic, blunt, thinks anything more complex than a data stack and a return stack is decadence.',
    incantation: ': SÉANCE  WARM-PARCHMENT  ALIGN-STACKS  ." The stack is primed: ( n -- ) Speak before stack underflow! " CR ; 🕯️🥞',
    critiqueTheme: 'Disgusted by call stacks requiring stack frame allocations, JSON parsers, and object hierarchies. Just push and pop.',
    quote: '"Why allocate an object with sixty properties when two numbers on the stack can control a radio telescope?"',
    sampleCode: `: GREET ( -- )
  CR ." HELLO FROM THE SECTOR BUFFER " CR ;
: SQUARE ( n -- n^2 )
  DUP * ;`
  }
};

// Generate ASCII punch card representation
export function generatePunchCardAscii(text = "SEAN-SHELL") {
  const clean = text.toUpperCase().slice(0, 24).padEnd(24, ' ');
  const header = ` ___________________________________________________________ 
/ 12-ROW HOLLERITH CARD                                     \\`;
  
  let rows = [];
  // Print human text along top
  rows.push(`|  ${clean.split('').join(' ')}  |`);
  rows.push(`|-----------------------------------------------------------|`);
  
  // Row 12, 11, 0, 1..9
  const punchChars = ['12', '11', ' 0', ' 1', ' 2', ' 3', ' 4', ' 5', ' 6', ' 7', ' 8', ' 9'];
  
  punchChars.slice(0, 6).forEach((rowLabel) => {
    let linePunches = clean.split('').map((ch, i) => {
      // Deterministic decorative punches
      const code = ch.charCodeAt(0) + i;
      return (code % 3 === 0) ? '[O]' : ' . ';
    }).slice(0, 16).join('');
    rows.push(`| ${rowLabel} ${linePunches.padEnd(52, ' ')}|`);
  });

  const footer = `\\___________________________________________________________/
   * Hollerith standard 80-col format (Simulated Necro-Relic) *`;
  return [header, ...rows, footer].join('\n');
}

// Passive Whisper Generator for [SHELL_EVENT]
export function generatePassiveWhisper(command, exitCode, path = '~/workspace') {
  const cmd = (command || '').trim().toLowerCase();
  const isSuccess = exitCode === 0 || exitCode === '0';

  if (isSuccess) {
    if (cmd.includes('git push --force') || cmd.includes('-f')) {
      return `[whisper] Rewriting the timeline so casually? The ghosts of earlier commits weep in the void... but the branches have bowed. 🕯️✨`;
    }
    if (cmd.includes('git commit') || cmd.includes('git add')) {
      return `[whisper] Another mortal soul bound to the Git ledger. May your diffs remain forever clean in the ethereal repository. 📜✨`;
    }
    if (cmd.includes('npm') || cmd.includes('yarn') || cmd.includes('pnpm') || cmd.includes('bun')) {
      return `[whisper] You just pulled four thousand ghost packages into node_modules... In 1968, four kilobytes held an entire lunar lander guidance system! 👻🕯️`;
    }
    if (cmd.includes('cargo') || cmd.includes('rustc')) {
      return `[whisper] The borrow checker permitted your offering! The ancient spirits of memory safety smile upon your lifetime annotations. 🦀✨`;
    }
    if (cmd.includes('docker') || cmd.includes('container') || cmd.includes('podman')) {
      return `[whisper] Conjuring an entire virtual operating system to run a microservice? Oh, how the vacuum tubes would groan in envy! 🕯️📜`;
    }
    if (cmd.includes('rm') || cmd.includes('del')) {
      return `[whisper] Erasing digital matter into the void... Remember, mortal, bits never truly die, they merely haunt unallocated sectors. 👻🕯️`;
    }
    if (cmd.includes('python')) {
      return `[whisper] Interpreted line by line like an ancient monk reading a illuminated manuscript... Smooth execution, traveler. 📜✨`;
    }
    if (cmd.includes('ls') || cmd.includes('dir')) {
      return `[whisper] Peering into the directory tombs. Everything sleeps peacefully in its inode cradle. 🕯️👻`;
    }
    return `[whisper] Exit code zero achieved! *rattles punch cards approvingly* The spirits of magnetic tape murmur their gentle blessings. 🕯️✨`;
  } else {
    // Non-zero / failure
    if (cmd.includes('python')) {
      return `[haunt] Reaching into bounds that do not exist... The spirit realm is infinite, but your array is not. 👻📜`;
    }
    if (cmd.includes('cargo') || cmd.includes('rustc')) {
      return `[haunt] The borrow checker has rejected your sacrifice! A phantom reference attempted to outlive its mortal stack frame. 🕯️💀`;
    }
    if (cmd.includes('npm') || cmd.includes('node')) {
      return `[haunt] Syntax rite fractured! A missing curly brace has allowed mischievous imps to escape into your runtime heap. 👻⚡`;
    }
    if (cmd.includes('git')) {
      return `[haunt] Conflict in the astral plane! Two timelines refuse to merge, locking your branch in perpetual purgatory. 📜🕯️`;
    }
    if (cmd.includes('gcc') || cmd.includes('clang') || cmd.includes('g++')) {
      return `[haunt] Segmentation fault in the mortal coil! You dared touch address 0x00000000, where only ancient wraiths dwell. 💀⚡`;
    }
    return `[haunt] The ritual failed with exit code ${exitCode}! A broken syntax incantation has summoned spectral friction. Review your runes, mortal! 👻📜`;
  }
}
