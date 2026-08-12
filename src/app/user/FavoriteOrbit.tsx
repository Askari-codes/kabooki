"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as Tooltip from "@radix-ui/react-tooltip";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { useEffect } from "react";

export interface OrbitItem {
  title: string;
  image: string;
  href?: string;
}

interface Props {
  avatarSrc: string;
  avatarAlt: string;
  items: OrbitItem[];
}

const CONTAINER_SIZE = 600;
const RADIUS = 210;
const START_ANGLE = 180; // first item sits at the top, rest fan out clockwise
const SATELLITE_SIZE = 160;
const AVATAR_SIZE = 180;

const FavoriteOrbit = ({ avatarSrc, avatarAlt, items }: Props) => {
  const satellites = items.slice(0, 5);
  const [isPaused, setIsPaused] = React.useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsPaused(false);
    }, [pathname])
    
  

  return (
    <div
      className="relative rounded-full  "
      style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}
      
    >
      <div
        className="absolute left-1/2 top-1/2 overflow-hidden rounded-full  "
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          transform: "translate(-50%, -50%)",
        }}
        onClick={() => setIsPaused((paused) => !paused)}
      >
        <Image
          src={avatarSrc}
          alt={avatarAlt}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          style={{ objectFit: "cover", width: "100%", height: "100%",}}
        />
      </div>

      {/* OrbitingCircles centers each child exactly on its ring point, so the
          child must be just the circle — anything else (like a label) inside
          it shifts the circle off-center by half the extra content's size.
          Tooltip.Root/Provider/Portal render no DOM of their own here, so the
          Trigger's cloned element stays the only real child. */}
      <OrbitingCircles radius={RADIUS} startAngle={START_ANGLE} paused={isPaused} path={false}   duration={50}>
        {satellites.map((item) => (
          <Tooltip.Provider key={item.title} delayDuration={150}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block overflow-hidden rounded-4xl shadow-sm transition-transform hover:scale-105"
                    style={{ width: SATELLITE_SIZE, height: SATELLITE_SIZE }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={SATELLITE_SIZE}
                      height={SATELLITE_SIZE}
                      style={{ objectFit: "cover", height: "100%", width: "75%" }}
                    />
                  </Link>
                ) : (
                  <div
                    className="overflow-hidden rounded-4xl  shadow-sm"
                    style={{ width: SATELLITE_SIZE, height: SATELLITE_SIZE }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={SATELLITE_SIZE}
                      height={SATELLITE_SIZE}
                      style={{ objectFit: "cover", height: "100%", width: "75%" }}
                    />
                  </div>
                )}
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  sideOffset={8}
                  align="center"
                  side="top"
                  className="z-50 select-none rounded-md bg-[#2f2418] px-3 py-1.5 text-xs font-medium text-white shadow-md animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
                >
                  {item.title}
                  <Tooltip.Arrow className="fill-[#2f2418]" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        ))}
      </OrbitingCircles>
    </div>
  );
};

export default FavoriteOrbit;
