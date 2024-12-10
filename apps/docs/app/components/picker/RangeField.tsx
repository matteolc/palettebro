import React from 'react';
import RangeInput from './RangeInput';

interface RangeFieldProps {
    id: string;
    label: string;
    min?: number;
    max?: number;
    gradient: string;
    value: number;
    unit?: string;
    onInput?: (value: number) => void;
}

const RangeField: React.FC<RangeFieldProps> = ({
    id,
    label,
    min = 0,
    max = 100,
    gradient,
    value,
    unit = '',
    onInput
}) => {
    return (
        <>
            <label className="input-grid-firstCol" htmlFor={id}>
                {label}
            </label>
            <RangeInput
                id={id}
                min={min}
                max={max}
                gradient={gradient}
                value={value}
                onInput={onInput}
            />
            <span className="min-w-[4ch] text-right">
                {Math.round(value)}{unit}
            </span>
        </>
    );
};

export default RangeField;