import GiftBox from "../assets/gift_box.png";
import Confetti from "../composant/Confetti";
import { Gift } from "lucide-react";
import { useNavigate } from "react-router";

function Landing() {
  let navigate = useNavigate();

  return (
    <>
      <Confetti />
      <main className="mx-1">
        <h1 className="leading-10">Joyeux 50ème Anniversaire !</h1>
        <p className="italic">
          Cadeau de la part de Loulou et Alice. On t'aime Manue ❤️❤️❤️.
        </p>
        <img
          src={GiftBox}
          alt="Gift Box"
          className="floating-gift w-[40vh] sm:w-[50vh] mx-auto mt-10 rounded-2xl"
        />
        <button
          type="button"
          className="shimmer-effect text-white text-sm font-semibold uppercase tracking-wider px-12 py-4 rounded-full shadow-lg flex items-center gap-3 mx-auto mt-8 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          onClick={() => navigate("/unboxing")}
        >
          <Gift size={20} aria-hidden="true" />
          OUVRIR LE CADEAU
        </button>
      </main>
    </>
  );
}

export default Landing;
