import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import classroomImage from "@/assets/classroom-scene.jpg";
import ContentEditor from "@/components/ContentEditor";
import { useContentEditor } from "@/hooks/useContentEditor";

const ChangeSection = () => {
  const { content } = useContentEditor('change_section');

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

          {/* Right content - Images/Videos */}
          <div className="relative order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="relative">
                <img 
                  src={classroomImage} 
                  alt="Children in classroom" 
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-foreground/20 rounded-lg hover:bg-foreground/30 transition-colors">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-background rounded-full flex items-center justify-center">
                    <Play className="w-5 sm:w-6 h-5 sm:h-6 text-foreground ml-1" />
                  </div>
                </button>
              </div>
              <div className="relative">
                <img 
                  src={classroomImage} 
                  alt="Students learning" 
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-foreground/20 rounded-lg hover:bg-foreground/30 transition-colors">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-background rounded-full flex items-center justify-center">
                    <Play className="w-5 sm:w-6 h-5 sm:h-6 text-foreground ml-1" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </ContentEditor>
  );
};

export default ChangeSection;