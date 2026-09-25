import { motion, type HTMLMotionProps } from "motion/react";

type PageTransitionProps = {} & HTMLMotionProps<"main">;

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.main
      className='animated-page'
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}
