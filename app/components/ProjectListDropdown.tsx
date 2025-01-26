import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Briefcase, Loader, MapPin, Navigation, Share2 } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Get the most useful directions based on distance",
    href: "/projects/get-the-most-useful-directions-based-on-distance",
    icon: <Navigation className="h-4 w-4 flex-shrink-0" />,
  },
  {
    id: 2,
    title: "Hide results for out of range addresses",
    href: "/projects/hide-results-for-out-of-range-addresses",
    icon: <MapPin className="h-4 w-4 flex-shrink-0" />,
    disabled: true,
  },
  {
    id: 3,
    title: "Add loading states",
    icon: <Loader className="h-4 w-4 flex-shrink-0" />,
    disabled: true,
  },
  {
    id: 4,
    title: "Make the current route shareable",
    icon: <Share2 className="h-4 w-4 flex-shrink-0" />,
    disabled: true,
  },
];

export default function ProjectListDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Briefcase className="h-4 w-4" />
          <span className="sr-only">Open projects</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            className="flex items-center py-2"
            asChild
            disabled={project.disabled}
          >
            <Link href={project.href ?? ""}>
              <div className="mr-2 flex-shrink-0">{project.icon}</div>
              <span className="text-sm leading-tight">{project.title}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
