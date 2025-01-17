import { formatSchemistToHex, parseColor } from '@palettebruh/theme-generator';
import type React from 'react';
import { useState } from 'react';
import type { SchemistBasedPickerProps } from '~/types';
import { Button } from '~/ui/button';
import { Input } from '~/ui/input';

const CSSColorPicker: React.FC<SchemistBasedPickerProps> = ({
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
        <label className="text-lg mb-2" htmlFor="css-color-picker">
          HTML
        </label>
        <div className="text-lg font-bold mb-2">{formattedValue}</div>
      </div>
      <Input
        style={
          {
            '--neutral-100': '87.11% 0.0055 286.29',
            '--neutral-200': '91.97% 0.004 286.32',
          } as React.CSSProperties
        }
        placeholder="Enter color"
        className="text-zinc-950"
        id="css-color-picker"
        name="css-color-picker"
        type="text"
        value={formattedValue}
        onChange={(e) => setFormattedValue(e.target.value.trim())}
      />
      {error && <div className="text-red-500">{error}</div>}
      <Button
        style={
          {
            '--primary': '14.08% 0.0044 285.82',
            '--primary-foreground': '100% 0 0',
          } as React.CSSProperties
        }
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export { CSSColorPicker };
