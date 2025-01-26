import { Flag } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2">
        <Flag className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold">
          <span className="text-blue-600">Vote</span>
          <span className="text-red-600">Boston</span>
        </span>
      </div>
    </Link>
  );
}
