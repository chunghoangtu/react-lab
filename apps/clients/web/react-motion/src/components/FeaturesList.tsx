import { motion, stagger, useAnimation, useInView, type Variants } from "motion/react";
import { useEffect, useRef } from "react";

const features = ["Fast", "Declarative", "Powerful", "Fun"];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: stagger(0.3, { startDelay: 0.5 }) } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturesList() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false });
  const mainControls = useAnimation();

  useEffect(() => {
    mainControls.start(isInView ? "visible" : "hidden");
  }, [isInView, mainControls]);

  return (
    <motion.ul
      className='bg-indigo-900 text-cyan-300 font-bold text-2xl flex flex-col justify-center
        items-center gap-5 p-5 m-10 rounded-2xl'
      variants={container}
      animate={mainControls}
      initial='hidden'
      ref={containerRef}
    >
      {features.map((feature) => (
        <motion.li
          className='bg-mauve-600 p-3 rounded-xl min-w-1/5 text-center'
          key={feature}
          variants={item}
        >
          {feature}
        </motion.li>
      ))}
    </motion.ul>
  );
}
