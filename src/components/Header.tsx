import { Button } from "@/components/ui/button";
import { Phone, Mail, Facebook, Instagram, Linkedin, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    // If we're not on the home page, navigate first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-foreground text-background py-2 px-4 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-xs xl:text-sm"></span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden xl:flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>alisa@futurewingsfoundation.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+263 788863452</span>
            </div>
            <div className="flex items-center space-x-2">
              <Facebook className="w-4 h-4 hover:text-primary transition-colors cursor-pointer" />
              <Instagram className="w-4 h-4 hover:text-primary transition-colors cursor-pointer" />
              <Linkedin className="w-4 h-4 hover:text-primary transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-background shadow-sm py-3 sm:py-4 px-4 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground hover:text-primary transition-colors">
            Future Wings Foundation
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-foreground hover:text-primary transition-colors text-sm xl:text-base"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-foreground hover:text-primary transition-colors text-sm xl:text-base"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('impact')} 
              className="text-foreground hover:text-primary transition-colors text-sm xl:text-base"
            >
              Our Impact
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-foreground hover:text-primary transition-colors text-sm xl:text-base"
            >
              Contact Us
            </button>
            <Link to="/donate">
              <Button variant="rounded" className="text-foreground text-sm border-foreground hover:border-foreground">
                DONATE NOW
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background shadow-lg border-t z-50">
            <div className="px-4 py-6 space-y-6 text-center">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="block w-full text-foreground hover:text-primary transition-colors py-2 text-lg"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-foreground hover:text-primary transition-colors py-2 text-lg"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('impact')} 
                className="block w-full text-foreground hover:text-primary transition-colors py-2 text-lg"
              >
                Our Impact
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-foreground hover:text-primary transition-colors py-2 text-lg"
              >
                Contact Us
              </button>
              <Link to="/donate" className="block">
                <Button variant="rounded" className="text-foreground mt-4 px-8 w-full">
                  DONATE NOW
                </Button>
              </Link>
              
              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t">
                <Facebook className="w-5 h-5 text-foreground hover:text-primary transition-colors cursor-pointer" />
                <Instagram className="w-5 h-5 text-foreground hover:text-primary transition-colors cursor-pointer" />
                <Linkedin className="w-5 h-5 text-foreground hover:text-primary transition-colors cursor-pointer" />
              </div>

              {/* Mobile Contact Info */}
              <div className="text-center text-sm text-muted-foreground pt-2">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>+263 788863452</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs">alisa@futurewingsfoundation.com</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;