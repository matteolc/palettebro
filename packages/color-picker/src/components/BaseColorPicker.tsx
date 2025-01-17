import type { SchemistColor } from '@palettebruh/theme-generator/types';
import type React from 'react';
import { useEffect, useMemo } from 'react';
import { Slider } from '~/components/ColorSlider';
import { debounce } from '~/lib/debounce';
import type { SchemistBasedPickerProps } from '~/types';

interface SliderConfig {
  label: string;
  value: number;
  setValue: (value: number) => void;
  max: number;
  gradient: string;
  unit: string;
}

interface BaseColorPickerProps extends SchemistBasedPickerProps {
  sliderConfig: SliderConfig[];
  onColorChange: (values: number[]) => SchemistColor;
}

export const BaseColorPicker: React.FC<BaseColorPickerProps> = ({
  onChange,
  sliderConfig,
  onColorChange,
}) => {
  const debouncedOnChange = useMemo(
    () =>
      debounce((newColor: SchemistColor) => {
        onChange(newColor);
      }, 16),
    [onChange],
  );

  const handleSliderChange = (config: SliderConfig, newValue: number) => {
    config.setValue(newValue);
    const values = sliderConfig.map((c) => (c === config ? newValue : c.value));
    debouncedOnChange(onColorChange(values));
  };

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <div className="flex flex-col gap-y-4 my-4">
      {sliderConfig.map((config) => (
        <div key={config.label} className="flex flex-col gap-x-4">
          <div className="flex flex-row items-center justify-between text-zinc-950">
            <div className="text-lg mb-2">{config.label}</div>
            <div className="text-lg font-bold mb-2">
              {Math.floor(config.value)}
              {config.unit}
            </div>
          </div>
          <Slider
            trackStyle={{ background: config.gradient }}
            max={config.max}
            value={[config.value]}
            onValueChange={(value: number[]) =>
              handleSliderChange(config, value[0])
            }
          />
        </div>
      ))}
    </div>
  );
};
