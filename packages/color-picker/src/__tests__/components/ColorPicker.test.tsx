import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ColorPicker } from '../../components/ColorPicker';
import { describe, it, expect, vi } from 'vitest';

describe('ColorPicker', () => {
  const mockOnChange = vi.fn();

  it('renders all available tabs', () => {
    render(<ColorPicker value="#FF0000" onChange={mockOnChange} />);
    const expectedTabs = ['RGB', 'HSL', 'LCH', 'CSS', 'TW', 'PANTONE', 'RAL'];
    for (const tabName of expectedTabs) {
      expect(screen.getByRole('tab', { name: new RegExp(tabName, 'i') })).toBeInTheDocument();
    }
  });

  it('maintains selected tab state', async () => {
    render(<ColorPicker value="#FF0000" onChange={mockOnChange} />);
    
    const rgbTab = screen.getByRole('tab', { name: /rgb/i });
    await userEvent.click(rgbTab);
    
    // Switch to another tab
    const hslTab = screen.getByRole('tab', { name: /hsl/i });
    await userEvent.click(hslTab);
    
    expect(hslTab).toHaveAttribute('aria-selected', 'true');
    expect(rgbTab).toHaveAttribute('aria-selected', 'false');
  });

  it('updates color when onChange is called', async () => {
    render(<ColorPicker value="#FF0000" onChange={mockOnChange} />);
    
    // Find and click a color in one of the pickers
    const rgbTab = screen.getByRole('tab', { name: /rgb/i });
    await userEvent.click(rgbTab);
    
    const redSlider = screen.getAllByRole('slider')[0];
    await userEvent.type(redSlider, '128');
    
    expect(mockOnChange).toHaveBeenCalled();
  });
}); 