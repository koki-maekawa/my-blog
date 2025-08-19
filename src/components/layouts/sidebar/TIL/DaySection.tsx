import Link from "next/link";
import {SidebarMenuItem, SidebarMenuButton} from "@/components/ui/sidebar";
import {DayData} from "@/types/TIL";

export function DaySection({year, month, day}: DayData) {
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
