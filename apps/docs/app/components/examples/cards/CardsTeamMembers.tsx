import { ChevronDown } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';

const teamMembers = [
  {
    name: "Sofia Davis",
    email: "m@example.com",
    avatar: "/avatars/01.png",
    fallback: "OM",
    role: "Owner"
  },
  {
    name: "Jackson Lee",
    email: "p@example.com",
    avatar: "/avatars/02.png",
    fallback: "JL",
    role: "Member"
  },
  {
    name: "Isabella Nguyen",
    email: "i@example.com",
    avatar: "/avatars/03.png",
    fallback: "IN",
    role: "Member"
  }
];

const roles = [
  {
    name: "Viewer",
    description: "Can view and comment."
  },
  {
    name: "Developer",
    description: "Can view, comment and edit."
  },
  {
    name: "Billing",
    description: "Can view, comment and manage billing."
  },
  {
    name: "Owner",
    description: "Admin-level access to all resources."
  }
];

export function CardsTeamMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {teamMembers.map((member) => (
          <div key={member.toString()} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.avatar} alt="Image" />
                <AvatarFallback>{member.fallback}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto group">
                  {member.role} <ChevronDown className="text-muted-foreground group-hover:text-muted" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">
                <Command>
                  <CommandInput placeholder="Select new role..." />
                  <CommandList>
                    <CommandEmpty>No roles found.</CommandEmpty>
                    <CommandGroup className="p-1.5">
                      {roles.map((role) => (
                        <CommandItem
                          key={role.toString()}
                          className="teamaspace-y-1 flex flex-col items-start px-4 gap-y-1 group"
                        >
                          <p>{role.name}</p>
                          <p className="text-xs group-hover:text-muted">
                            {role.description}
                          </p>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
