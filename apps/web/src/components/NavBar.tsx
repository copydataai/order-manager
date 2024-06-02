import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@order/ui/avatar";
import { Button } from "@order/ui/button";

import { Logo } from "~/components/Logo";

export function NavBar() {
  return (
    <nav className="flex w-1/2 items-center justify-between px-4">
      <div>
        <Link href="/">
          <Logo className="h-16 w-16" />
        </Link>
      </div>

      <div>
        <Link href="/">
          <h3 className="text-2xl font-bold">Orders</h3>
        </Link>
      </div>

      <div className="flex space-x-3"></div>
    </nav>
  );
}
