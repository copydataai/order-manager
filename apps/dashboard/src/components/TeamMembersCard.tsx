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
    <Card className="bg-base-100 w-80 shadow-xl">
      <CardHeader>
        <CardTitle>Team members</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.map((user, index) => (
          <div>
            <p key={index}>
              <b>{user.firstName}</b>
            </p>
            <Select className="w-1/2">
              <SelectTrigger>
                <SelectValue placeholder={user.name} />
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
        ))}
      </CardContent>
    </Card>
  );
}
