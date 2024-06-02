import { Icons } from "~/components/icons";
import { Logo } from "~/components/Logo";

export function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-4 px-4 py-4">
      {/* top */}
      <div className="flex w-full justify-between gap-4 px-4 md:w-1/2">
        <div>
          <div className="flex items-center gap-2">
            <Logo className="h-16 w-16" />
            <h3 className="text-2xl font-bold">Orders</h3>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Legal</h3>
          <p className="text-sm">privacy</p>
          <p className="text-sm">terms</p>
        </div>
      </div>

      {/* bottom */}
      <div className="flex w-full justify-between gap-4 px-4 py-4 md:w-1/2">
        <p>Copyright © 2024 Jose Sanchez</p>

        <div className="flex items-center gap-2">
          <Icons.linkedin className="h-10 w-10" />
          <Icons.gitHub className="h-8 w-8" />
        </div>
      </div>
    </footer>
  );
}
