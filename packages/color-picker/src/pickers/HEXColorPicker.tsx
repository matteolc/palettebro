import { formatSchemistToHex, parseColor } from '@palettebro/theme-generator';
import type React from 'react';
import { useState } from 'react';
import type { SchemistBasedPickerProps } from '~/types';
import { Button } from '@palettebro/shadcn-ui/button';
import { Input } from '@palettebro/shadcn-ui/input';

const HEXColorPicker: React.FC<SchemistBasedPickerProps> = ({
  value,
  onChange,
}) => {
  const [formattedValue, setFormattedValue] = useState(
    formatSchemistToHex(value),
  );
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const [format, color] = parseColor(formattedValue);

    if (format && color) {
      onChange(color);
    } else {
      setError('Invalid color format');
    }
  };

  return (
    <div className="flex flex-col gap-y-4 my-4">
      <div className="flex flex-row items-center justify-between text-zinc-950">
        <label className="text-md mb-2" htmlFor="hex-color-picker">
          Hex
        </label>
        <div className="text-md font-bold mb-2">{formattedValue}</div>
      </div>
      <Input
        style={
          {
            '--color-input': 'oklch(.141 .005 285.823)',
            '--color-border': 'oklch(.985 .002 247.839)',
          } as React.CSSProperties
        }
        placeholder="Enter color"
        id="hex-color-picker"
        name="hex-color-picker"
        type="text"
        value={formattedValue}
        onChange={(e) => setFormattedValue(e.target.value.trim())}
      />
      {error && <div className="text-red-500">{error}</div>}
      <Button
        style={
          {
            '--color-primary': 'oklch(.141 .005 285.823)',
            '--color-primary-foreground': 'oklch(.985 .002 247.839)',
          } as React.CSSProperties
        }
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export { HEXColorPicker };
