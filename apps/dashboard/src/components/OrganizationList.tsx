"use client";

import Link from "next/link";
import { LoaderCircleLucide } from "@order/ui/loader-circle";
import { toast } from "sonner";

import { redirectAuth } from "~/actions/redirect";
import { OrganizationCard } from "~/components/OrganizationCard";
import { api } from "~/trpc/react";

export function OrganizationList() {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = api.organization.listAll.useQuery({
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoaderCircleLucide className="h-16 w-16" />
      </div>
    );
  }

  if (isError) {
    toast.error(error?.message);
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoaderCircleLucide className="h-16 w-16" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 bg-accent p-2">
      {data.map((org) => {
        return (
          <Link
            href="/organization/[id]"
            as={`/organization/${org.organizationId}`}
            key={org.organizationId}
            className="grow-0 hover:grow"
            asChild
          >
            <OrganizationCard key={org.organizationId} organization={org} />
          </Link>
        );
      })}
    </div>
  );
}
