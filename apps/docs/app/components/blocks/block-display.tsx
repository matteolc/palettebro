import { type BlockItem, BlockViewer } from './block-viewer';

export function BlockDisplay({ item }: { item: BlockItem }) {
  return <BlockViewer item={item} />;
}
