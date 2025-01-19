import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RGBColorPicker } from '../../pickers/RGBColorPicker';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { SchemistColor } from '@palettebruh/theme-generator/types';

describe('RGBColorPicker', () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    type: 'schemist' as const,
    value: { h: 0, s: 100, l: 50 } as SchemistColor,
    onChange: mockOnChange
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders RGB sliders', () => {
    render(<RGBColorPicker {...defaultProps} />);
    
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Green')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
  });

  it('shows correct initial values', () => {
    render(<RGBColorPicker {...defaultProps} />);
    
    expect(screen.getByText('255')).toBeInTheDocument(); // Red
    expect(screen.getByText('0')).toBeInTheDocument(); // Green
    expect(screen.getByText('0')).toBeInTheDocument(); // Blue
  });

  it('updates color when sliders change', () => {
    render(<RGBColorPicker {...defaultProps} />);
    
    const redSlider = screen.getAllByRole('slider')[0];
    fireEvent.change(redSlider, { target: { value: 128 } });
    
    expect(mockOnChange).toHaveBeenCalled();
  });
}); 