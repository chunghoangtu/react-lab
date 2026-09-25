import { motion, type HTMLMotionProps } from "motion/react";

type AnimatedButtonProps = {
  stiffness?: number;
  damping?: number;
} & HTMLMotionProps<"button">;

export default function AnimatedButton({
  children,
  stiffness = 300,
  damping = 15,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.9, y: 1 }}
      transition={{ type: "spring", stiffness, damping }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
