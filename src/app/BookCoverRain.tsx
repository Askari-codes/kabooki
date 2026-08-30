"use client";

import Image from "next/image";

// Each column duplicates its own covers back-to-back and scrolls from
// translateY(-50%) to translateY(0%) — since both halves are identical, the
// loop point is invisible, giving a seamless top-to-bottom scroll regardless
// of the column's actual rendered height.
const coverColumns: string[][] = [
  ["/books/Hamlet.jpg", "/books/Macbeth.jpg", "/books/Othello.jpg", "/books/King-Lear.jpg", "/books/Romeo-and-Juliet.jpg"],
  [
    "/books/Mario-Vargas-Llosa/the-feast-of-the-goat.jpg",
    "/books/Mario-Vargas-Llosa/the-time-of-the-hero.jpg",
    "/books/Mario-Vargas-Llosa/the-green-house.jpg",
    "/books/Mario-Vargas-Llosa/conversation-in-the-cathedral.jpg",
    "/books/Mario-Vargas-Llosa/the-storyteller.jpg",
  ],
  [
    "/books/Carlos-Fuentes/aura.jpg",
    "/books/Carlos-Fuentes/terra-nostra.jpg",
    "/books/Carlos-Fuentes/the-death-of-artemio-cruz.jpg",
    "/books/Carlos-Fuentes/the-old-gringo.jpg",
    "/books/Carlos-Fuentes/distant-relations.jpg",
  ],
  [
    "/books/jose-saramago/blindness.jpg",
    "/books/julio-cortazar/hopscotch.jpg",
    "/books/juan-rulfo/pedro-paramo.jpg",
    "/books/william-faulkner/the-sound-and-the-fury.jpg",
    "/books/Pride and Prejudice.jpg",
  ],
  ["/books/Emma.jpg", "/books/vanity-fair.jpg", "/books/a-tale-of-two-cities.jpg", "/books/Julius-Caesar.jpg", "/books/Coriolanus.jpg"],
  [
    "/books/Mario-Vargas-Llosa/the-bad-girl.jpg",
    "/books/Mario-Vargas-Llosa/death-in-the-andes.jpg",
    "/books/Carlos-Fuentes/happy-families.jpg",
    "/books/Carlos-Fuentes/the-hydra-head.jpg",
    "/books/Timon-of-Athens.jpg",
  ],
];

interface Props {
  paused: boolean;
  onToggle: () => void;
}

const BookCoverRain = ({ paused, onToggle }: Props) => {
  return (
    <div onClick={onToggle} className="absolute inset-0 z-0 cursor-pointer overflow-hidden">
      <div className="grid h-full grid-cols-6 gap-4 px-4 opacity-50 grayscale">
        {coverColumns.map((covers, i) => (
          <div key={i} className="relative h-full overflow-hidden">
            <div
              className="flex animate-scroll-down flex-col gap-4"
              style={
                {
                  "--duration": 24 + i * 5,
                  animationPlayState: paused ? "paused" : "running",
                } as React.CSSProperties
              }
            >
              {[...covers, ...covers].map((src, j) => (
                <div key={j} className="relative aspect-[2/3] w-full shrink-0 overflow-hidden rounded-md">
                  <Image src={src} alt="" fill sizes="200px" style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0d0a]/85 via-[#0f0d0a]/45 to-[#0f0d0a]/85" />
    </div>
  );
};

export default BookCoverRain;
