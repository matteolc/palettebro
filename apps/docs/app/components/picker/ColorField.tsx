import { FC } from 'react';
import { RGBColorField } from './RGBColorField';
import { CSSColorField } from './CSSColorField';
import { HSLColorField } from './HSLColorField';
import { LCHColorField } from './LCHColorField';
import { SchemistColor } from 'node_modules/@repo/theme-generator/src/color/types';
import { formatSchemistToHex } from 'node_modules/@repo/theme-generator/src/color/formatting';
import { parseColor } from 'node_modules/@repo/theme-generator/src/color/parsing';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { TailwindColorField } from './TailwindColorField';
import { PantoneColorField } from './PantoneColorField';
import { RALColorField } from './RALColorField';

interface ColorFieldProps {
    value: string;
    token: string;
    onChange: (value: string) => void;
}

interface CSSColorPickerProps {
    value: SchemistColor;
    onChange: (value: SchemistColor) => void;
}

const ColorField: FC<ColorFieldProps> = ({
    value,
    token,
    onChange
}) => {
    const [colorFormat, schemistColor] = parseColor(value);
    if (!schemistColor) return null;
    if (!colorFormat) return null;

    const handleChange = (newValue: SchemistColor) => onChange(formatSchemistToHex(newValue));

    return (
        <div className="h-[30.5rem]">
                <Tabs defaultValue='lch'>
                    <TabsList className="bg-zinc-100 text-zinc-950">
                        <TabsTrigger className="data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-50" value="rgb">RGB</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-50" value="hsl">HSL</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-50" value="lch">LCH</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-50" value="css">HTML</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-50" value="tw">Tailwind</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-50" value="pantone">Pantone</TabsTrigger>
                        <TabsTrigger className="data-[state=active]:bg-zinc-950 data-[state=active]:text-zinc-50" value="ral">RAL</TabsTrigger>
                    </TabsList>
                        <TabsContent value="rgb">
                            <RGBColorField
                                value={schemistColor}
                                onChange={handleChange}
                            />
                        </TabsContent>
                        <TabsContent value="hsl">
                            <HSLColorField
                                value={schemistColor}
                                onChange={handleChange}
                            />
                        </TabsContent>
                        <TabsContent value="lch">
                            <LCHColorField
                                value={schemistColor}
                                onChange={handleChange}
                            />
                        </TabsContent>

                        <TabsContent value="css">
                            <CSSColorField
                                value={schemistColor}
                                onChange={handleChange}
                            />
                        </TabsContent>
                        <TabsContent value="tw">
                            <TailwindColorField token={token} />
                        </TabsContent>
                        <TabsContent value="pantone">
                            <PantoneColorField
                                token={token}
                            />
                        </TabsContent>
                        <TabsContent value="ral">
                            <RALColorField
                                token={token}
                            />
                        </TabsContent>
                </Tabs>
        </div>
    );
};

export default ColorField;
export type { CSSColorPickerProps };