"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Flex } from "@radix-ui/themes";
import FavoriteOrbit, { OrbitItem } from "./FavoriteOrbit";
import { useCategory } from "./CategoryContext";

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
  const { category, setCategory } = useCategory();
  const active = orbits.find((orbit) => orbit.label === category) ?? orbits[0];

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
          {orbits.map((orbit) => (
            <button
              key={orbit.label}
              type="button"
              onClick={() => setCategory(orbit.label)}
              className="cursor-pointer rounded-full border px-3 py-1 text-sm font-medium transition-colors"
              style={
                orbit.label === active.label
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
