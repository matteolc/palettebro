import { render, screen, fireEvent } from '@testing-library/react';
import { ColorGrid } from '../../components/ColorGrid';
import { describe, it, expect, vi } from 'vitest';

describe('ColorGrid', () => {
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
    onChange: vi.fn()
  };

  it('renders with border colors', () => {
    render(<ColorGrid {...defaultProps} />);
    
    const colorButton = screen.getByText('Green').closest('button');
    if (!colorButton) throw new Error('Button not found');
    
    const colorDiv = colorButton.firstElementChild;
    expect(colorDiv).toHaveStyle({
      borderColor: '#00CC00'
    });
  });

  it('handles click on color without border', () => {
    render(<ColorGrid {...defaultProps} />);
    
    const colorButton = screen.getByText('Red').closest('button');
    if (!colorButton) throw new Error('Button not found');
    
    fireEvent.click(colorButton);
    expect(defaultProps.onChange).toHaveBeenCalledWith('#FF0000');
  });

  it('displays sublabels correctly', () => {
    render(<ColorGrid {...defaultProps} />);
    const sublabels = ['Primary', 'Secondary'];
    for (const sublabel of sublabels) {
      expect(screen.getByText(sublabel)).toBeInTheDocument();
    }
  });
}); 