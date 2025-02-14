import PlaygroundPage from '~/components/examples/playground/page';
import { Card } from '@palettebro/shadcn-ui/card';

export default function Page() {
  return (
    <Card className="shadow rounded-lg">
      <PlaygroundPage />
    </Card>
  );
}
