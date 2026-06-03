import { useCallback, useEffect, useState } from "react";

// iOS 13+ expose une méthode de permission non standard sur DeviceMotionEvent.
type MotionCtor = typeof DeviceMotionEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

const THRESHOLD = 15; // sensibilité (plus bas = plus sensible)
const COOLDOWN = 400; // ms entre deux secousses comptées

const motionCtor =
  typeof window !== "undefined" && "DeviceMotionEvent" in window
    ? (window.DeviceMotionEvent as MotionCtor)
    : undefined;

/**
 * Détecte les secousses du téléphone et appelle `onShake` à chaque coup.
 * Isole toute la logique d'accéléromètre + permission iOS.
 *
 * @param onShake  callback déclenché à chaque secousse
 * @param enabled  active/désactive l'écoute
 */
export function useShake(onShake: () => void, enabled = true) {
  const supported = motionCtor !== undefined;
  const needsPermission = typeof motionCtor?.requestPermission === "function";
  // Sur Android/desktop : pas de permission requise → autorisé d'office.
  const [allowed, setAllowed] = useState(!needsPermission);

  // Demande la permission iOS (à appeler depuis un geste utilisateur).
  const enable = useCallback(async () => {
    if (!motionCtor?.requestPermission) return;
    try {
      setAllowed((await motionCtor.requestPermission()) === "granted");
    } catch {
      setAllowed(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled || !allowed || !supported) return;

    let last = { x: 0, y: 0, z: 0 };
    let lastHit = 0;

    const onMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const now = Date.now();
      if (now - lastHit < COOLDOWN) return;

      const x = acc.x ?? 0;
      const y = acc.y ?? 0;
      const z = acc.z ?? 0;
      const delta = Math.hypot(x - last.x, y - last.y, z - last.z);
      last = { x, y, z };

      if (delta > THRESHOLD) {
        lastHit = now;
        onShake();
      }
    };

    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, [enabled, allowed, supported, onShake]);

  return { supported, needsPermission, allowed, enable };
}
