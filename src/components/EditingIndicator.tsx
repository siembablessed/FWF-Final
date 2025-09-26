import { Edit } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const EditingIndicator = () => {
  const { userRole } = useAuth();
  
  if (userRole !== 'admin' && userRole !== 'editor') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/20 text-sm text-primary">
      <div className="flex items-center gap-2">
        <Edit className="w-4 h-4" />
        <span>Hover over sections to edit content</span>
      </div>
    </div>
  );
};

export default EditingIndicator;