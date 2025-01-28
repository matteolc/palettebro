export const ColorPreview = ({
  backgroundColor,
  foregroundColor,
  showCode = false,
}: {
  backgroundColor: string;
  foregroundColor: string;
  showCode?: boolean;
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-stretch justify-stretch">
      <div
        className="p-8 rounded-lg flex items-center justify-center col-span-3 border border-border"
        style={{ backgroundColor, color: foregroundColor }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold">Sample Text</div>
          <div className="text-sm">This is how your text will look</div>
        </div>
      </div>

      <div
        className="relative col-span-1 rounded-lg border border-border overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Background color hex - positioned at top */}
        {showCode && (
          <div className="absolute top-2 left-2">
            <code
              className="px-1.5 py-0.5 rounded bg-black/20 text-xs backdrop-blur-sm"
              style={{ color: foregroundColor }}
            >
              {backgroundColor}
            </code>
          </div>
        )}
        {/* Foreground color block */}
        <div
          className="absolute right-0 bottom-0 w-3/4 h-2/3 rounded-tl-lg flex items-end justify-center p-2"
          style={{ backgroundColor: foregroundColor }}
        >
          {showCode && (
            <code
              className="px-1.5 py-0.5 rounded bg-black/20 text-xs backdrop-blur-sm"
              style={{ color: backgroundColor }}
            >
              {foregroundColor}
            </code>
          )}
        </div>
      </div>
    </div>
  );
};
