"use client";

import { Button } from "@order/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@order/ui/card";
import { Input } from "@order/ui/input";
import { Label } from "@order/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@order/ui/select";
import { Separator } from "@order/ui/separator";

import { api } from "~/trpc/react";

export function TeamMembersCard({ organizationId: number }) {
  const roles = api.organization.listRoles.useQuery(
    { organizationId: number },
    {
      refetchOnWindowFocus: false,
    },
  );

  const { data, isLoading, error, isError } =
    api.organization.listUserAndRolesByOrganizationId.useQuery(
      { organizationId: number },
      {
        refetchOnWindowFocus: false,
      },
    );

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Card className="bg-base-100 w-72 shadow-xl">
      <CardHeader>
        <CardTitle>Team members</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.map((user, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-between gap-4">
              <b>
                {user.userFirstName} {user.userLastName}
              </b>
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder={user.roleName} />
                </SelectTrigger>
                <SelectContent>
                  {roles.data.map((role, roleIndex) => (
                    <SelectItem key={roleIndex} value={role.roleId}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Separator />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
