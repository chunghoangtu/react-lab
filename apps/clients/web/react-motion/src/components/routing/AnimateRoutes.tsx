import { lazy, Suspense } from "react";
import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router";

import withTransition from "@/components/routing/withTransition";

const HomePage = withTransition(lazy(() => import("@/pages/HomePage")));
const AboutPage = withTransition(lazy(() => import("@/pages/AboutPage")));
const ContactPage = withTransition(lazy(() => import("@/pages/ContactPage")));
const DemoPage = withTransition(lazy(() => import("@/pages/DemoPage")));

export default function AnimateRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Suspense fallback={null}>
        <Routes
          location={location}
          key={location.pathname}
        >
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/demo' element={<DemoPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
