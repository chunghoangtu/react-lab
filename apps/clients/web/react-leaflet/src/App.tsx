import Map from "@/components/Map";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <main className='w-full h-screen'>
      <button
        type='button'
        onClick={() => setIsDark((prev) => !prev)}
        className='w-10 aspect-square flex justify-center items-center absolute top-2.5 right-2.5
          bg-black/80 rounded-full hover:opacity-70 active:opacity-70 z-10'
      >
        <Icon icon="gg:dark-mode" className="text-2xl text-white"/>
      </button>
      <Map isDark={isDark} />
    </main>
  );
}
