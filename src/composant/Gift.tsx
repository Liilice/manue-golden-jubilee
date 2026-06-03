import { useNavigate } from "react-router";
import Confetti from "./Confetti";

const Gift = () => {
  const navigate = useNavigate();

  return (
    <>
      <Confetti />
      <main className="fade-in flex flex-col items-center gap-6 px-6">
        <h1 className="text-gold-dark">Surprise, Manue ! 🎉</h1>
        <p className="italic max-w-md">
          Joyeux 50ème anniversaire ! Voici ton cadeau de la part de Loulou et
          Alice ❤️
        </p>
        <button
          type="button"
          className="shimmer-effect text-white text-sm font-semibold uppercase tracking-wider px-12 py-4 rounded-full shadow-lg mt-4 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          onClick={() => navigate("/")}
        >
          Revenir à l'accueil
        </button>
      </main>
    </>
  );
};

export default Gift;
