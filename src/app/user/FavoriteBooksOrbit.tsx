import Image from "next/image";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";

interface OrbitBook {
  title: string;
  image: string;
}

interface Props {
  avatarSrc: string;
  avatarAlt: string;
  books: OrbitBook[];
}

const CONTAINER_SIZE = 600;
const RADIUS = 210;
const START_ANGLE = 180; // first book sits at the top, rest fan out clockwise
const SATELLITE_SIZE = 160;
const AVATAR_SIZE = 200;

const FavoriteBooksOrbit = ({ avatarSrc, avatarAlt, books }: Props) => {
  const satellites = books.slice(0, 5);
  const center = CONTAINER_SIZE / 2;

  return (
    <div
      className="relative rounded-full  shadow-inner ring-1 ring-[#e8dfd0]"
      style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}
    >
      <div
        className="absolute left-1/2 top-1/2 overflow-hidden rounded-full border-4 border-white shadow-md"
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src={avatarSrc}
          alt={avatarAlt}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          style={{ objectFit: "cover", width: "100%", height: "100%",padding:'2px' }}
        />
      </div>

      {/* OrbitingCircles centers each child exactly on its ring point, so the
          child must be just the circle — anything else (like a label) inside
          it shifts the circle off-center by half the extra content's size. */}
      <OrbitingCircles radius={RADIUS} startAngle={START_ANGLE} path={false} paused>
        {satellites.map((book) => (
          <div
            key={book.title}
            className="overflow-hidden rounded-4xl  shadow-sm"
            style={{ width: SATELLITE_SIZE, height: SATELLITE_SIZE }}
          >
            <Image
              src={book.image}
              alt={book.title}
              width={SATELLITE_SIZE}
              height={SATELLITE_SIZE}
              style={{ objectFit: "cover", height: "100%", width: "75%"}}
            />
          </div>
        ))}
      </OrbitingCircles>

      {/* Labels are positioned independently below each circle, using the
          same angle formula, so they stay put regardless of the circle size. */}
      {satellites.map((book, i) => {
        const angle = START_ANGLE + (360 / satellites.length) * i;
        const rad = (angle * Math.PI) / 180;
        const x = center - RADIUS * Math.sin(rad);
        const y = center + RADIUS * Math.cos(rad);
        return (
          <div
            key={book.title}
            className="absolute w-[140px] text-center font-serif text-sm leading-tight text-[#2f2418]"
            style={{
              left: x,
              top: y + SATELLITE_SIZE / 2 + 8,
              transform: "translateX(-50%)",
            }}
          >
            {book.title}
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteBooksOrbit;
