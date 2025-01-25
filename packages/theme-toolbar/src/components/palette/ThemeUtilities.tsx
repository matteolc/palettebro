import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Checkbox } from '../../ui/checkbox';
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../ui/chart';

const chartData = [
  { project: 'active', count: 12, fill: 'var(--color-active)' },
  { project: 'completed', count: 8, fill: 'var(--color-completed)' },
  { project: 'inProgress', count: 15, fill: 'var(--color-inProgress)' },
  { project: 'onHold', count: 4, fill: 'var(--color-onHold)' },
  { project: 'planned', count: 6, fill: 'var(--color-planned)' },
];

const chartConfig = {
  count: {
    label: 'Projects',
  },
  active: {
    label: 'Active',
    color: 'oklch(var(--primary-rainbow-1))',
  },
  completed: {
    label: 'Completed',
    color: 'oklch(var(--primary-rainbow-3))',
  },
  inProgress: {
    label: 'In Progress',
    color: 'oklch(var(--primary-rainbow-5))',
  },
  onHold: {
    label: 'On Hold',
    color: 'oklch(var(--primary-rainbow-7))',
  },
  planned: {
    label: 'Planned',
    color: 'oklch(var(--primary-rainbow-9))',
  },
} satisfies ChartConfig;

export const ThemeUtilities = () => {
  return (
    <Card className="border-border h-full">
      <CardHeader>
        <CardTitle>
          <h3 className="text-xl font-bold">Theme Utilities</h3>
          <p className="text-sm text-on-secondary-foreground">
            Demonstration of utility classes and their usage in common UI
            patterns
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[calc(100%-var(--card-header-height))]">
        {/* Main Content Area */}

        {/* Sidebar Example */}
        <div className="grid grid-cols-[240px,1fr] gap-6 border rounded-lg overflow-hidden bg-background h-full">
          <div className="bg-sidebar text-sidebar-foreground p-4">
            <div className="space-y-4">
              <h4 className="font-semibold">Sidebar</h4>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start bg-sidebar-accent text-sidebar-accent-foreground"
                >
                  Active Item
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-accent"
                >
                  Menu Item
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-accent"
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col h-full">
            {/* Card Example */}
            <div className="grid gap-6 md:grid-cols-2 h-full">
              <Card className="bg-card text-card-foreground h-full relative">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium">
                    Active Projects
                  </CardTitle>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                        >
                          <path
                            d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <div className="grid gap-1">
                        <Button variant="ghost" className="justify-start">
                          Edit
                        </Button>
                        <Button variant="ghost" className="justify-start">
                          Duplicate
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-md text-on-secondary-foreground">
                        Active projects in your portfolio
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-1">
                          <p className="text-2xl font-bold">12</p>
                          <div className="flex items-center text-sm text-on-secondary-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-5 h-5 text-accent"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="ml-1">+2 from last week</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground"
                        >
                          Add New
                        </Button>
                      </div>
                    </div>
                    <div className="h-[2px] bg-border" />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Completion Rate</span>
                        <span className="text-accent font-bold">84%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary">
                        <div className="h-full w-[84%] rounded-full bg-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <ChartContainer config={chartConfig}>
                      <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid
                          vertical={false}
                          opacity={1}
                          stroke="oklch(var(--accent)/0.2)"
                          strokeDasharray={'4 4'}
                        />
                        <XAxis
                          dataKey="project"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          tickFormatter={(value) =>
                            chartConfig[value as keyof typeof chartConfig]
                              ?.label
                          }
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                          dataKey="count"
                          strokeWidth={2}
                          radius={8}
                          activeIndex={0}
                          activeBar={({ ...props }) => {
                            return (
                              <Rectangle
                                {...props}
                                fillOpacity={0.8}
                                stroke={props.payload.fill}
                                strokeDasharray={4}
                                strokeDashoffset={4}
                              />
                            );
                          }}
                        />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Form Elements */}
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>User Profile</CardTitle>
                  <p className="text-sm text-on-secondary-foreground">
                    Update your personal information and preferences
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="border-input ring-offset-background focus-visible:ring-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="border-input ring-offset-background focus-visible:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="border-input ring-offset-background focus-visible:ring-ring"
                    />
                    <p className="text-xs text-on-secondary-foreground">
                      We'll never share your email with anyone else.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">About Me</Label>
                    <textarea
                      id="bio"
                      placeholder="Tell us a bit about yourself..."
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-on-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Notification Preferences</Label>
                    <div className="grid gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="emailNotif"
                          className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <Label htmlFor="emailNotif" className="font-normal">
                          Email Notifications
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="marketingEmails"
                          className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <Label
                          htmlFor="marketingEmails"
                          className="font-normal"
                        >
                          Marketing Emails
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <Button className="bg-primary text-primary-foreground">
                      Save Changes
                    </Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
