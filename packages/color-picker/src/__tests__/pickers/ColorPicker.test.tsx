import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColorPicker } from '../../components/ColorPicker';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('ColorPicker', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with default tab', () => {
    render(<ColorPicker value="#FF0000" onChange={mockOnChange} />);
    
    // Should show LCH tab by default
    expect(screen.getByRole('tab', { name: /lch/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('allows switching between tabs', async () => {
    render(<ColorPicker value="#FF0000" onChange={mockOnChange} />);
    
    // Get the RGB tab button
    const rgbTab = screen.getByRole('tab', { name: /rgb/i });
    
    // Click the RGB tab
    await userEvent.click(rgbTab);
    
    // Wait a moment for the state to update
    await vi.waitFor(() => {
      expect(rgbTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('handles invalid color values', () => {
    render(<ColorPicker value="invalid-color" onChange={mockOnChange} />);
    
    // Should render nothing for invalid colors
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
  });
}); 