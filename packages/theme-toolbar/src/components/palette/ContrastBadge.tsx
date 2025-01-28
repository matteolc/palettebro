import { Badge } from '@/ui/badge';
import {
  wcag2Contrast,
  wcag2ContrastGrade,
  wcag3Contrast,
  wcag3ContrastGrade,
} from '@palettebro/theme-generator';
import clsx from 'clsx';

export const ContrastBadge = ({ bg, fg }: { bg: string; fg: string }) => {
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
