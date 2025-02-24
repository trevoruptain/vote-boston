"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Loader,
  MapPin,
  Navigation,
  ScanEye,
  Share2,
  SquareTerminal,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const projects = [
  {
    id: 1,
    title: "1. Auto-focus the address input on page load",
    href: "/projects/auto-focus-the-address-input-on-page-load",
    icon: <ScanEye className="h-4 w-4 flex-shrink-0" />,
    difficulty: "easy",
  },
  {
    id: 2,
    title: "2. Get the most useful directions based on distance",
    href: "/projects/get-the-most-useful-directions-based-on-distance",
    icon: <Navigation className="h-4 w-4 flex-shrink-0" />,
    difficulty: "easy",
  },
  {
    id: 3,
    title: "3. Hide results for out of range addresses",
    href: "/projects/hide-results-for-out-of-range-addresses",
    icon: <MapPin className="h-4 w-4 flex-shrink-0" />,
    difficulty: "medium",
  },
  {
    id: 4,
    title: "4. Add loading states",
    href: "/projects/add-loading-states",
    icon: <Loader className="h-4 w-4 flex-shrink-0" />,
    difficulty: "medium",
  },
  {
    id: 5,
    title: "5. Make the current route shareable",
    href: "/projects/make-the-current-route-shareable",
    icon: <Share2 className="h-4 w-4 flex-shrink-0" />,
    difficulty: "expert",
  },
];

export default function ProjectListDropdown() {
  const currentPath = usePathname();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-orange-500";
      case "expert":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <SquareTerminal className="h-4 w-4" />
          <span className="sr-only">Open projects</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Open Tickets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            className={`flex items-center py-2 ${
              currentPath === project.href ? "bg-gray-100" : ""
            }`}
            asChild
          >
            <Link href={project.href ?? ""}>
              <div className="mr-2 flex flex-shrink-0 items-center">
                <div
                  className={`p-1.5 rounded-md ${getDifficultyColor(
                    project.difficulty
                  )}`}
                >
                  <div className="text-white">{project.icon}</div>
                </div>
              </div>
              <span className="text-sm leading-tight">{project.title}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
