import { cn } from '@/lib/cn';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';
import convert from 'simple-color-converter';
import type { ColorValue } from 'simple-color-converter';

export const ColorFormats = ({ color }: { color: string }) => {
  try {
    const ConversionMap = {
      hex6: 'string',
      rgb: ['r', 'g', 'b'],
      hsl: ['h', 's', 'l'],
      lab: ['l', 'a', 'b'],
      html: 'string',
      pantone: 'string',
      ral: ['ral', 'name', 'lrv'],
    };

    const formatChannels = (format: string, value: ColorValue) => {
      if (Array.isArray(ConversionMap[format as keyof typeof ConversionMap])) {
        const keys = ConversionMap[format as keyof typeof ConversionMap] as string[];
        return keys.map(
          (key) =>
            `${key.toUpperCase()}: ${(value as unknown as Record<string, number | string>)[key]}`,
        ).join(', ');
      }
      return '';
    };

    const formatString = (format: string, value: ColorValue) => {
      if (format === 'hex6') {
        return `#${String(value)}`;
      }
      
      if (format === 'html') {
        return String(value);
      }

      if (format === 'pantone') {
        return String(value);
      }

      if (
        format === 'rgb' &&
        typeof value === 'object' &&
        value !== null &&
        'r' in value &&
        'g' in value &&
        'b' in value
      ) {
        return `rgb(${value.r}, ${value.g}, ${value.b})`;
      }
      
      if (
        format === 'hsl' &&
        typeof value === 'object' &&
        value !== null &&
        'h' in value &&
        's' in value &&
        'l' in value
      ) {
        return `hsl(${value.h}, ${value.s}%, ${value.l}%)`;
      }
      
      if (
        format === 'lab' &&
        typeof value === 'object' &&
        value !== null &&
        'l' in value &&
        'a' in value &&
        'b' in value
      ) {
        return `lab(${value.l}% ${value.a} ${value.b})`;
      }

      return '';
    };

    const getColorPreview = (format: string, value: ColorValue) => {
      let colorString = formatString(format, value);
      if (!colorString || format === 'pantone' || format === 'ral') return null;
      
      // Convert HTML color names to CSS format for preview
      if (format === 'html') {
        colorString = colorString.toLowerCase().replace(/\s+(\w)/g, (_, letter) => letter.toUpperCase());
      }
      
      return (
        <div className="flex items-center gap-1">
          <div 
            className="w-6 h-6 rounded-md"
            style={{ 
              backgroundColor: colorString,
              backgroundImage: 'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)',
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
              backgroundClip: 'padding-box',
            }} 
          >
            <div 
              className="w-full h-full rounded-md"
              style={{ backgroundColor: colorString }}
            />
          </div>
        </div>
      );
    };

    return (
        <div
        className={cn(
          'rounded-lg border bg-card text-card-foreground w-full',
        )}
      >
        <div className="p-6">        
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 [&_th]:uppercase [&_th]:text-xs [&_th]:font-medium [&_th]:text-left">
            <TableHead>Format</TableHead>
            <TableHead>Channels</TableHead>
            <TableHead>String</TableHead>
            <TableHead>Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(ConversionMap).map((format) => {
            try {
              const converted = new convert({ color, to: format });
              return (
                <TableRow key={format}>
                  <TableCell className="font-medium">{format.toUpperCase()}</TableCell>
                  <TableCell>
                    <code className="text-xs">{formatChannels(format, converted.color)}</code>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs">{formatString(format, converted.color)}</code>
                  </TableCell>
                  <TableCell>
                    {getColorPreview(format, converted.color)}
                  </TableCell>
                </TableRow>
              );
            } catch (error) {
              return (
                <TableRow key={format}>
                  <TableCell className="font-medium">{format.toUpperCase()}</TableCell>
                  <TableCell colSpan={3}>
                    <span className="text-sm text-red-500">Conversion failed</span>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
      </div>
      </div>
    );
  } catch (error) {
    console.error('Error in ColorFormats:', error);
    return null;
  }
};
