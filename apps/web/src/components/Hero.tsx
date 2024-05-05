import { Logo } from "~/components/Logo";
import { Input } from "@order/ui/input";
import { Button } from "@order/ui/button";

export function Hero() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center w-full h-[calc(80vh-2rem)] gap-2 ">
      <div className="flex flex-col  items-center justify-center gap-2">
        <Logo className="w-96 h-96" />
        <p className="text-2xl text-muted-foreground">Make your ideal system</p>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit">Join!</Button>
      </div>
    </section>
  );
}
