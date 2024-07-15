import { cn } from "@order/ui";
import { LoaderCircle } from "lucide-react";

export function LoaderCircleLucide({ className }) {
  return <LoaderCircle className={cn("animate-spin", className)} />;
}
