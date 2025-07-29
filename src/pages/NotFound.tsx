import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div style={{ background: 'linear-gradient(135deg, hsl(210 65% 25%), hsl(210 70% 35%))' }} className="min-h-screen flex items-center justify-center">
      <div className="text-center text-foreground">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4 opacity-80">Oops! Page not found</p>
        <a href="/" className="text-primary hover:text-primary-glow underline">
          Return to Home
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
