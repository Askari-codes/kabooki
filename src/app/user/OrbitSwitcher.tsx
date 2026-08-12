"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flex } from "@radix-ui/themes";
import FavoriteOrbit, { OrbitItem } from "./FavoriteOrbit";

interface OrbitGroup {
  label: string;
  items: OrbitItem[];
}

interface Props {
  avatarSrc: string;
  avatarAlt: string;
  orbits: OrbitGroup[];
}

const OrbitSwitcher = ({ avatarSrc, avatarAlt, orbits }: Props) => {
  const [index, setIndex] = useState(0);
  const active = orbits[index];

  return (
    <Flex direction="column" align="center" gap="4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.label}
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.85, rotate: 8 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <FavoriteOrbit avatarSrc={avatarSrc} avatarAlt={avatarAlt} items={active.items} />
        </motion.div>
      </AnimatePresence>

      {orbits.length > 1 && (
        <Flex gap="2" align="center">
          {orbits.map((orbit, i) => (
            <button
              key={orbit.label}
              type="button"
              onClick={() => setIndex(i)}
              className="cursor-pointer rounded-full border px-3 py-1 text-sm font-medium transition-colors"
              style={
                i === index
                  ? { backgroundColor: "#7c4a24", borderColor: "#7c4a24", color: "#ffffff" }
                  : { backgroundColor: "transparent", borderColor: "#e8dfd0", color: "#2f2418" }
              }
            >
              {orbit.label}
            </button>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default OrbitSwitcher;
