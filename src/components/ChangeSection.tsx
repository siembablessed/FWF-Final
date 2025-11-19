import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
// Importing the new diverse images
import dist1 from "@/assets/dist1.jpg";
import dist2 from "@/assets/dist2.jpg";
import dist3 from "@/assets/dist3.jpg";
import dist4 from "@/assets/dist4.jpg";
import dist5 from "@/assets/dist5.jpg";
import dist6 from "@/assets/dist6.jpg";
import dist7 from "@/assets/dist7.jpg";
import dist8 from "@/assets/dist8.jpg";
import ContentEditor from "@/components/ContentEditor";
import { useContentEditor } from "@/hooks/useContentEditor";

const ChangeSection = () => {
  const { content } = useContentEditor('change_section');
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

  // Pool of 8 available images
  const sourceImages = [
    dist1, dist2, dist3, dist4, 
    dist5, dist6, dist7, dist8
  ];

  // Shuffle images on mount and periodically
  useEffect(() => {
    const shuffle = () => {
      const shuffled = [...sourceImages].sort(() => Math.random() - 0.5);
      setShuffledImages(shuffled.slice(0, 6));
    };

    shuffle();
    const interval = setInterval(shuffle, 4000); // Shuffle every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Function to handle the scroll
  const handleMoreAboutUs = () => {
    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ContentEditor sectionKey="change_section" sectionName="Change Section">
      <section className="py-12 sm:py-16 lg:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left content */}
            <div className="text-background order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                {content?.title || 'Who We Are'}
              </h2>
              
              <p className="text-base sm:text-lg leading-relaxed opacity-90 mb-4">
                {content?.description || 'Future Wings Foundation is a Zimbabwean non-profit organisation working at the intersection of education access, student dignity, and community empowerment.'}
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed opacity-90 mb-8">
                {content?.subdescription || 'We work in peri-urban public schools to deliver low-cost, high-impact interventions that help students thrive not just survive in school. We believe that dignity, not just resources, is the barrier no one is addressing.'}
              </p>

              <Button
                variant="rounded"
                onClick={handleMoreAboutUs}
                className="text-background w-full sm:w-auto font-semibold border-background hover:bg-background hover:text-primary"
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
                      key={`img-${index}`}
                      className="relative aspect-square overflow-hidden rounded-lg group"
                      style={{
                        animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                      }}
                    >
                      <img
                        src={image}
                        alt={`Community image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300"></div>
                    </div>
                  ))
                ) : (
                  Array(6).fill(0).map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-background/20 rounded-lg animate-pulse"
                    ></div>
                  ))
                )}
              </div>

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -inset-4 border border-background/5 rounded-xl z-[-1]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </ContentEditor>
  );
};

export default ChangeSection;