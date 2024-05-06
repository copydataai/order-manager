import { Button } from "@order/ui/button";
import { Input } from "@order/ui/input";

import { Logo } from "~/components/Logo";

export function Hero() {
  return (
    <section className="flex h-[calc(80vh-2rem)] w-full flex-col items-center justify-center gap-2 lg:flex-row ">
      <div className="flex flex-col  items-center justify-center gap-2">
        <Logo className="h-96 w-96" />
        <p className="text-2xl text-muted-foreground">Make your ideal system</p>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit">Join!</Button>
      </div>
    </section>
  );
}
