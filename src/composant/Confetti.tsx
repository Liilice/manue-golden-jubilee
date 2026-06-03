const COLORS = ["#d4af37", "#e9c349", "#fce4ec", "#e8f5e9", "#fdcde1"];
const COUNT = 40; // nombre de confettis

const PIECES = Array.from({ length: COUNT }, (_, i) => ({
  left: Math.random() * 100, 
  size: Math.random() * 8 + 6,
  delay: Math.random() * 6, 
  duration: Math.random() * 3 + 4, 
  drift: (Math.random() - 0.5) * 120,
  color: COLORS[i % COLORS.length],
}));

export default function Confetti() {
  return (
    <div className="confetti-container" aria-hidden="true">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="confetti"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
