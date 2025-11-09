import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChangeSection from "@/components/ChangeSection";
import ImpactSection from "@/components/ImpactSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import AdminControls from "@/components/AdminControls";
import EditingIndicator from "@/components/EditingIndicator";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AdminControls />
      <EditingIndicator />
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <ChangeSection />
      </div>
      <div id="impact">
        <ImpactSection />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
