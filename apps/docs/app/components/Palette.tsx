import { MuiColorPalette, TokenColorPalette, BASE_TOKENS, STATUS_TOKENS } from "@palettebruh/theme-toolbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const Palette = () => {
  return (
    <Tabs defaultValue="tokens" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="tokens">Design Tokens</TabsTrigger>
        <TabsTrigger value="mui">Material Design</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tokens" className="mt-0">
        <div className="flex flex-col gap-y-4">
          {[...BASE_TOKENS, ...STATUS_TOKENS].map((token) => (
            <TokenColorPalette token={token} key={token} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="mui" className="mt-0">
        <MuiColorPalette />
      </TabsContent>
    </Tabs>
  );
};
