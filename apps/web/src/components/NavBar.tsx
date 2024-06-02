import { Avatar, AvatarFallback, AvatarImage } from "@order/ui/avatar";
import { Button } from "@order/ui/button";

import { Logo } from "~/components/Logo";

export function NavBar() {
  return (
    <nav className="flex w-1/2 items-center justify-between px-4">
      <div>
        <Logo className="h-16 w-16" />
      </div>

      <div>
        {/* TODO: add side options as links */}
        <h3 className="text-2xl font-bold">Orders</h3>
      </div>

      <div className="flex space-x-3"></div>
    </nav>
  );
}
