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
        <CardTitle>{organization.name}</CardTitle>
        <CardDescription>{organization.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{organization.contactInfo}</p>
      </CardContent>
    </Card>
  );
}
