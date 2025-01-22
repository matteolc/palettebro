import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Badge } from '@/ui/badge';
import {
  wcag2Contrast,
  wcag2ContrastGrade,
  wcag3Contrast,
  wcag3ContrastGrade,
} from '@palettebruh/theme-generator';

const ContrastBadge = ({ bg, fg }: { bg: string; fg: string }) => {
  const wcag2Score = wcag2Contrast(bg, fg) ?? 0;
  const wcag3Score = wcag3Contrast(bg, fg);
  const wcag2Grade = wcag2ContrastGrade(bg, fg);
  const wcag3Grade = wcag3ContrastGrade(bg, fg);

  const getGradeColor = (grade: string, score: number) => {
    // WCAG 2.1 thresholds
    if (grade.startsWith('AAA') || score >= 7) {
      return 'bg-green-500/10 text-green-700 border-green-500/20';
    }
    if (grade === 'AA' || score >= 4.5) {
      return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
    }
    if (grade === 'AA18' || score >= 3) {
      return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
    }
    return 'bg-red-500/10 text-red-700 border-red-500/20';
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge 
          className={`px-3 py-1.5 font-medium ${getGradeColor(wcag2Grade, wcag2Score)}`}
        >
          WCAG 2.1
        </Badge>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{wcag2Grade}</span>
          <span className={'text-xs'}>
            Contrast {wcag2Score.toFixed(1)}:1
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge 
          className={`px-3 py-1.5 font-medium ${getGradeColor(wcag3Grade, Math.abs(wcag3Score))}`}
        >
          WCAG 3.0
        </Badge>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{wcag3Grade}</span>
          <span className={'text-xs'}>
            Contrast {Math.abs(wcag3Score).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contrast Analysis for {colorName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div
            className="p-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor, color: foregroundColor }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold">Sample Text</div>
              <div className="text-sm">This is how your text will look</div>
            </div>
          </div>
          <div className="flex justify-center">
            <ContrastBadge bg={backgroundColor} fg={foregroundColor} />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded border border-border" 
                style={{ backgroundColor }}
              />
              <p className="text-sm text-muted-foreground">Background: {backgroundColor}</p>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded border border-border" 
                style={{ backgroundColor: foregroundColor }}
              />
              <p className="text-sm text-muted-foreground">Foreground: {foregroundColor}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 