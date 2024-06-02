import Link from "next/link";
import { Copyright, Github, Linkedin } from "lucide-react";

import { Logo } from "~/components/Logo";
import { SocialLinks } from "~/config";

export function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-4 px-4 py-6">
      {/* top */}
      <div className="flex w-full justify-between gap-4 px-4 md:w-1/2">
        <div>
          <Link href="/">
            <div className="flex items-center gap-2">
              <Logo className="h-16 w-16" />
              <h3 className="text-2xl font-bold">Orders</h3>
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Legal</h3>
          <p className="text-sm">privacy</p>
          <p className="text-sm">terms</p>
        </div>
      </div>

      {/* bottom */}
      <div className="flex w-full justify-between gap-4 px-4 md:w-1/2">
        <p className="inline-flex items-center gap-1 px-4 text-sm">
          Jose Sanchez
          <Copyright size="18" />
          2024
        </p>

        <div className="flex items-center gap-2">
          <Link href={SocialLinks.Linkedin}>
            <Linkedin />
          </Link>
          <Link href={SocialLinks.Github}>
            <Github />
          </Link>
        </div>
      </div>
    </footer>
  );
}
