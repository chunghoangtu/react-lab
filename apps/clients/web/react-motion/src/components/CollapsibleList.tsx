import { motion, stagger, type Variants } from "motion/react";
import { useState } from "react";

const items = [1, 2, 3];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: stagger(0.3, { startDelay: 0.5 }) } },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
export default function CollapsibleList() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <motion.div
      variants={container}
      initial='hidden'
      animate='visible'
      className='h-120 bg-slate-900 m-10 p-5 rounded-xl flex flex-col items-center justify-center
        gap-5'
    >
      {items.map((item) => (
        <motion.div
          variants={itemVariant}
          key={item}
          onClick={() => setExpanded((prev) => (prev === item ? null : item))}
          className='bg-slate-300 p-5 rounded-xl text-xl text-center max-w-100'
          layout
        >
          <h3 className='font-bold'>Collapsible Item {item}</h3>
          {expanded === item && (
            <motion.p className='text-lg font-light'>
              This section expands and contracts with a layout animation
            </motion.p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
