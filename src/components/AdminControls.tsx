import { Button } from '@/components/ui/button';
import { LogOut, UserCog } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminControls = () => {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Hidden keyboard shortcut for admin access (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A' && !user) {
        event.preventDefault();
        navigate('/auth');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, user]);

  if (!user) {
    return null; // No visible login access - use Ctrl+Shift+A or navigate to /auth directly
  }

  if (userRole === 'admin' || userRole === 'editor') {
    return (
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <div className="bg-primary/10 backdrop-blur-sm px-3 py-2 rounded-lg text-sm flex items-center gap-2 border border-primary/20">
          <UserCog className="w-4 h-4 text-primary" />
          <span className="font-medium text-primary">{userRole}</span>
          <span className="text-xs bg-primary/20 px-2 py-1 rounded-full">Edit Mode</span>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="bg-background/90 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 bg-background/90 backdrop-blur-sm"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Sign Out
    </Button>
  );
};

export default AdminControls;