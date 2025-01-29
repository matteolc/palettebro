import {
  simulateDeuteranomaly,
  simulateProtanomaly,
  simulateTritanomaly,
} from '@palettebro/theme-generator';
import { getColorDifference } from '@palettebro/theme-generator';
import type { RgbColor } from '@palettebro/theme-generator';
import { cn } from '../../lib/cn';
import { Badge } from '@/ui/badge';
import { Progress } from '@/ui/progress';

interface ColorDifferenceTableProps {
  color1: RgbColor;
  color2: RgbColor;
  className?: string;
}

interface VisionTypeRow {
  name: string;
  simulatedColor1?: RgbColor;
  simulatedColor2?: RgbColor;
  deltaE: number;
  status: 'Safe' | 'Unsafe';
}

const ColorPreview = ({
  color1,
  color2,
}: { color1: RgbColor; color2: RgbColor }) => (
  <div className="flex gap-0 w-16 h-8 rounded-md overflow-hidden">
    <div
      className="w-1/2 h-full"
      style={{
        backgroundColor: `rgb(${color1.r}, ${color1.g}, ${color1.b})`,
      }}
    />
    <div
      className="w-1/2 h-full"
      style={{
        backgroundColor: `rgb(${color2.r}, ${color2.g}, ${color2.b})`,
      }}
    />
  </div>
);

export function ColorDifferenceTable({
  color1,
  color2,
  className,
}: ColorDifferenceTableProps) {
  const getVisionTypeRows = (): VisionTypeRow[] => {
    const rows: VisionTypeRow[] = [
      {
        name: 'Normal vision',
        simulatedColor1: color1,
        simulatedColor2: color2,
        deltaE: getColorDifference(color1, color2),
        status: getColorDifference(color1, color2) >= 11 ? 'Safe' : 'Unsafe',
      },
      {
        name: 'Deuteranopia',
        simulatedColor1: simulateDeuteranomaly(color1),
        simulatedColor2: simulateDeuteranomaly(color2),
        deltaE: getColorDifference(
          simulateDeuteranomaly(color1),
          simulateDeuteranomaly(color2),
        ),
        status:
          getColorDifference(
            simulateDeuteranomaly(color1),
            simulateDeuteranomaly(color2),
          ) >= 11
            ? 'Safe'
            : 'Unsafe',
      },
      {
        name: 'Protanopia',
        simulatedColor1: simulateProtanomaly(color1),
        simulatedColor2: simulateProtanomaly(color2),
        deltaE: getColorDifference(
          simulateProtanomaly(color1),
          simulateProtanomaly(color2),
        ),
        status:
          getColorDifference(
            simulateProtanomaly(color1),
            simulateProtanomaly(color2),
          ) >= 11
            ? 'Safe'
            : 'Unsafe',
      },
      {
        name: 'Tritanopia',
        simulatedColor1: simulateTritanomaly(color1),
        simulatedColor2: simulateTritanomaly(color2),
        deltaE: getColorDifference(
          simulateTritanomaly(color1),
          simulateTritanomaly(color2),
        ),
        status:
          getColorDifference(
            simulateTritanomaly(color1),
            simulateTritanomaly(color2),
          ) >= 11
            ? 'Safe'
            : 'Unsafe',
      },
    ];

    return rows;
  };

  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground w-full',
        className,
      )}
    >
      <div className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-sm font-medium">Preview</div>
            <div className="text-sm font-medium">Vision Type</div>
            <div className="text-sm font-medium">Status</div>
            <div className="text-sm font-medium">Color Difference</div>
          </div>
          <div className="space-y-4">
            {getVisionTypeRows().map((row) => (
              <div
                key={row.name}
                className="grid grid-cols-4 gap-4 items-center"
              >
                <ColorPreview
                  color1={row.simulatedColor1 || color1}
                  color2={row.simulatedColor2 || color2}
                />
                <div className="text-sm">{row.name}</div>
                <div>
                  <Badge
                    variant={row.status === 'Safe' ? 'positive' : 'outline' }
                  >
                    {row.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs">{row.deltaE.toFixed(2)}</div>
                  <div className="flex-1">
                    <Progress
                      value={Math.min(100, (row.deltaE / 100) * 100)}
                      className={cn(
                        "h-2",
                        row.status === 'Safe' 
                          ? "bg-white [&>div]:bg-green-500" 
                          : "bg-white [&>div]:bg-red-500"
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
