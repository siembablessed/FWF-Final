import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-children.jpg";
import classroomImage from "@/assets/classroom-scene.jpg";
import educationImage from "@/assets/hero-education.jpg";
import ContentEditor from "@/components/ContentEditor";
import { useContentEditor } from "@/hooks/useContentEditor";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { content } = useContentEditor('hero');
  
  const defaultSlides = [
    {
      image: heroImage,
      title: "EVERY CHILD DESERVES TO LEARN WITH DIGNITY.",
      subtitle: "At Future Wings Foundation, we are reimagining education for students in under-resourced communities across Zimbabwe."
    },
    {
      image: classroomImage,
      title: "WE DON'T JUST PROVIDE SUPPLIES, WE RESTORE CONFIDENCE.",
      subtitle: "Through our dignity-first model, we equip children aged 6–18 with the tools, environments, and support systems they need to thrive."
    },
    {
      image: educationImage,
      title: "WE'RE NOT HERE TO TICK BOXES. WE'RE HERE TO BUILD FUTURES.",
      subtitle: "Explore our work, meet our community, and join the movement."
    }
  ];

  const slides = content?.slides?.map((slide: any, index: number) => ({
    ...slide,
    image: [heroImage, classroomImage, educationImage][index] || heroImage
  })) || defaultSlides;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ContentEditor sectionKey="hero" sectionName="Hero Section">
      <section className="relative h-[calc(100vh-80px)] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        <div className="absolute inset-0 bg-foreground/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center text-background max-w-5xl">
          <p className="text-xs sm:text-sm mb-2 sm:mb-4 opacity-90">{slides[currentSlide].subtitle}</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight">
            {slides[currentSlide].title.split('DIGNITY').map((part, index) => (
              index === 0 ? part : (
                <span key={index}>
                  <span className="text-primary">DIGNITY</span>
                  {part}
                </span>
              )
            ))}
          </h1>
          <Button 
            variant="rounded"
            size="lg" 
            className="text-background px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-semibold"
          >
            {content?.buttonText || 'DONATE NOW'}
          </Button>
        </div>
      </div>

      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-background hover:text-primary transition-colors p-2 hover:bg-background/10 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-background hover:text-primary transition-colors p-2 hover:bg-background/10 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-background' : 'bg-background/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      </section>
    </ContentEditor>
  );
};

export default Hero;