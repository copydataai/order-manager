import { OrganizationCard } from "~/components/OrganizationCard";

export function OrganizationList(props: { organizations: any[] }) {
  console.log(props.organizations.length);
  if (props.organizations.length === 0) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col items-center justify-center ">
          <p className="text-2xl font-bold ">No organizations yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-full auto-cols-auto grid-flow-col gap-4 ">
      {props.organizations.map((org) => {
        return <OrganizationCard key={org.id} organization={org} />;
      })}
    </div>
  );
}
