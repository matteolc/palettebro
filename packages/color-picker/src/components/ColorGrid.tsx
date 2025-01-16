interface ColorGridProps {
  options: {
    id: string;
    color: string;
    borderColor?: string;
    label: string;
    sublabel: string;
  }[];
  onChange: (color: string) => void;
}

export const ColorGrid = ({ options, onChange }: ColorGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 my-4">
      {options.map((option) => (
        <button
          type="button"
          key={option.id}
          className="group relative flex flex-col h-24 rounded-lg overflow-hidden"
          onClick={() => onChange(option.color)}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundColor: option.color,
              borderColor: option.borderColor || option.color,
            }}
          />
          <div className="absolute text-zinc-950 bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2">
            <div className="text-xs font-bold">{option.label}</div>
            <div className="text-xs truncate">{option.sublabel}</div>
          </div>
        </button>
      ))}
    </div>
  );
};