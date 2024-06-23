import { Button } from "@order/ui/button";

import { DialogOrganization } from "~/components/DialogOrganization";
import { DialogRole } from "~/components/DialogRole";
import { OrganizationList } from "~/components/OrganizationList";
import { api } from "~/trpc/server";

export async function Hero() {
  return (
    <section className="flex flex-col justify-center space-x-2 space-y-2">
      <div className="flex items-center justify-center space-x-2 space-y-4">
        <h2 className="text-3xl font-black tracking-tight">Organizations</h2>
        <DialogOrganization className="" />
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 bg-accent">
        <div>
          <OrganizationList />
        </div>
        <div></div>
      </div>
    </section>
  );
}
