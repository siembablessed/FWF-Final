import { Button } from "@/components/ui/button";
import { Users, Heart, Building, ArrowRight, TrendingUp, Target, Award, Mail } from "lucide-react";
import { useContentEditor } from "@/hooks/useContentEditor";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ImpactSectionContent = () => {
  const { content } = useContentEditor('impact_section');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent("Partnership Inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:alisa@futurewingsfoundation.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    toast({
      title: "Thank you!",
      description: "Your email client should open. If not, please email us at alisa@futurewingsfoundation.com",
    });

    // Reset form and close dialog after a delay
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsDialogOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Our <span className="text-primary">Impact</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {content?.mainDescription || "Founded in 2024, Future Wings began as an explorative initiative to understand what really holds students back from succeeding in school."}
          </p>
        </div>

        {/* Where We Started - Full Width */}
        <div className="mb-12 lg:mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                  Where We Started
                </h3>
                <div className="space-y-4 text-base text-foreground/80 leading-relaxed">
                  <p>
                    We piloted interventions across Harare - delivering uniforms, sanitary pads, school fees, and classroom repairs, supporting over <span className="font-semibold text-primary">{content?.studentsSupported || "700"} students</span> in our first year alone.
                  </p>
                  <p>
                    Each project taught us more about what students really need to succeed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What We Have Learnt - Full Width */}
        <div className="mb-12 lg:mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                  What We Have Learnt
                </h3>
                <div className="text-base text-foreground/80 leading-relaxed">
                  <p>
                    After working with students and educators around Harare for one year, the answer became clear: <span className="font-semibold text-primary">dignity, not just resources</span>, was the barrier no one was addressing. Hence the new dignity-first approach that Future Wings Foundation has taken.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Reach So Far - Full Width (Last) */}
        <div className="mb-16 lg:mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 sm:p-12 text-background shadow-xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-background/20 rounded-full mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  Our Reach So Far
                </h3>
                <div className="w-16 h-0.5 bg-background/60 mx-auto"></div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold mb-2">{content?.studentsSupported || "718"}</div>
                  <div className="text-sm sm:text-base opacity-90">Students directly supported in 2025</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold mb-2">{content?.sanitaryPads || "5,500+"}</div>
                  <div className="text-sm sm:text-base opacity-90">Sanitary pads distributed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold mb-2">{content?.winterJerseys || "40+"}</div>
                  <div className="text-sm sm:text-base opacity-90">Winter jerseys provided</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold mb-2">{content?.schoolsRenovated || "1"}</div>
                  <div className="text-sm sm:text-base opacity-90">School renovated</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three Pillars - Centered with reduced width */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              What We're Doing <span className="text-primary">Now</span>
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              In 2026, we are scaling our dignity-first model across four schools. Our goal is to support at least <span className="font-semibold text-primary">2,500 students</span> through three interconnected pillars:
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
              {/* Dignity Kits */}
              <div className="group">
                <div className="h-full text-center p-6 border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-background">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">Dignity Kits</h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Carefully curated bundles that include hygiene essentials, school supplies, and clothing items tailored by gender and age to meet pressing needs of students.
                  </p>
                </div>
              </div>

              {/* Dignity Spaces */}
              <div className="group">
                <div className="h-full text-center p-6 border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-background">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                    <Building className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">Dignity Spaces</h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    We repair, renovate, and rehabilitate school infrastructure to create safe, functional, and welcoming environments that inspire learning.
                  </p>
                </div>
              </div>

              {/* Dignity Partnerships */}
              <div className="group">
                <div className="h-full text-center p-6 border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-background">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">Dignity Partnerships</h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    We centre the voices of caregivers, educators, and students to ensure our work is locally owned, culturally grounded, and built to last.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto p-8 sm:p-10 border border-border rounded-2xl bg-background">
            <h4 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
              {content?.ctaTitle || "Ready to Make a Difference?"}
            </h4>
            <p className="text-base text-foreground/80 mb-8">
              {content?.ctaDescription || "Want to partner with us and help restore dignity in education across Zimbabwe?"}
            </p>
            <Button
              variant="rounded"
              size="lg"
              onClick={() => setIsDialogOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground group"
            >
              GET IN TOUCH
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Form Dialog - Simplified */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              Get In Touch
            </DialogTitle>
            <DialogDescription className="text-sm text-foreground/70">
              Send us a message and we'll get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm text-foreground">Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm text-foreground">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-sm text-foreground">Message *</Label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                placeholder="How can we help you?"
                className="min-h-[100px] resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ImpactSectionContent;