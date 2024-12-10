import React from 'react';

interface RangeInputProps {
    id: string;
    min?: number;
    max?: number;
    gradient: string;
    value: number;
    onInput?: (value: number) => void;
}

const RangeInput: React.FC<RangeInputProps> = ({
    id,
    min = 0,
    max = 100,
    gradient,
    value,
    onInput
}) => {
    return (
        <input
            type="range"
            id={id}
            min={min}
            max={max}
            value={value}
            className="w-full h-4 cursor-pointer appearance-none bg-gradient-to-r rounded focus:outline-none"
            style={{ background: gradient }}
            onChange={(e) => onInput?.(Number(e.target.value))}
        />
    );
};

export default RangeInput;