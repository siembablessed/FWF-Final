import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import classroomImage from "@/assets/classroom-scene.jpg";
import heroChildrenImage from "@/assets/hero-children.jpg";
import heroEducationImage from "@/assets/hero-education.jpg";
import ContentEditor from "@/components/ContentEditor";
import { useContentEditor } from "@/hooks/useContentEditor";

const ChangeSection = () => {
  const { content } = useContentEditor('change_section');
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

  // Available images for the collage
  const images = [
    classroomImage,
    heroChildrenImage,
    heroEducationImage,
    classroomImage,
    heroChildrenImage,
    heroEducationImage,
  ];

  // Shuffle images on mount and periodically
  useEffect(() => {
    const shuffle = () => {
      const shuffled = [...images].sort(() => Math.random() - 0.5);
      setShuffledImages(shuffled);
    };

    shuffle();
    const interval = setInterval(shuffle, 4000); // Shuffle every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <ContentEditor sectionKey="change_section" sectionName="Change Section">
      <section className="py-12 sm:py-16 lg:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left content */}
            <div className="text-background order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                {content?.title || 'Who We Are'}
              </h2>
              <p className="text-base sm:text-lg mb-3 sm:mb-4 opacity-90">
                {content?.description || 'Future Wings Foundation is a Zimbabwean non-profit organisation working at the intersection of education access, student dignity, and community empowerment.'}
              </p>
              <p className="text-sm sm:text-base mb-6 sm:mb-8 opacity-80 leading-relaxed">
                {content?.subdescription || 'We work in peri-urban public schools to deliver low-cost, high-impact interventions that help students thrive not just survive in school. We believe that dignity, not just resources, is the barrier no one is addressing.'}
              </p>
              <Button
                variant="rounded"
                className="text-background w-full sm:w-auto"
              >
                {content?.buttonText || 'MORE ABOUT US'}
              </Button>
            </div>

            {/* Right content - Animated Image Collage */}
            <div className="relative order-1 lg:order-2">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {shuffledImages.length > 0 ? (
                  shuffledImages.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                      style={{
                        animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                      }}
                    >
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300"></div>
                    </div>
                  ))
                ) : (
                  // Loading placeholder
                  images.map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-background/20 rounded-lg animate-pulse"
                    ></div>
                  ))
                )}
              </div>

              {/* Optional: Add a subtle overlay pattern */}
              <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </ContentEditor>
  );
};

export default ChangeSection;