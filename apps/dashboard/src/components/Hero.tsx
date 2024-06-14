import { Button } from "@order/ui/button";

import { DialogOrganization } from "~/components/DialogOrganization";
import { DialogRole } from "~/components/DialogRole";
import { OrganizationList } from "~/components/OrganizationList";
import { api } from "~/trpc/server";

export async function Hero() {
  return (
    <section className="grip-2 flex justify-center space-x-2">
      <h2 className="text-3xl font-black">Organizations</h2>
      <DialogOrganization className="" />
      <DialogRole />
      <div className="flex w-1/2 flex-col items-center space-y-4 bg-[#F5F5F5]">
        <div className="">
          <OrganizationList />
        </div>
        <div></div>
      </div>
    </section>
  );
}
