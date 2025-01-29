import { Badge } from '@/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import {
  wcag2Contrast,
  wcag2ContrastGrade,
  wcag3Contrast,
  wcag3ContrastGrade,
} from '@palettebro/theme-generator';
import { useState } from 'react';
import clsx from 'clsx';

type ComplianceLevel = 'AA' | 'AAA';

interface ContrastTableProps {
  bg: string;
  fg: string;
}

const getWCAG2Threshold = (type: string, level: ComplianceLevel): number => {
  switch (type) {
    case 'regular':
      return level === 'AAA' ? 7 : 4.5;
    case 'large':
    case 'ui':
      return level === 'AAA' ? 4.5 : 3;
    default:
      return 4.5;
  }
};

const getWCAG3Threshold = (type: string, level: ComplianceLevel): number => {
  // WCAG 3 thresholds are different, these are placeholder values
  // TODO: Update with correct WCAG 3 thresholds when spec is finalized
  switch (type) {
    case 'regular':
      return level === 'AAA' ? 75 : 60;
    case 'large':
    case 'ui':
      return level === 'AAA' ? 60 : 45;
    default:
      return 60;
  }
};

export const ContrastTable = ({ bg, fg }: ContrastTableProps) => {
  const wcag2Score = wcag2Contrast(bg, fg) ?? 0;
  const wcag3Score = Math.abs(wcag3Contrast(bg, fg));
  const wcag2Grade = wcag2ContrastGrade(bg, fg);
  const wcag3Grade = wcag3ContrastGrade(bg, fg);
  const [complianceLevel, setComplianceLevel] = useState<ComplianceLevel>('AA');
  const [activeTab, setActiveTab] = useState<'wcag2' | 'wcag3'>('wcag2');

  const isWCAG2Pass = (type: string) => {
    if (complianceLevel === 'AAA') {
      return wcag2Grade === 'AAA';
    }
    return (
      ['AA', 'AAA'].includes(wcag2Grade) ||
      (wcag2Grade === 'AA18' && type !== 'regular')
    );
  };

  const isWCAG3Pass = (type: string) => {
    const threshold = getWCAG3Threshold(type, complianceLevel);
    return wcag3Score >= threshold;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-4xl font-semibold">
          {activeTab === 'wcag2'
            ? `${wcag2Score.toFixed(2)}:1`
            : wcag3Score.toFixed(1)}
        </div>
        <div className="flex gap-1">
          {['AA', 'AAA'].map((level) => (
            <Badge
              key={level}
              variant="outline"
              className={clsx(
                'font-medium cursor-pointer',
                complianceLevel === level
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'text-muted-foreground',
              )}
              onClick={() => setComplianceLevel(level as ComplianceLevel)}
            >
              {level}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs
        defaultValue="wcag2"
        className="w-full"
        onValueChange={(value) => setActiveTab(value as 'wcag2' | 'wcag3')}
      >
        <TabsList className="w-full">
          <TabsTrigger value="wcag2" className="flex-1">
            WCAG 2.1
          </TabsTrigger>
          <TabsTrigger value="wcag3" className="flex-1">
            WCAG 3.0
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wcag2">
          <div className="border rounded-lg border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="[&_th]:p-2 [&_th]:text-xs [&_th]:font-medium [&_th]:text-left">
                  <th className="w-full">WCAG CRITERIA</th>
                  <th className="w-24 text-center">SCORE</th>
                  <th className="w-24 text-center">MINIMUM</th>
                </tr>
              </thead>
              <tbody className="[&_td]:p-2 [&_td]:text-sm divide-y divide-border">
                <tr>
                  <td>Regular text (24px / 19px bold and below)</td>
                  <td className="text-center">
                    <Badge
                      variant={isWCAG2Pass('regular') ? 'positive' : 'outline'}
                    >
                      {isWCAG2Pass('regular') ? 'Pass' : 'Fail'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    {getWCAG2Threshold('regular', complianceLevel)}
                  </td>
                </tr>
                <tr>
                  <td>Large text (24px / 19px bold and above)</td>
                  <td className="text-center">
                    <Badge
                      variant={isWCAG2Pass('large') ? 'positive' : 'outline'}
                    >
                      {isWCAG2Pass('large') ? 'Pass' : 'Fail'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    {getWCAG2Threshold('large', complianceLevel)}
                  </td>
                </tr>
                <tr>
                  <td>UI Components & graphics</td>
                  <td className="text-center">
                    <Badge variant={isWCAG2Pass('ui') ? 'positive' : 'outline'}>
                      {isWCAG2Pass('ui') ? 'Pass' : 'Fail'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    {getWCAG2Threshold('ui', complianceLevel)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="wcag3">
          <div className="border rounded-lg border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="[&_th]:p-2 [&_th]:text-xs [&_th]:font-medium [&_th]:text-left">
                  <th className="w-full">WCAG CRITERIA</th>
                  <th className="w-24 text-center">SCORE</th>
                  <th className="w-24 text-center">MINIMUM</th>
                </tr>
              </thead>
              <tbody className="[&_td]:p-2 [&_td]:text-sm divide-y divide-border">
                <tr>
                  <td>Regular text (24px / 19px bold and below)</td>
                  <td className="text-center">
                    <Badge
                      variant={isWCAG3Pass('regular') ? 'positive' : 'outline'}
                    >
                      {isWCAG3Pass('regular') ? 'Pass' : 'Fail'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    {getWCAG3Threshold('regular', complianceLevel)}
                  </td>
                </tr>
                <tr>
                  <td>Large text (24px / 19px bold and above)</td>
                  <td className="text-center">
                    <Badge
                      variant={isWCAG3Pass('large') ? 'positive' : 'outline'}
                    >
                      {isWCAG3Pass('large') ? 'Pass' : 'Fail'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    {getWCAG3Threshold('large', complianceLevel)}
                  </td>
                </tr>
                <tr>
                  <td>UI Components & graphics</td>
                  <td className="text-center">
                    <Badge variant={isWCAG3Pass('ui') ? 'positive' : 'outline'}>
                      {isWCAG3Pass('ui') ? 'Pass' : 'Fail'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    {getWCAG3Threshold('ui', complianceLevel)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
