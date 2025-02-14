import { PlusCircle } from 'lucide-react';
import { AlbumArtwork } from '~/components/examples/music/album-artwork';
import {
  listenNowAlbums,
  madeForYouAlbums,
} from '~/components/examples/music/data/albums';
import { playlists } from '~/components/examples/music/data/playlists';
import { Menu } from '~/components/examples/music/menu';
import { PodcastEmptyPlaceholder } from '~/components/examples/music/podcast-empty-placeholder';
import { Sidebar } from '~/components/examples/music/sidebar';
import { Button } from '@palettebro/shadcn-ui/button';
import { Card } from '@palettebro/shadcn-ui/card';
import { ScrollArea, ScrollBar } from '@palettebro/shadcn-ui/scroll-area';
import { Separator } from '@palettebro/shadcn-ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@palettebro/shadcn-ui/tabs';

export default function Page() {
  return (
    <Card className="shadow rounded-lg">
      <Menu />
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar playlists={playlists} className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs defaultValue="music" className="h-full space-y-6">
                  <div className="space-between flex items-center">
                    <TabsList>
                      <TabsTrigger value="music" className="relative">
                        Music
                      </TabsTrigger>
                      <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                      <TabsTrigger value="live" disabled>
                        Live
                      </TabsTrigger>
                    </TabsList>
                    <div className="ml-auto mr-4">
                      <Button>
                        <PlusCircle />
                        Add music
                      </Button>
                    </div>
                  </div>
                  <TabsContent
                    value="music"
                    className="border-none p-0 outline-none"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Listen Now
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Top picks for you. Updated daily.
                        </p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="relative">
                      <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                          {listenNowAlbums.map((album) => (
                            <AlbumArtwork
                              key={album.name}
                              album={album}
                              className="w-[250px]"
                              aspectRatio="portrait"
                              width={250}
                              height={330}
                            />
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                    <div className="mt-6 space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Made for You
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Your personal playlists. Updated daily.
                      </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="relative">
                      <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                          {madeForYouAlbums.map((album) => (
                            <AlbumArtwork
                              key={album.name}
                              album={album}
                              className="w-[150px]"
                              aspectRatio="square"
                              width={150}
                              height={150}
                            />
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="podcasts"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          New Episodes
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Your favorite podcasts. Updated daily.
                        </p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <PodcastEmptyPlaceholder />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
