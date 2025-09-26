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
      <Hero />
      <ChangeSection />
      <ImpactSection />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default Index;
