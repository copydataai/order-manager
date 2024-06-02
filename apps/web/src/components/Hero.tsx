import { Button } from "@order/ui/button";
import { Input } from "@order/ui/input";

import { Logo } from "~/components/Logo";
import { WaitlistForm } from "~/components/Waitlist";

export async function Hero() {
  return (
    <section className="flex h-[calc(80vh-2rem)] w-full flex-col items-center justify-center gap-2 lg:flex-row ">
      <div className="flex flex-col items-center justify-center gap-2">
        <Logo className="h-96 w-96" />
        <p className="text-2xl text-muted-foreground">Make your ideal system</p>
      </div>
      <div className="flex w-full max-w-sm flex-col items-center space-x-2 space-y-2 md:flex-row">
        <WaitlistForm />
      </div>
    </section>
  );
}
