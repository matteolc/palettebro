import { z } from 'zod';
import { columns } from '~/components/examples/tasks/components/columns';
import { DataTable } from '~/components/examples/tasks/components/data-table';
import { UserNav } from '~/components/examples/tasks/components/user-nav';
import { taskSchema } from '~/components/examples/tasks/data/schema';
import tasksFromFile from '~/components/examples/tasks/data/tasks.json';
import { Card } from '~/components/ui/card';

export default function Page() {
  const tasks = z.array(taskSchema).parse(tasksFromFile);

  return (
    <Card className="shadow rounded-lg">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </Card>
  );
}
