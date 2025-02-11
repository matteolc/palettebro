import { formatSchemistToHex, parseColor } from '@palettebro/theme-generator';
import type React from 'react';
import { useState } from 'react';
import type { SchemistBasedPickerProps } from '~/types';
import { Button } from '~/ui/button';
import { Input } from '~/ui/input';

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
        placeholder="Enter color"
        id="hex-color-picker"
        name="hex-color-picker"
        type="text"
        value={formattedValue}
        onChange={(e) => setFormattedValue(e.target.value.trim())}
      />
      {error && <div className="text-red-500">{error}</div>}
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export { HEXColorPicker };
