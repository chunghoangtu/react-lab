import { motion } from "motion/react";

export default function LiveBadge() {
  return (
    <motion.div
      className="h-50 bg-slate-900 m-10 p-5 rounded-xl flex flex-col items-center justify-center
        gap-5'"
    >
      <motion.span
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            "0 0 0px rgba(198, 28, 255, 0.4)",
            "0 0 20px rgba(200, 0, 255, 0.7)",
            "0 0 0px rgba(153, 0, 255, 0.4)",
          ],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
        className='bg-fuchsia-800 text-fuchsia-100 font-bold py-3 px-6 rounded-3xl'
      >
        LIVE BADGE
      </motion.span>
    </motion.div>
  );
}
