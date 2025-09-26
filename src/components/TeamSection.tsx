import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import alisaImage from "@/assets/team-alisa.jpg";
import vanessaImage from "@/assets/team-vanessa.jpg";
import simbarasheImage from "@/assets/team-simbarashe.jpg";
import ContentEditor from "@/components/ContentEditor";
import { useContentEditor } from "@/hooks/useContentEditor";

const TeamSection = () => {
  const [showAll, setShowAll] = useState(false);
  const { content } = useContentEditor('team_section');

  const allTeamMembers = [
    {
      name: "Alisa Adams",
      role: "Founder",
      type: "leadership",
      image: alisaImage,
      bio: "Leading the foundation with vision and dedication to educational transformation."
    },
    {
      name: "Alison Hama",
      role: "Strategic Partnerships Lead",
      type: "staff",
      image: alisaImage, // placeholder
      bio: "Building strategic partnerships to expand our impact and reach."
    },
    {
      name: "Lindisi Doba",
      role: "Community Engagement Officer",
      type: "staff",
      image: vanessaImage, // placeholder
      bio: "Connecting with communities and fostering meaningful relationships."
    },
    {
      name: "Prudence Jingura",
      role: "Social Media & Marketing Intern",
      type: "staff",
      image: vanessaImage, // placeholder
      bio: "Creating engaging content and expanding our digital presence."
    },
    {
      name: "Simbarashe Mahlaulo",
      role: "OPERATIONS & LOGISTICS",
      type: "staff",
      image: simbarasheImage,
      bio: "Managing operations and logistics to ensure smooth program delivery."
    },
    {
      name: "Tapiwa Yvette Chikwanha",
      role: "People Manager",
      type: "staff",
      image: alisaImage, // placeholder
      bio: "Supporting our team and fostering a positive work environment."
    },
    {
      name: "Thandolwenkosi Sibanda",
      role: "Monitoring & Evaluation Officer",
      type: "staff",
      image: simbarasheImage, // placeholder
      bio: "Ensuring program quality and measuring impact for continuous improvement."
    },
    {
      name: "Vanessa Kambasha",
      role: "Program Manager",
      type: "staff",
      image: vanessaImage,
      bio: "Managing educational programs and coordinating implementation efforts."
    }
  ];

  const displayedMembers = showAll ? allTeamMembers : allTeamMembers.slice(0, 3);

  return (
    <ContentEditor sectionKey="team_section" sectionName="Team Section">
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 animate-fade-in">{content?.title || 'Meet Our Team'}</h2>
          <p className="text-sm sm:text-base text-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            {content?.description || 'Our dedicated team is committed to restoring dignity and creating lasting change in education across Zimbabwe.'}
          </p>

        <div className="grid gap-8 mb-8 sm:mb-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {displayedMembers.map((member, index) => (
            <div 
              key={member.name} 
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/5 hover:border-primary/20 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    member.type === 'leadership' 
                      ? 'bg-primary/90 text-primary-foreground' 
                      : 'bg-secondary/90 text-secondary-foreground'
                  }`}>
                    {member.type === 'leadership' ? 'Leadership' : 'Team'}
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-card-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                    {member.role}
                  </p>
                </div>
                
                {member.bio && (
                  <div className="pt-2 border-t border-border/10">
                    <p className="text-sm text-muted-foreground leading-relaxed text-center">
                      {member.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button 
            onClick={() => setShowAll(!showAll)}
            variant="outline" 
            className="border-foreground text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 px-8 py-3 rounded-full font-medium"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                View All Team ({allTeamMembers.length})
              </>
            )}
          </Button>
          
          {!showAll && (
            <p className="text-sm text-muted-foreground animate-fade-in">
              Showing {displayedMembers.length} of {allTeamMembers.length} team members
            </p>
          )}
        </div>
        </div>
      </section>
    </ContentEditor>
  );
};

export default TeamSection;