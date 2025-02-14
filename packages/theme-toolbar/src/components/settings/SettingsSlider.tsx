import { Slider } from '@palettebro/shadcn-ui/slider';
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
      className='items-center'
      rightElement={<div className="text-md mb-2">{value}</div>}
    >
      <Slider
        value={[value]}
        min={min}
        step={step}
        max={max}
        onValueChange={(values: number[]) => onChange(values[0])}
        orientation="horizontal"
        style={{
          '--color-primary': 'oklch(.928 .006 264.531)',
          '--color-muted': 'oklch(0.141 .005 285.823)',
        } as React.CSSProperties}
      />
    </SettingsSection>
  );
};
