"use client";

import { motion } from "framer-motion";

export default function MinerHero() {
  return (
    <motion.div
      animate={{
        y: [-5, 5, -5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity
      }}
      className="relative"
    >
      <div className="miner-shadow" />

      <div className="miner-body">

        <motion.div
          animate={{
            rotate: [25, -25, 25]
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}
          className="miner-wave"
        />

      </div>
    </motion.div>
  );
}
