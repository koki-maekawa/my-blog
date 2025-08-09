import Link from "next/link";
import {SidebarMenuItem, SidebarMenuButton} from "@/components/ui/sidebar";

interface DaySectionProps {
  year: string;
  month: string;
  day: string;
}

export function DaySection({year, month, day}: DaySectionProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={`/TIL/${year}/${month}/${day}`}>
          <span>{`${day}日`}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
