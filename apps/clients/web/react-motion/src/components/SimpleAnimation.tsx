import AnimatedButton from "@/components/AnimatedButton";
import {
  motion,
  stagger,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  type Variants
} from "motion/react";
import { useEffect, useRef } from "react";

const gridContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.25),
    },
  },
};

const gridSquareVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const svgIconVariants: Variants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "#5f0aa4",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "#089bbc",
  },
};

export default function SimpleAnimation() {
  const { scrollYProgress: completionProgress } = useScroll();

  const containerRef = useRef(null);

  const isInView = useInView(containerRef, { once: false });
  const mainControls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const paragraphOneValue = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const paragraphTwoValue = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  useEffect(() => {
    mainControls.start(isInView ? "visible" : "hidden");
  }, [isInView, mainControls]);

  return (
    <div className='flex flex-col gap-10 overflow-x-hidden'>
      <motion.section
        variants={gridContainerVariants}
        initial='hidden'
        animate='show'
        className='grid grid-cols-3 p-10 gap-10'
      >
        {/* Fade Up */}
        <motion.div
          variants={gridSquareVariants}
          className='bg-slate-800 aspect-square rounded-lg flex justify-center items-center gap-10'
        >
          <motion.div
            className='w-20 aspect-square bg-emerald-300 rounded-lg'
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: 0.2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          ></motion.div>
          <motion.div
            className='w-20 aspect-square bg-emerald-300 rounded-full'
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: 0.4,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          ></motion.div>
        </motion.div>

        {/* Shape Shifting */}
        <motion.div
          variants={gridSquareVariants}
          className='bg-slate-800 aspect-square rounded-lg flex justify-center items-center gap-10'
        >
          <motion.div
            className='w-1/3 aspect-square shadow-md bg-cyan-400'
            animate={{
              scale: [1, 2, 2.5, 2, 1],
              rotate: [0, 45, 90, 45, 0],
              borderRadius: ["10%", "25%", "50%", "25%", "10%"],
            }}
            transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
          ></motion.div>
        </motion.div>

        {/* Animated Buttons */}
        <motion.div
          variants={gridSquareVariants}
          className='bg-slate-800 aspect-square rounded-lg flex justify-center items-center gap-10'
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, backgroundColor: "#0f8ecd", color: "#823ad0" }}
            transition={{ bounceDamping: 10, bounceStiffness: 600 }}
            className='bg-emerald-600 w-1/2 py-2 rounded-lg text-2xl text-gray-100 font-light
              tracking-wide'
          >
            subscribe
          </motion.button>
        </motion.div>

        {/* Drag */}
        <motion.div
          variants={gridSquareVariants}
          className='bg-slate-800 aspect-square rounded-lg flex justify-center items-center gap-10
            overflow-hidden'
        >
          <motion.div
            className='w-1/3 h-1/3 bg-indigo-500 rounded-3xl cursor-grab'
            drag
            dragConstraints={{
              top: -87,
              right: 87,
              bottom: 87,
              left: -87,
            }}
            dragTransition={{
              bounceStiffness: 1000,
              bounceDamping: 100,
            }}
          ></motion.div>
        </motion.div>

        {/* Scroll Progress */}
        <motion.div
          variants={gridSquareVariants}
          className='bg-slate-800 aspect-square rounded-lg flex justify-center items-center gap-10'
        >
          <div className='w-40 aspect-square bg-indigo-400/20 rounded-xl'>
            <motion.div
              className='w-full h-full bg-indigo-700 rounded-xl origin-bottom'
              style={{ scaleY: completionProgress }}
            ></motion.div>
          </div>
        </motion.div>

        {/* SVG Animation */}
        <motion.div
          variants={gridSquareVariants}
          className='bg-slate-800 aspect-square rounded-lg flex justify-center items-center gap-10'
        >
          <motion.svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className='w-1/2 stroke-orange-300 stroke-[0.5]'
          >
            <motion.path
              d='m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z'
              variants={svgIconVariants}
              initial='hidden'
              animate='visible'
              transition={{
                default: {
                  duration: 2,
                  ease: "easeInOut",
                  delay: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
                fill: {
                  duration: 2,
                  ease: "easeIn",
                  delay: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                },
              }}
            ></motion.path>
          </motion.svg>
        </motion.div>
      </motion.section>
      <section className='p-10 flex justify-center items-center'>
        <AnimatedButton className='bg-sky-300 p-5 rounded-xl text-2xl text-indigo-900 font-bold'>
          An Animated Button
        </AnimatedButton>
      </section>
      <section
        className='flex flex-col gap-10 mb-10'
        ref={containerRef}
      >
        <motion.h1
          className='text-5xl tracking-wide text-cyan-200 text-center'
          animate={mainControls}
          initial='hidden'
          variants={{
            hidden: {
              opacity: 0,
              y: 75,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{ delay: 0.3 }}
        >
          Just Keep Scrolling
        </motion.h1>
        <motion.p
          className='text-indigo-200 font-thin text-4xl w-1/2 mx-auto'
          style={{ translateX: paragraphOneValue }}
        >
          This ia basic tutorial on how to get up and running with Framer Motion (or Motion) with
          some TailwindCSS. if you enjoyed this video, please leave a like and also subscribe.
        </motion.p>
        <motion.p
          className='text-orange-200 font-thin text-4xl w-1/2 mx-auto'
          style={{ translateX: paragraphTwoValue }}
        >
          Have fun playing with Framer Motion (or Motion). it is a very powerful library, when used
          properly
        </motion.p>
      </section>
    </div>
  );
}
