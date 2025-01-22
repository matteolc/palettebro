import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HSLColorPicker } from '../../pickers/HSLColorPicker';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { SchemistColor } from '@palettebro/theme-generator/types';

describe('HSLColorPicker', () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    type: 'schemist' as const,
    value: { h: 0, s: 100, l: 50 } as SchemistColor,
    onChange: mockOnChange
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders HSL sliders', () => {
    render(<HSLColorPicker {...defaultProps} />);
    
    expect(screen.getByText('Hue')).toBeInTheDocument();
    expect(screen.getByText('Saturation')).toBeInTheDocument();
    expect(screen.getByText('Lightness')).toBeInTheDocument();
  });

  it('shows correct initial values', () => {
    render(<HSLColorPicker {...defaultProps} />);
    
    expect(screen.getByText('0°')).toBeInTheDocument(); // Hue shows with degree symbol
    expect(screen.getByText('100%')).toBeInTheDocument(); // Saturation
    expect(screen.getByText('50%')).toBeInTheDocument(); // Lightness
  });

  it('updates color when sliders change', async () => {
    const user = userEvent.setup();
    render(<HSLColorPicker {...defaultProps} />);
    
    const hueSlider = screen.getAllByRole('slider')[0];
    await user.pointer([
      { keys: '[MouseLeft>]', target: hueSlider },
      { pointerName: 'mouse', target: hueSlider, coords: { x: 100, y: 0 } },
      { keys: '[/MouseLeft]' }
    ]);

    await vi.waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
  });
}); 