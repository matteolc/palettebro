import { render, screen, fireEvent } from '@testing-library/react';
import { PantoneColorPicker } from '../../pickers/PantoneColorPicker';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('PantoneColorPicker', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders color grid with Pantone colors', () => {
    render(<PantoneColorPicker type="string" onChange={mockOnChange} />);
    
    // Check for some known Pantone colors
    expect(screen.getByText('17-1022')).toBeInTheDocument(); // kelp
    expect(screen.getByText('kelp')).toBeInTheDocument();
  });

  it('calls onChange when color is selected', () => {
    render(<PantoneColorPicker type="string" onChange={mockOnChange} />);
    
    const colorButton = screen.getByText('kelp').closest('button');
    if (!colorButton) throw new Error('Button not found');
    
    fireEvent.click(colorButton);
    expect(mockOnChange).toHaveBeenCalledWith('#988467');
  });
}); 