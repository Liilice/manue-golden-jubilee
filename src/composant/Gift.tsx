import { useNavigate } from "react-router";
import {
  Sparkles,
  HeartHandshake,
  RotateCcw,
  Gift as GiftIcon,
} from "lucide-react";
import Confetti from "./Confetti";
import Staycation from "../assets/staycation.png";

// Image du cadeau (collier). Remplace l'URL par ton propre visuel si besoin.
const GIFT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBkvk6_ySCflSEV15WdB3UJ2IqM6bgQdoRG250lmJxxFUKSZKk3T0f20cOvcowtMEOoX8hsU4jiHffJ4XIlDdxOrEeKSLZOeLJ-_DjaVYV17rcUuNN2qKOpSJ8Iq675PjeOITwltmk2rCHnesv6Hm0sEro7gS_jwSuIUF1QsvhEL54JAYTDxE0oAzCW7Cr4gqdCvT65ffgBVJWMgPY-7IPKwy_7VWRW_XRgS9I9GJLGV_2_TMN3uFAfyr4-ARXMJxVw66erLwviM3on";

const Gift = () => {
  const navigate = useNavigate();

  return (
    <>
      <Confetti />

      <main className="relative pt-10 pb-10 px-5 md:px-16 mx-auto flex flex-col items-center">
        {/* Titre */}
        <section className="w-full flex flex-col items-center text-center mb-6">
          <h1 className="text-gold-dark mb-2">Surprise !</h1>
          <h2 className="text-ink/70">Joyeux 50 ans Manue !</h2>
        </section>

        {/* Le cadeau */}
        <section className="relative w-full max-w-4xl mb-16">
          <div className="floating relative aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/30 shadow-[0_20px_50px_rgba(212,175,55,0.25)]">
            <img
              src={Staycation}
              alt="Weekend surprise"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Messages d'affection */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-16">
          <article className="glass-panel p-8 rounded-3xl border border-white/20 shadow-sm flex flex-col items-center text-center">
            <Sparkles className="text-gold-dark mb-4" size={44} />
            <h2 className="mb-4">Un mot de Loulou</h2>
            <p className="italic text-gold-mid">
              "Joyeux anniversaire Maman. Aujourd'hui c'est ta journée, et je
              voulais juste te dire à quel point je suis fier de t'avoir comme
              mère. Merci pour tout ce que tu fais, pour ton amour et ta
              présence de chaque instant. Je t'aime très fort. Profite à fond de
              ton jour, tu le mérites plus que personne."
            </p>
          </article>

          <article className="glass-panel p-8 rounded-3xl border border-white/20 shadow-sm flex flex-col items-center text-center">
            <HeartHandshake className="text-gold-dark mb-4" size={44} />
            <h2 className="mb-4">De la part d'Alice</h2>
            <p className="italic text-gold-mid">
              "Chère Manue, joyeux anniversaire du fond du cœur ! Que cette
              année t'apporte santé, bonheur et de jolis moments tous ensemble.
              Je t'embrasse fort."
            </p>
          </article>
        </section>

        {/* Recommencer */}
        <div className="flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="shimmer-effect text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <RotateCcw size={20} aria-hidden="true" />
            Recommencer la Surprise
          </button>
          <p className="text-ink/60 text-sm">Créé avec amour pour Manue</p>
        </div>
      </main>
    </>
  );
};

export default Gift;
