import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LCHColorPicker } from '../../pickers/LCHColorPicker';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { SchemistColor } from '@palettebro/theme-generator/types';

describe('LCHColorPicker', () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    type: 'schemist' as const,
    value: { h: 0, s: 100, l: 50 } as SchemistColor,
    onChange: mockOnChange
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders LCH sliders', () => {
    render(<LCHColorPicker {...defaultProps} />);
    
    expect(screen.getByText('Hue')).toBeInTheDocument();
    expect(screen.getByText('Chroma')).toBeInTheDocument();
    expect(screen.getByText('Lightness')).toBeInTheDocument();
  });

  it('shows correct initial values', () => {
    render(<LCHColorPicker {...defaultProps} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('updates color when sliders change', async () => {
    const user = userEvent.setup();
    render(<LCHColorPicker {...defaultProps} />);
    
    const hueSlider = screen.getAllByRole('slider')[0];
    
    // Set the value directly on the slider
    await user.type(hueSlider, '180');
    // Trigger the change event
    hueSlider.dispatchEvent(new Event('change', { bubbles: true }));

    expect(mockOnChange).toHaveBeenCalled();
  });
}); 