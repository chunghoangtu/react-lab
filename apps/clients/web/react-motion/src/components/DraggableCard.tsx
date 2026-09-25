import { motion } from "motion/react";

export default function DraggableCard() {
  return (
    <div className='bg-slate-900 m-10 h-200 rounded-xl flex items-center justify-center'>
      <motion.div
        className='bg-slate-100 p-5 rounded-2xl font-bold text-2xl'
        drag
        dragConstraints={{ left: -530, right: 530, top: -360, bottom: 360 }}
        dragElastic={0.1}
      >
        Drag me!
      </motion.div>
    </div>
  );
}