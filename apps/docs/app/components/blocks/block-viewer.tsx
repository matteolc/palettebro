import * as React from "react"
import {
  Check,
  Fullscreen,
  Monitor,
  Smartphone,
  Tablet,
  Terminal,
} from "lucide-react"
import { ImperativePanelHandle } from "react-resizable-panels"
import { z } from "zod"

import { useCopyToClipboard } from "~/hooks/use-copy-to-clipboard"
import { Button } from "~/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable"
import { Separator } from "~/components/ui/separator"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "~/components/ui/toggle-group"
import { Link } from "@remix-run/react"
import LoginPage from "./login-01/page"

type BlockItem = {
  name: string
  description: string
  meta?: { iframeHeight: string }
  component: React.ComponentType
}

type BlockViewerContext = {
  item: BlockItem
  resizablePanelRef: React.RefObject<ImperativePanelHandle> | null
}

const BlockViewerContext = React.createContext<BlockViewerContext | null>(null)

function useBlockViewer() {
  const context = React.useContext(BlockViewerContext)
  if (!context) {
    throw new Error("useBlockViewer must be used within a BlockViewerProvider.")
  }
  return context
}

function BlockViewerProvider({
  item,
  children,
}: Pick<BlockViewerContext, "item"> & {
  children: React.ReactNode
}) {
  const resizablePanelRef = React.useRef<ImperativePanelHandle>(null)

  return (
    <BlockViewerContext.Provider
      value={{
        item,
        resizablePanelRef,
      }}
    >
      <div
        id={item.name}
        className="group/block-view-wrapper flex min-w-0 flex-col items-stretch gap-4"
        style={
          {
            "--height": item.meta?.iframeHeight ?? "930px",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </BlockViewerContext.Provider>
  )
}

function BlockViewerToolbar() {
  const { item, resizablePanelRef } = useBlockViewer()
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  return (
    <div className="flex w-full items-center gap-2 md:pr-[14px]">
      <a
        href={`#${item.name}`}
        className="text-sm font-medium underline-offset-2 hover:underline"
      >
        {item.description}
      </a>
      <div className="ml-auto hidden items-center gap-2 md:flex">
        <div className="hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none lg:flex">
          <ToggleGroup
            type="single"
            defaultValue="100"
            onValueChange={(value) => {
              if (resizablePanelRef?.current) {
                resizablePanelRef.current.resize(parseInt(value))
              }
            }}
          >
            <ToggleGroupItem
              value="100"
              className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
              title="Desktop"
            >
              <Monitor className="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="60"
              className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
              title="Tablet"
            >
              <Tablet className="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="30"
              className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
              title="Mobile"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <Separator orientation="vertical" className="h-4" />
            <Button
              size="icon"
              variant="ghost"
              className="h-[22px] w-[22px] rounded-sm p-0"
              asChild
              title="Open in New Tab"
            >
              <Link to={`/view/${item.name}`} target="_blank">
                <span className="sr-only">Open in New Tab</span>
                <Fullscreen className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </ToggleGroup>
        </div>
        <Separator orientation="vertical" className="mx-1 hidden h-4 md:flex" />
        <div className="flex h-7 items-center gap-1 rounded-md border p-[2px]">
          <Button
            variant="ghost"
            className="hidden h-[22px] w-auto gap-1 rounded-sm px-2 md:flex lg:w-auto"
            size="sm"
            onClick={() => {
              copyToClipboard(`npx shadcn@latest add ${item.name}`)
            }}
          >
            {isCopied ? <Check /> : <Terminal />}
            <span className="hidden lg:inline">npx shadcn add {item.name}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

function BlockViewerView() {
  const { item, resizablePanelRef } = useBlockViewer()

  return (
    <div className="group-data-[view=code]/block-view-wrapper:hidden md:h-[--height]">
      <div className="grid w-full gap-4">
        <ResizablePanelGroup direction="horizontal" className="relative z-10">
          <ResizablePanel
            ref={resizablePanelRef}
            className="relative aspect-[4/2.5] rounded-xl border bg-background md:aspect-auto"
            defaultSize={100}
            minSize={30}
          >
            <div className="h-[930px] bg-background relative z-20 w-full">
              <iframe
                src={`/view/${item.name}`}
                height={item.meta?.iframeHeight ?? 930}
                className="relative z-20 w-full bg-background"
              />
            </div>
          </ResizablePanel>
          <ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
          <ResizablePanel defaultSize={0} minSize={0} />
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

function BlockViewer({
  item,
  ...props
}: Pick<BlockViewerContext, "item">) {
  return (
    <BlockViewerProvider
      item={item}
      {...props}
    >
      <BlockViewerToolbar />
      <BlockViewerView />
    </BlockViewerProvider>
  )
}

export { BlockViewer }
export type { BlockItem }
