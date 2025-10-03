import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
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
// Board Members
import Zinzile from "@/assets/Zinzile Mlambo.jpeg";
import Leroy from "@/assets/Leroy Margolis.jpeg";
import Nicole from "@/assets/Nicole Gwindi.jpeg";
import Jafter from "@/assets/Jafter_Orien_Francis.jpeg";
import Kiaran from "@/assets/Kiaran_Knight.jpeg";
import Tafadzwa from "@/assets/Tafadzwa Munatsi.jpeg";

import ContentEditor from "@/components/ContentEditor";
import { useContentEditor } from "@/hooks/useContentEditor";

const TeamSection = () => {
  const [showAll, setShowAll] = useState(false);
  const { content } = useContentEditor("team_section");
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Auto-collapse when section is out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setShowAll(false);
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

  const allMembers = [
    // --- TEAM MEMBERS ---
    { name: "Alisa Adams", role: "Founder", type: "leadership", category: "team", image: Alisa },
    { name: "Alison Hama", role: "Strategic Partnerships Lead", type: "staff", category: "team", image: Alison },
    { name: "Lindisi Doba", role: "Community Engagement Officer", type: "staff", category: "team", image: Lindisi },
    { name: "Prudence Jingura", role: "Social Media & Marketing Intern", type: "staff", category: "team", image: Prudence },
    { name: "Simbarashe Mahlaulo", role: "Operations & Logistics", type: "staff", category: "team", image: Simba },
    { name: "Tapiwa Yvette Chikwanha", role: "People Manager", type: "staff", category: "team", image: Tapiwa },
    { name: "Fadzai Chigoma", role: "- -", type: "staff", category: "team", image: Fadzi },
    { name: "Thandolwenkosi Sibanda", role: "Monitoring & Evaluation Officer", type: "staff", category: "team", image: Thando },
    { name: "Vanessa Kambasha", role: "Program Manager", type: "staff", category: "team"},

    // --- BOARD MEMBERS ---
    { name: "Zinzile Mlambo", role: "Board Member", type: "board", category: "board", image: Zinzile },
    { name: "Leroy Margolis", role: "Board Member", type: "board", category: "board", image: Leroy },
    { name: "Jafter Orien Francis", role: "Board Member", type: "board", category: "board", image: Jafter },
    { name: "Tafadzwa Munatsi", role: "Board Member", type: "board", category: "board", image: Tafadzwa },
    { name: "Nicole Gwindi", role: "Board Member", type: "board", category: "board", image: Nicole },
    { name: "Kiaran Knight", role: "Board Member", type: "board", category: "board", image: Kiaran },
  ];

  const displayedMembers = showAll ? allMembers : allMembers.slice(0, 6);

  const handleToggle = () => {
    if (showAll) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowAll(!showAll);
  };

  return (
    <ContentEditor sectionKey="team_section" sectionName="Team Section">
      <section ref={sectionRef}   className="pt-0 pb-12 sm:pb-16 lg:pb-20 bg-background"
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            {content?.title || "Our Team"}
          </h2>
          <p className="text-sm sm:text-base text-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            {content?.description ||
              "Our work is powered by a passionate team and guided by a committed board, working together to create lasting change in education across Zimbabwe."}
          </p>

          <div className="grid gap-8 mb-8 sm:mb-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {displayedMembers.map((member, index) => (
                <motion.div
                  key={member.name}
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
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          member.type === "leadership"
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
              ))}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={handleToggle}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 px-6 py-2 rounded-full font-medium shadow-md"
            >
              {showAll ? (
                <>
                  Show Less
                </>
              ) : (
                <>
                  View All
                </>
              )}
            </Button>

            {!showAll && (
              <p className="text-sm text-black">
                Showing {displayedMembers.length} of {allMembers.length} people
              </p>
            )}
          </div>
        </div>
      </section>
    </ContentEditor>
  );
};

export default TeamSection;
