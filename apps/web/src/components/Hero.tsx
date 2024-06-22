import Link from "next/link";
import { Button } from "@order/ui/button";
import { Input } from "@order/ui/input";

import { Logo } from "~/components/Logo";
import { SiteLinks } from "~/config";

export async function Hero() {
  return (
    <section className="flex h-[calc(80vh-2rem)] w-full flex-col items-center justify-center gap-2 lg:flex-row ">
      <div className="flex flex-col items-center justify-center gap-2">
        <Logo className="h-96 w-96" />
        <p className="text-2xl text-muted-foreground">Make your ideal system</p>
        <Button calassROom asChild>
          <Link href={SiteLinks.Dashboard}>Getting Started</Link>
        </Button>
      </div>
      {/* <div className="flex w-full max-w-sm flex-col items-center space-x-2 space-y-2 md:flex-row"></div> */}
    </section>
  );
}
