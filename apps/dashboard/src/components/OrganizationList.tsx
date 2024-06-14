"use client";

import Link from "next/link";

import { redirectAuth } from "~/actions/redirect";
import { OrganizationCard } from "~/components/OrganizationCard";
import { api } from "~/trpc/react";

export function OrganizationList() {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = api.organization.listAll.useQuery();

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col items-center justify-center ">
          <p className="text-2xl font-bold ">Loading ... </p>
        </div>
      </div>
    );
  }

  if (isError) {
    console.log("hell", isError, error.shape.message);
    if (error.shape.message === "UNAUTHORIZED") {
      console.log("hell", isError);
      redirectAuth();
    }
  }

  return (
    <div className="grid w-full auto-cols-auto grid-flow-col gap-4 ">
      {data.map((org) => {
        return (
          <Link
            href="/organization/[id]"
            as={`/organization/${org.organizationId}`}
            key={org.organizationId}
            className=""
          >
            <OrganizationCard key={org.organizationId} organization={org} />
          </Link>
        );
      })}
    </div>
  );
}
