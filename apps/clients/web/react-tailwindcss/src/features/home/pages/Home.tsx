import { useState } from "react";

export default function Home() {
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleThemeHandle = () => {
    document.documentElement.classList.toggle("dark");
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <header
        className='bg-header text-header-foreground flex items-center justify-between p-4
          shadow-2xl'
      >
        <h1 className='text-3xl font-bold tracking-widest'>My Website</h1>

        {/* Desktop Nav */}
        <nav className='hidden items-center gap-5 sm:flex'>
          <a href='#'>Home</a>
          <a href='#'>Blog</a>
          <a href='#'>Contact</a>
          <button
            className='button border-indigo'
            onClick={toggleThemeHandle}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>

        <button
          className='cursor-pointer p-2 text-2xl text-teal-600 sm:hidden'
          onClick={() => setIsOpenMobileNav((isOpen) => !isOpen)}
        >
          &#9776;
        </button>
      </header>
      {/* Mobile Nav */}
      <nav
        className={`${isOpenMobileNav ? "flex" : "hidden"} bg-header text-header-foreground flex-col
          items-center gap-5 p-3 sm:hidden`}
      >
        <a href='#'>Home1</a>
        <a href='#'>Blog</a>
        <a href='#'>Contact</a>
        <button
            className='button border-indigo'
            onClick={toggleThemeHandle}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
      </nav>

      <main className='bg-background text-background-foreground grow space-y-12'>
        <section className='text-center'>
          <h2 className='m-5 text-xl font-semibold'>Welcome</h2>
          <p>This is the main content area of the website</p>
        </section>
        <section>
          <h2 className='m-5 text-center text-xl font-semibold'>Features</h2>
          <div className='grid gap-5 p-5 text-teal-200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <div
              className='transform rounded-xl bg-teal-700 p-4 transition-all hover:translate-x-1
                hover:-translate-y-1 hover:bg-teal-700/80 hover:shadow-md'
            >
              Feature 1
            </div>
            <div
              className='transform rounded-xl bg-teal-700 p-4 transition-all hover:translate-x-1
                hover:-translate-y-1 hover:bg-teal-700/80 hover:shadow-md'
            >
              Feature 2
            </div>
            <div
              className='transform rounded-xl bg-teal-700 p-4 transition-all hover:translate-x-1
                hover:-translate-y-1 hover:bg-teal-700/80 hover:shadow-md'
            >
              Feature 3
            </div>
          </div>
        </section>
      </main>

      <footer className='bg-header text-header-foreground p-5 text-center'>
        &copy; 2026 My Website. All rights reserved
      </footer>
    </div>
  );
}
