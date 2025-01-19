import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from '../../components/ColorSlider';
import { describe, it, expect, vi } from 'vitest';

describe('ColorSlider', () => {
  const defaultProps = {
    value: [50],
    onValueChange: vi.fn(),
    max: 100,
    trackStyle: { background: 'linear-gradient(to right, #000, #fff)' },
    ariaLabelThumb: 'Test slider'
  };

  it('renders with correct value', () => {
    render(<Slider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('50');
  });

  it('calls onValueChange when value changes', () => {
    render(<Slider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '75' } });
    
    expect(defaultProps.onValueChange).toHaveBeenCalledWith([75]);
  });

  it('applies custom track style', () => {
    render(<Slider {...defaultProps} />);
    
    const track = screen.getByRole('slider').parentElement;
    expect(track).toHaveStyle({
      background: 'linear-gradient(to right, #000, #fff)'
    });
  });

  it('applies aria label to thumb', () => {
    render(<Slider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-label', 'Test slider');
  });

  it('respects max value', () => {
    render(<Slider {...defaultProps} max={200} />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('max', '200');
  });

  it('handles disabled state', () => {
    render(<Slider {...defaultProps} disabled />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toBeDisabled();
  });
}); 