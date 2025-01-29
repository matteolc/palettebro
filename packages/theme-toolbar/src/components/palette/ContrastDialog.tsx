import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { ColorFormats } from './ColorFormats';
import { ColorPreview } from './ColorPreview';
import { ContrastTable } from './ContrastTable';
import { ColorDifferenceTable } from './ColorDifferenceTable';
import { parseColor, schemistToRgb } from '@palettebro/theme-generator';

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
          <Tabs defaultValue="contrast" className="w-full min-h-[500px]">
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
              <div className="space-y-4">
                <div className="flex items-center justify-center text-muted-foreground w-full">
                  {(() => {
                    const [_, bgColor] = parseColor(backgroundColor);
                    const [__, fgColor] = parseColor(foregroundColor);
                    if (!bgColor || !fgColor) return null;
                    return (
                      <ColorDifferenceTable
                        color1={schemistToRgb(bgColor)}
                        color2={schemistToRgb(fgColor)}
                      />
                    );
                  })()}
                </div>
                <div className="prose dark:prose-invert">
                  <h3 className="text-lg font-semibold mb-1">How this works</h3>
                  <p className="text-sm">
                    Ratings are calculated by first converting the colors to their simulated counterparts. 
                    The simulated values approximate the colors that would be seen by fully deficient vision of each particular type. 
                    The simulated colors are then compared using the DeltaE 2000 color difference formula. 
                    A color difference value of 11 or more is considered passing; anything lower is too similar to distinguish.
                  </p>
                  <p className="text-sm">
                    The color difference meters visualize the DeltaE value to give reference to how different 
                    the colors would appear for each color vision deficiency.
                  </p>
                </div>
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
