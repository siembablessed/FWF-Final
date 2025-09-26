import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Save, X } from 'lucide-react';
import { useContentEditor } from '@/hooks/useContentEditor';

interface ContentEditorProps {
  sectionKey: string;
  sectionName: string;
  children: React.ReactNode;
}

const ContentEditor = ({ sectionKey, sectionName, children }: ContentEditorProps) => {
  const { content, loading, saving, canEdit, updateContent } = useContentEditor(sectionKey);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<any>({});

  const handleEdit = () => {
    setEditedContent({ ...content });
    setIsEditing(true);
  };

  const handleSave = async () => {
    const success = await updateContent(editedContent);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedContent({});
    setIsEditing(false);
  };

  const updateField = (field: string, value: any) => {
    setEditedContent((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return children;
  }

  if (!canEdit) {
    return children;
  }

  return (
    <div className="relative group">
      {children}
      
      {/* Edit Button */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleEdit}
              className="bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg backdrop-blur-sm"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit {sectionName}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {sectionKey === 'hero' && (
                <>
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Hero Slides</Label>
                    {editedContent.slides?.map((slide: any, index: number) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-base">Slide {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label>Title</Label>
                            <Textarea
                              value={slide.title}
                              onChange={(e) => {
                                const newSlides = [...editedContent.slides];
                                newSlides[index] = { ...slide, title: e.target.value };
                                updateField('slides', newSlides);
                              }}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Subtitle</Label>
                            <Textarea
                              value={slide.subtitle}
                              onChange={(e) => {
                                const newSlides = [...editedContent.slides];
                                newSlides[index] = { ...slide, subtitle: e.target.value };
                                updateField('slides', newSlides);
                              }}
                              className="mt-1"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div>
                    <Label>Button Text</Label>
                    <Input
                      value={editedContent.buttonText || ''}
                      onChange={(e) => updateField('buttonText', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              {sectionKey === 'change_section' && (
                <>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editedContent.title || ''}
                      onChange={(e) => updateField('title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editedContent.description || ''}
                      onChange={(e) => updateField('description', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Sub Description</Label>
                    <Textarea
                      value={editedContent.subdescription || ''}
                      onChange={(e) => updateField('subdescription', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Button Text</Label>
                    <Input
                      value={editedContent.buttonText || ''}
                      onChange={(e) => updateField('buttonText', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              {sectionKey === 'team_section' && (
                <>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editedContent.title || ''}
                      onChange={(e) => updateField('title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editedContent.description || ''}
                      onChange={(e) => updateField('description', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              {sectionKey === 'impact_section' && (
                <>
                  <div>
                    <Label>Main Title</Label>
                    <Input
                      value={editedContent.mainTitle || ''}
                      onChange={(e) => updateField('mainTitle', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Main Description</Label>
                    <Textarea
                      value={editedContent.mainDescription || ''}
                      onChange={(e) => updateField('mainDescription', e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Current Year Students Supported</Label>
                    <Input
                      value={editedContent.studentsSupported || ''}
                      onChange={(e) => updateField('studentsSupported', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Sanitary Pads Distributed</Label>
                    <Input
                      value={editedContent.sanitaryPads || ''}
                      onChange={(e) => updateField('sanitaryPads', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Winter Jerseys Provided</Label>
                    <Input
                      value={editedContent.winterJerseys || ''}
                      onChange={(e) => updateField('winterJerseys', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Schools Renovated</Label>
                    <Input
                      value={editedContent.schoolsRenovated || ''}
                      onChange={(e) => updateField('schoolsRenovated', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>CTA Title</Label>
                    <Input
                      value={editedContent.ctaTitle || ''}
                      onChange={(e) => updateField('ctaTitle', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>CTA Description</Label>
                    <Textarea
                      value={editedContent.ctaDescription || ''}
                      onChange={(e) => updateField('ctaDescription', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ContentEditor;