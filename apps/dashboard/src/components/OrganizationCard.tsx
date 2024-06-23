"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@order/ui/card";

export function OrganizationCard(props: {
  // TODO: add RouterOutputs
  organization: any;
}) {
  const { organization } = props;
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{organization.organizationName}</CardTitle>
        <CardDescription>{organization.organizationLocation}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{organization.organizationContactInfo}</p>
      </CardContent>
    </Card>
  );
}
