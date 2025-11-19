import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
// Team Members
import Alison from "@/assets/Alison.jpg";
import Alisa from "@/assets/Alisa.jpg";
import Thando from "@/assets/Thando.jpg";
import Fadzi from "@/assets/Fadzi.jpg";
import Simba from "@/assets/Simba.jpg";
import Prudence from "@/assets/Prudence.jpg";
import Lindisi from "@/assets/Lindisi.jpg";
import Tapiwa from "@/assets/Yvette.jpg";
import Rose from "@/assets/Rose.jpg";
// Board Members
import Zinzile from "@/assets/Zinzile Mlambo.jpeg";
import Leroy from "@/assets/Leroy Margolis.jpeg";
import Nicole from "@/assets/Nicole Gwindi.jpeg";
import Francis from "@/assets/Francis.jpg";
import Kiaran from "@/assets/Kiaran_Knight.jpeg";
import Tafadzwa from "@/assets/Tafadzwa Munatsi.jpeg";

import ContentEditor from "@/components/ContentEditor";
import { useContentEditor } from "@/hooks/useContentEditor";

const TeamSection = () => {
  const [showAllTeam, setShowAllTeam] = useState(false);
  const [showAllBoard, setShowAllBoard] = useState(false);
  const { content } = useContentEditor("team_section");
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Auto-collapse when section is out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setShowAllTeam(false);
            setShowAllBoard(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const teamMembers = [
    // Added Alisa Adams here as well (Leadership)
    { name: "Alisa Adams", role: "Co-Founder & Executive Director", type: "leadership", category: "team", image: Alisa },
    { name: "Alison Hama", role: "Strategic Partnerships Lead", type: "staff", category: "team", image: Alison },
    { name: "Lindisi Doba", role: "Community Engagement Officer", type: "staff", category: "team", image: Lindisi },
    { name: "Prudence Jingura", role: "Social Media & Marketing Intern", type: "staff", category: "team", image: Prudence },
    { name: "Simbarashe Mahlaulo", role: "Operations & Logistics", type: "staff", category: "team", image: Simba },
    { name: "Tapiwa Yvette Chikwanha", role: "People Manager", type: "staff", category: "team", image: Tapiwa },
    { name: "Fadzai Chigoma", role: "Executive Assistant", type: "staff", category: "team", image: Fadzi },
    { name: "Thandolwenkosi Sibanda", role: "Monitoring & Evaluation Officer", type: "staff", category: "team", image: Thando },
    { name: "Rose Arimoso", role: "Finance Officer", type: "staff", category: "team", image: Rose },
  ];

  const boardMembers = [
    // Alisa Adams is also here as Board Director
    { name: "Alisa Adams", role: "Co-Founder & Board Director", type: "leadership", category: "board", image: Alisa },
    { name: "Nicole Gwindi", role: "Board Member", type: "board", category: "board", image: Nicole },
    { name: "Francis Rwodzi", role: "Board Member", type: "board", category: "board", image: Francis },
    { name: "Zinzile Mlambo", role: "Board Member", type: "board", category: "board", image: Zinzile },
    { name: "Leroy Margolis", role: "Board Member", type: "board", category: "board", image: Leroy },
    { name: "Tafadzwa Munatsi", role: "Board Member", type: "board", category: "board", image: Tafadzwa },
    { name: "Kiaran Knight", role: "Board Member", type: "board", category: "board", image: Kiaran },
  ];

  // Determine which members to display
  const displayedTeamMembers = showAllTeam ? teamMembers : teamMembers.slice(0, 6);
  const displayedBoardMembers = showAllBoard ? boardMembers : boardMembers.slice(0, 3); 

  const handleToggleTeam = () => {
    if (showAllTeam) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowAllTeam(!showAllTeam);
  };

  const handleToggleBoard = () => {
    if (showAllBoard) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowAllBoard(!showAllBoard);
  };

  const MemberCard = ({ member, index }: { member: any; index: number }) => (
    <motion.div
      key={`${member.name}-${member.category}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/5 hover:border-primary/20 group"
    >
      <div className="relative">
        <div className="aspect-square overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
          {member.image ? (
            <img
              src={member.image}
              alt={`${member.name} - ${member.role}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <span className="text-4xl font-bold text-black">
              {member.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${member.type === "leadership"
                ? "bg-primary/90 text-primary-foreground"
                : member.type === "board"
                  ? "bg-accent/90 text-accent-foreground"
                  : "bg-secondary/90 text-secondary-foreground"
              }`}
          >
            {member.type === "leadership"
              ? "Leadership"
              : member.type === "board"
                ? "Board"
                : "Team"}
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
            <p className="text-sm text-black leading-relaxed text-center">
              {member.bio}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <ContentEditor sectionKey="team_section" sectionName="Team Section">
      <section ref={sectionRef} className="pt-0 pb-12 sm:pb-16 lg:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              {content?.title || "Our Team"}
            </h2>
            <p className="text-sm sm:text-base text-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              {content?.description ||
                "Our work is powered by a passionate team and guided by a committed board, working together to create lasting change in education across Zimbabwe."}
            </p>
          </div>

          {/* BOARD MEMBERS SECTION */}
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-accent/10 to-primary/5 rounded-3xl -mx-4 sm:-mx-6 lg:-mx-8"></div>
            <div className="absolute inset-0 border-2 border-accent/20 rounded-3xl -mx-4 sm:-mx-6 lg:-mx-8"></div>

            <div className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Board of Directors
                </h3>
                <p className="text-sm text-foreground/70 mt-1">
                  Guiding our mission with strategic vision
                </p>
              </div>

              <div className="grid gap-8 mb-8 sm:mb-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {displayedBoardMembers.map((member, index) => (
                    <motion.div
                      key={`${member.name}-board`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-accent/30 hover:border-accent/50 group"
                    >
                      <div className="relative">
                        <div className="aspect-square overflow-hidden flex items-center justify-center bg-gradient-to-br from-accent/10 to-primary/10">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={`${member.name} - ${member.role}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <span className="text-4xl font-bold text-black">
                              {member.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium shadow-md ${member.type === "leadership" ? "bg-primary/90 text-primary-foreground" : "bg-accent/90 text-accent-foreground"}`}>
                            {member.type === "leadership" ? "Leadership" : "Board"}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="text-center space-y-2">
                          <h3 className="text-xl font-bold text-card-foreground">
                            {member.name}
                          </h3>
                          <p className="text-sm font-semibold text-accent uppercase tracking-wide">
                            {member.role}
                          </p>
                        </div>

                        {member.bio && (
                          <div className="pt-2 border-t border-border/10">
                            <p className="text-sm text-black leading-relaxed text-center">
                              {member.bio}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {boardMembers.length > 3 && (
                <div className="flex flex-col items-center gap-4">
                  <Button
                    onClick={handleToggleBoard}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 px-6 py-2 rounded-full font-medium shadow-md"
                  >
                    {showAllBoard ? (
                      <>Show Less Board Members</>
                    ) : (
                      <>View All Board Members</>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>


          {/* TEAM MEMBERS SECTION */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">
              Our Team
            </h3>
            <div className="grid gap-8 mb-8 sm:mb-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {displayedTeamMembers.map((member, index) => (
                  <MemberCard key={`${member.name}-team`} member={member} index={index} />
                ))}
              </AnimatePresence>
            </div>

            {teamMembers.length > 6 && (
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={handleToggleTeam}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 px-6 py-2 rounded-full font-medium shadow-md"
                >
                  {showAllTeam ? (
                    <>Show Less Team Members</>
                  ) : (
                    <>View All Team Members</>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </ContentEditor>
  );
};

export default TeamSection;