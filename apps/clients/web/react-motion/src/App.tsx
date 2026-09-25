import AnimateRoutes from "@/components/routing/AnimateRoutes";
import { BrowserRouter, Link } from "react-router";
export default function App() {
  return (
    <BrowserRouter>
      <div className='animated-app'>
        <nav className='nav'>
          <div className='nav-links'>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/demo'>Demo</Link>
          </div>
        </nav>
        <AnimateRoutes />
      </div>
    </BrowserRouter>
  );
}
