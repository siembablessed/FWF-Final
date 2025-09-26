import { Button } from "@/components/ui/button";
import { Users, Heart, Building, ArrowRight } from "lucide-react";
import { useContentEditor } from "@/hooks/useContentEditor";

const ImpactSectionContent = () => {
  const { content } = useContentEditor('impact_section');

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            {content?.mainTitle || "Our"} <span className="text-primary">Impact</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-foreground max-w-4xl mx-auto leading-relaxed">
            {content?.mainDescription || "Founded in 2024, Future Wings began as an explorative initiative to understand what really holds students back from succeeding in school."}
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left Column */}
          <div className="space-y-12">
            <div className="relative pl-8 border-l-4 border-primary/30">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full border-4 border-background"></div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                Where We Started
              </h3>
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg">
                <p className="text-base sm:text-lg text-foreground leading-relaxed mb-4">
                  We piloted interventions across Harare - delivering uniforms, sanitary pads, school fees, and classroom repairs, supporting over <span className="font-semibold text-primary">{content?.studentsSupported || "700"} students</span> in our first year alone.
                </p>
                <p className="text-base sm:text-lg text-foreground leading-relaxed">
                  Each project taught us more about what students really need to succeed.
                </p>
              </div>
            </div>

            <div className="relative pl-8 border-l-4 border-primary/30">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full border-4 border-background"></div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                What We've Learned
              </h3>
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg">
                <p className="text-base sm:text-lg text-foreground leading-relaxed">
                  After working with students and educators around Harare for one year, the answer became clear: <span className="font-semibold text-primary">dignity, not just resources</span>, was the barrier no one was addressing.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Stats */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 sm:p-10 text-background shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  Our Reach So Far
                </h3>
                <div className="w-16 h-1 bg-background mx-auto opacity-80"></div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform">{content?.studentsSupported || "718"}</div>
                  <div className="text-sm sm:text-base opacity-90 leading-tight">Students directly supported in 2025</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform">{content?.sanitaryPads || "5,500+"}</div>
                  <div className="text-sm sm:text-base opacity-90 leading-tight">Sanitary pads distributed</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform">{content?.winterJerseys || "40+"}</div>
                  <div className="text-sm sm:text-base opacity-90 leading-tight">Winter jerseys provided</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform">{content?.schoolsRenovated || "1"}</div>
                  <div className="text-sm sm:text-base opacity-90 leading-tight">School renovated</div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Three Pillars */}
        <div className="mb-16">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
              What We're Doing <span className="text-primary">Now</span>
            </h3>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg sm:text-xl text-foreground max-w-5xl mx-auto leading-relaxed mb-8">
              In 2026, we are scaling our dignity-first model across four schools. Our goal is to support at least <span className="font-semibold text-primary">2,500 students</span> through three interconnected pillars:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Dignity Kits */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl"></div>
              <div className="relative text-center p-8 border border-border/50 rounded-2xl hover:shadow-xl transition-all duration-300 bg-background/80 backdrop-blur-sm group-hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Heart className="w-10 h-10 text-background" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">Dignity Kits</h4>
                <p className="text-base text-foreground leading-relaxed">
                  Carefully curated bundles that include hygiene essentials, school supplies, and clothing items tailored by gender and age to meet pressing needs of students.
                </p>
              </div>
            </div>

            {/* Dignity Spaces */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl"></div>
              <div className="relative text-center p-8 border border-border/50 rounded-2xl hover:shadow-xl transition-all duration-300 bg-background/80 backdrop-blur-sm group-hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Building className="w-10 h-10 text-background" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">Dignity Spaces</h4>
                <p className="text-base text-foreground leading-relaxed">
                  We repair, renovate, and revitalise school infrastructure to create safe, functional, and welcoming environments that inspire learning.
                </p>
              </div>
            </div>

            {/* Dignity Partnerships */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl"></div>
              <div className="relative text-center p-8 border border-border/50 rounded-2xl hover:shadow-xl transition-all duration-300 bg-background/80 backdrop-blur-sm group-hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="w-10 h-10 text-background" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">Dignity Partnerships</h4>
                <p className="text-base text-foreground leading-relaxed">
                  We centre the voices of caregivers, educators, and students to ensure our work is locally owned, culturally grounded, and built to last.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-3xl p-10">
          <h4 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
            {content?.ctaTitle || "Ready to Make a Difference?"}
          </h4>
          <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
            {content?.ctaDescription || "Want to partner with us and help restore dignity in education across Zimbabwe?"}
          </p>
          <Button 
            variant="rounded" 
            size="lg" 
            className="text-background bg-primary hover:bg-primary/90 hover:text-background group"
          >
            GET IN TOUCH
            <ArrowRight className="w-5 h-5 ml-2 text-background group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ImpactSectionContent;