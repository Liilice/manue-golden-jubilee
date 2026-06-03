import { useCallback, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import GiftBox from "../assets/gift_box.png";
import Gift from "../composant/Gift";
import { useShake } from "../composant/useShake";

const MAX_TAPS = 6; 
const PARTICLE_COLORS = ["#d4af37", "#ffe088", "#e9c349", "#ffffff"];

const PHRASES = [
  "Secoue / Tape !",
  "Encore un petit effort...",
  "Ça bouge !",
  "Presque là...",
  "C'est pour bientôt...",
  "PRÊT !",
];

const Unboxing = () => {
  const [taps, setTaps] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const giftRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);

  // Projette une gerbe d'étincelles depuis (x, y) en coordonnées écran.
  const spawnParticles = useCallback((x: number, y: number) => {
    const container = particleRef.current;
    if (!container) return;
    for (let i = 0; i < 12; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      p.textContent = Math.random() > 0.5 ? "✨" : "⭐";
      p.style.fontSize = `${Math.random() * 10 + 10}px`;
      p.style.color =
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.setProperty("--x", `${(Math.random() - 0.5) * 300}px`);
      p.style.setProperty("--y", `${(Math.random() - 0.5) * 300 - 50}px`);
      p.style.setProperty("--r", `${(Math.random() - 0.5) * 720}deg`);
      container.appendChild(p);
      window.setTimeout(() => p.remove(), 1000);
    }
  }, []);

  const registerHit = useCallback(
    (x?: number, y?: number) => {
      const box = giftRef.current;
      const rect = box?.getBoundingClientRect();
      const px = x ?? (rect ? rect.left + rect.width / 2 : 0);
      const py = y ?? (rect ? rect.top + rect.height / 2 : 0);

      if (box) {
        box.classList.remove("shake-animation");
        void box.offsetWidth;
        box.classList.add("shake-animation");
      }
      spawnParticles(px, py);

      setTaps((prev) => {
        if (prev >= MAX_TAPS) return prev;
        const next = prev + 1;
        if (next === MAX_TAPS) window.setTimeout(() => setRevealed(true), 900);
        return next;
      });
    },
    [spawnParticles],
  );

  const shake = useShake(() => registerHit(), !revealed);

  const progress = (taps / MAX_TAPS) * 100;
  const instruction = taps < MAX_TAPS ? PHRASES[taps] : PHRASES[MAX_TAPS - 1];

  if (revealed) return <Gift />;

  return (
    <main className="flex flex-col items-center justify-center gap-8 px-6 w-full">
      <div ref={particleRef} className="particle-container" aria-hidden="true" />

      <div className="w-full max-w-md">
        <div className="flex justify-between items-end mb-1">
          <span className="uppercase tracking-widest text-[10px] text-gold-dark font-semibold">
            Niveau d'excitation
          </span>
          <span className="text-xs text-ink/60">
            {taps}/{MAX_TAPS}
          </span>
        </div>
        <div className="h-3 w-full rounded-full overflow-hidden bg-track-inactive">
          <div
            className="hype-bar h-full rounded-full"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, var(--color-jubilee), #f4d03f)",
            }}
          />
        </div>
      </div>

      <div className="text-center fade-in select-none">
        <h1 className="text-gold-dark">{instruction}</h1>
        <p className="italic mt-1 text-ink/70">
          {shake.supported
            ? "Secoue ton téléphone (ou tape sur le cadeau) !"
            : "Tape sur le cadeau pour l'ouvrir..."}
        </p>
      </div>

      <div
        ref={giftRef}
        role="button"
        tabIndex={0}
        aria-label="Ouvrir le cadeau"
        className="relative w-[60vw] sm:max-w-90 cursor-pointer select-none transition-transform active:scale-95"
        onClick={(e) => registerHit(e.clientX, e.clientY)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            registerHit();
          }
        }}
      >
        <img
          src={GiftBox}
          alt="Cadeau à ouvrir"
          className="w-full h-auto rounded-2xl shadow-2xl pointer-events-none"
        />
      </div>

      {shake.needsPermission && !shake.allowed && (
        <button
          type="button"
          onClick={shake.enable}
          className="flex items-center gap-2 text-sm text-gold-dark underline cursor-pointer"
        >
          <Sparkles size={16} aria-hidden="true" />
          Activer la détection de secousse
        </button>
      )}
    </main>
  );
};

export default Unboxing;
