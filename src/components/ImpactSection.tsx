import ContentEditor from "./ContentEditor";
import ImpactSectionContent from "./ImpactSectionContent";

const ImpactSection = () => {
  return (
    <ContentEditor sectionKey="impact_section" sectionName="Impact Section">
      <ImpactSectionContent />
    </ContentEditor>
  );
};

export default ImpactSection;