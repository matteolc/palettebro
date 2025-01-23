import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Badge } from '@/ui/badge';
import {
  wcag2Contrast,
  wcag2ContrastGrade,
  wcag3Contrast,
  wcag3ContrastGrade,
} from '@palettebro/theme-generator';
import clsx from 'clsx';

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
    <div className="flex flex-row gap-3">
      <div className="flex items-center gap-y-2 flex-col">
        <Badge
          className={clsx(
            'w-full items-center justify-center font-medium',
            getGradeColor(wcag2Grade, wcag2Score),
          )}
        >
          WCAG 2.1
        </Badge>
        <div className="flex flex-row gap-1 items-center">
          <Badge
            variant="outline"
            className="font-medium rounded-full text-bold"
          >
            {wcag2Grade}
          </Badge>
          <Badge variant="outline" className="font-medium rounded-full">
            {wcag2Score.toFixed(1)}:1
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-col">
        <Badge
          className={clsx(
            'w-full items-center justify-center font-medium',
            getGradeColor(wcag3Grade, Math.abs(wcag3Score)),
          )}
        >
          WCAG 3.0
        </Badge>
        <div className="flex flex-row gap-1 items-center">
          <Badge
            variant="outline"
            className="font-medium rounded-full text-bold"
          >
            {wcag3Grade}
          </Badge>
          <Badge variant="outline" className="font-medium rounded-full">
            {Math.abs(wcag3Score).toFixed(1)}
          </Badge>
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
          <DialogTitle className="text-2xl">Contrast Analysis for {colorName}</DialogTitle>
          <DialogDescription className="text-foreground">
            <a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2</a> and{' '}
            <a href="https://www.w3.org/TR/WCAG3/">WCAG 3.0</a> accessibility
            ratings
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 items-stretch justify-stretch">
            <div
              className="p-8 rounded-lg flex items-center justify-center col-span-3 border border-border"
              style={{ backgroundColor, color: foregroundColor }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">Sample Text</div>
                <div className="text-sm">This is how your text will look</div>
              </div>
            </div>
            <div
              className="relative col-span-1 rounded-lg border border-border overflow-hidden"
              style={{ backgroundColor }}
            >
              {/* Background color hex - positioned at top */}
              <div className="absolute top-2 left-2">
                <code
                  className="px-1.5 py-0.5 rounded bg-black/20 text-xs backdrop-blur-sm"
                  style={{ color: foregroundColor }}
                >
                  {backgroundColor}
                </code>
              </div>
              {/* Foreground color block */}
              <div
                className="absolute right-0 bottom-0 w-3/4 h-2/3 rounded-tl-lg flex items-end justify-center p-2"
                style={{ backgroundColor: foregroundColor }}
              >
                <code
                  className="px-1.5 py-0.5 rounded bg-black/20 text-xs backdrop-blur-sm"
                  style={{ color: backgroundColor }}
                >
                  {foregroundColor}
                </code>
              </div>
            </div>
          </div>
          <ContrastBadge bg={backgroundColor} fg={foregroundColor} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
