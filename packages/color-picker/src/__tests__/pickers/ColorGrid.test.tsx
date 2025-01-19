import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColorGrid } from '../../components/ColorGrid';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ColorGrid', () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    options: [
      {
        id: '1',
        color: '#FF0000',
        label: 'Red',
        sublabel: 'Primary'
      },
      {
        id: '2',
        color: '#00FF00',
        borderColor: '#00CC00',
        label: 'Green',
        sublabel: 'Secondary'
      }
    ],
    onChange: mockOnChange
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders color grid with correct options', () => {
    render(<ColorGrid {...defaultProps} />);
    
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Green')).toBeInTheDocument();
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('calls onChange when color is selected', () => {
    render(<ColorGrid {...defaultProps} />);
    
    const redButton = screen.getByText('Red').closest('button');
    if (!redButton) throw new Error('Button not found');
    
    fireEvent.click(redButton);
    expect(mockOnChange).toHaveBeenCalledWith('#FF0000');
  });
}); 