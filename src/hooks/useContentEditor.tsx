import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

interface ContentSection {
  id: string;
  section_key: string;
  section_name: string;
  content: any;
  updated_at: string;
}

export const useContentEditor = (sectionKey: string) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { userRole } = useAuth();

  const canEdit = userRole === 'admin' || userRole === 'editor';

  // Fetch content
  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('content_sections')
        .select('*')
        .eq('section_key', sectionKey)
        .single();

      if (error) {
        console.error('Error fetching content:', error);
        toast({
          title: "Error",
          description: "Failed to load content",
          variant: "destructive"
        });
      } else {
        setContent(data?.content || {});
      }
      setLoading(false);
    };

    fetchContent();
  }, [sectionKey]);

  // Listen for real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'content_sections',
          filter: `section_key=eq.${sectionKey}`
        },
        (payload) => {
          setContent(payload.new.content);
          toast({
            title: "Content Updated",
            description: "Content has been updated by another user",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sectionKey]);

  const updateContent = async (newContent: any) => {
    if (!canEdit) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to edit content",
        variant: "destructive"
      });
      return false;
    }

    setSaving(true);
    const { error } = await supabase
      .from('content_sections')
      .update({ content: newContent })
      .eq('section_key', sectionKey);

    if (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive"
      });
      setSaving(false);
      return false;
    }

    setContent(newContent);
    setSaving(false);
    toast({
      title: "Saved",
      description: "Changes saved successfully",
    });
    return true;
  };

  return {
    content,
    loading,
    saving,
    canEdit,
    updateContent
  };
};