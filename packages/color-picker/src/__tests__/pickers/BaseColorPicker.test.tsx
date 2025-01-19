import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BaseColorPicker } from '../../components/BaseColorPicker';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { SchemistColor } from '@palettebruh/theme-generator/types';

describe('BaseColorPicker', () => {
  const mockOnChange = vi.fn();
  const mockOnColorChange = vi.fn();

  const defaultProps = {
    type: 'schemist' as const,
    value: { h: 0, s: 100, l: 50 } as SchemistColor,
    onChange: mockOnChange,
    onColorChange: mockOnColorChange,
    sliderConfig: [
      {
        label: 'Test Slider',
        value: 50,
        setValue: vi.fn(),
        max: 100,
        gradient: 'linear-gradient(to right, #000, #fff)',
        unit: '%'
      }
    ]
  };

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnColorChange.mockClear();
  });

  it('renders sliders with correct labels', () => {
    render(<BaseColorPicker {...defaultProps} />);
    
    expect(screen.getByText('Test Slider')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('calls onChange when slider value changes', async () => {
    render(<BaseColorPicker {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    await userEvent.click(slider);
    
    expect(mockOnChange).toHaveBeenCalled();
  });
}); 