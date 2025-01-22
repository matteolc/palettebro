import { render, screen, fireEvent } from '@testing-library/react';
import { CSSColorPicker } from '../../pickers/CSSColorPicker';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { SchemistColor } from '@palettebro/theme-generator/types';
import { formatSchemistToHex } from '@palettebro/theme-generator';

describe('CSSColorPicker', () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    type: 'schemist' as const,
    value: { h: 0, s: 100, l: 50 } as SchemistColor,
    onChange: mockOnChange
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with initial value', () => {
    render(<CSSColorPicker {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    expect(screen.getByLabelText(/html/i)).toBeInTheDocument();
    expect(input).toHaveValue(formatSchemistToHex(defaultProps.value));
  });

  it('handles valid color input', async () => {
    render(<CSSColorPicker {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '#00FF00' } });
    
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('shows error for invalid color', () => {
    render(<CSSColorPicker {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'invalid-color' } });
    
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/invalid color format/i)).toBeInTheDocument();
  });
}); 