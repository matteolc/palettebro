import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { ColorFormats } from './ColorFormats';
import { ColorPreview } from './ColorPreview';
import { ContrastTable } from './ContrastTable';

export const ContrastDialog = ({
  isOpen,
  onClose,
  backgroundColor,
  foregroundColor,
  colorName,
}: {
  isOpen: boolean;
  onClose: () => void;
  backgroundColor: string;
  foregroundColor: string;
  colorName: string;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{colorName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Tabs defaultValue="contrast" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="contrast" className="flex-1">
                Contrast
              </TabsTrigger>
              <TabsTrigger value="difference" className="flex-1">
                Difference
              </TabsTrigger>
              <TabsTrigger value="formats" className="flex-1">
                Formats
              </TabsTrigger>
            </TabsList>
            <TabsContent value="contrast" className="space-y-6">
              <ColorPreview
                backgroundColor={backgroundColor}
                foregroundColor={foregroundColor}
              />
              <ContrastTable bg={backgroundColor} fg={foregroundColor} />
            </TabsContent>
            <TabsContent value="difference">
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Color difference analysis coming soon...
              </div>
            </TabsContent>
            <TabsContent value="formats" className="space-y-6">
              <ColorFormats color={backgroundColor} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
