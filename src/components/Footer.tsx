import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    // If we are not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Add a small delay to allow the navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // If we are already on home, just scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUnderDevelopment = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Coming Soon",
      description: "This section is currently under development. Please check back later!",
    });
  };

  return (
    <footer className="bg-foreground text-background" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Quick Links */}
          <div className="sm:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 flex flex-col items-start">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')} 
                  className="text-sm sm:text-base hover:text-primary transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-sm sm:text-base hover:text-primary transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('impact')} 
                  className="text-sm sm:text-base hover:text-primary transition-colors text-left"
                >
                  Our Impact
                </button>
              </li>
            </ul>
          </div>

          {/* Other Pages - Now functional with "Under Development" toast */}
          <div className="sm:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Other Pages</h3>
            <ul className="space-y-2 flex flex-col items-start">
              <li>
                <button 
                  onClick={handleUnderDevelopment}
                  className="text-sm sm:text-base hover:text-primary transition-colors text-left"
                >
                  Impact Reports
                </button>
              </li>
              <li>
                <button 
                  onClick={handleUnderDevelopment}
                  className="text-sm sm:text-base hover:text-primary transition-colors text-left"
                >
                  Annual Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mt-1 flex-shrink-0" />
                <span className="text-sm sm:text-base">Harare, Zimbabwe</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">+263 788863452</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-4 sm:w-5 h-4 sm:h-5 mt-1 flex-shrink-0" />
                <span className="text-sm sm:text-base break-all">alisa@futurewingsfoundation.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-xs sm:text-sm mb-4 opacity-90 leading-relaxed">
              Subscribe to get updates on our recent information to our community programs, and volunteers.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input 
                placeholder="Your Email Address"
                className="bg-background text-foreground text-sm flex-1 rounded-l-full border-none"
              />
              <Button 
                variant="rounded" 
                className="text-background text-sm whitespace-nowrap rounded-r-full rounded-l-none"
              >
                SEND NOW
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/20 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold text-sm sm:text-base">FW</span>
              </div>
              <span className="text-xs sm:text-sm text-center sm:text-left">A Zimbabwe where every child learns in an environment that affirms their dignity, supports their potential, and unlocks their future</span>
            </div>
            <div className="text-xs sm:text-sm opacity-75 text-center sm:text-right">
              Copyright © 2026. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;