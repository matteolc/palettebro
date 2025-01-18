import { Slider } from '@/ui/slider';
import { SettingsSection } from './SettingsSection';

interface SettingsSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  title: string;
}

export const SettingsSlider = ({
  value,
  onChange,
  min,
  max,
  step,
  title,
}: SettingsSliderProps) => {
  return (
    <SettingsSection
      title={title}
      rightElement={<div className="text-lg mb-2">{value}</div>}
    >
      <Slider
        value={[value]}
        min={min}
        step={step}
        max={max}
        onValueChange={(values: number[]) => onChange(values[0])}
      />
    </SettingsSection>
  );
};
