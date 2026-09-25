import { useState } from "react";
import AnimatedButton from "@/components/AnimatedButton";
import { AnimatePresence, motion } from "motion/react";

export default function StepSwitcher() {
  const [step, setStep] = useState(1);

  return (
    <div
      className='bg-slate-900 h-100 m-10 p-10 rounded-xl flex flex-col justify-center items-center
        gap-5 relative'
    >
      <AnimatedButton
        className='p-5 bg-slate-950 text-slate-100 rounded-2xl'
        onClick={() => setStep((step) => (step === 1 ? 2 : 1))}
      >
        Toggle Step
      </AnimatedButton>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key='step1'
            className='bg-slate-500 border border-slate-300 p-5 rounded-2xl text-xl text-cyan-50'
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ y: 10, opacity: 0 }}
          >
            Step 1
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key='step2'
            className='bg-slate-500 border border-slate-300 p-5 rounded-2xl text-xl text-cyan-50'
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ y: 10, opacity: 0 }}
          >
            Step 2
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
