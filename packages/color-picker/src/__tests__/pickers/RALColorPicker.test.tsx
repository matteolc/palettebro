import { render, screen, fireEvent } from '@testing-library/react';
import { RALColorPicker } from '../../pickers/RALColorPicker';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('RALColorPicker', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders color grid with RAL colors', () => {
    render(<RALColorPicker type="string" onChange={mockOnChange} />);
    
    // Check for some known RAL colors
    expect(screen.getByText('1000')).toBeInTheDocument(); // Green beige
    expect(screen.getByText('Green beige')).toBeInTheDocument();
  });

  it('calls onChange when color is selected', () => {
    render(<RALColorPicker type="string" onChange={mockOnChange} />);
    
    const colorButton = screen.getByText('Green beige').closest('button');
    if (!colorButton) throw new Error('Button not found');
    
    fireEvent.click(colorButton);
    expect(mockOnChange).toHaveBeenCalledWith('#CDBA88');
  });
}); 