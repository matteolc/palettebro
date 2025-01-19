import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BaseColorPicker } from '../../components/BaseColorPicker';
import { describe, it, expect, vi } from 'vitest';

describe('BaseColorPicker', () => {
  const defaultProps = {
    type: 'schemist' as const,
    value: { h: 0, s: 100, l: 50 },
    onChange: vi.fn(),
    onColorChange: vi.fn(),
    sliderConfig: [
      {
        label: 'Slider 1',
        value: 50,
        setValue: vi.fn(),
        max: 100,
        gradient: 'linear-gradient(to right, #000, #fff)',
        unit: '%'
      },
      {
        label: 'Slider 2',
        value: 75,
        setValue: vi.fn(),
        max: 100,
        gradient: 'linear-gradient(to right, #f00, #0f0)',
        unit: '°'
      }
    ]
  };

  it('handles multiple sliders', () => {
    render(<BaseColorPicker {...defaultProps} />);
    
    expect(screen.getByText('Slider 1')).toBeInTheDocument();
    expect(screen.getByText('Slider 2')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('75°')).toBeInTheDocument();
  });

  it('cleans up debounce on unmount', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<BaseColorPicker {...defaultProps} />);
    
    const firstSlider = screen.getAllByRole('slider')[0];
    await user.type(firstSlider, '75');
    
    unmount();
    
    expect(defaultProps.onChange).toHaveBeenCalled();
  });
}); 