import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AnimatedButton from "@/components/AnimatedButton";

export default function DismissibleAlert() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className='relative bg-slate-900 h-100 m-10 p-10 rounded-xl flex flex-col justify-center items-center
        gap-5 relative'
    >
      <AnimatedButton
        className='p-5 bg-slate-950 text-slate-100 rounded-2xl'
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        Toggle alert
      </AnimatedButton>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='absolute top-6 bg-cyan-600 border border-cyan-300 p-5 rounded-2xl text-xl text-cyan-50'
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            transition={{ duration: 0.5 }}
            exit={{ y: -30, opacity: 0 }}
          >
            This is an animated alert!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
