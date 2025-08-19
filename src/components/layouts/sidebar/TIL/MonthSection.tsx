import {getTILDaysInMonth} from "@/lib/github";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {DaySection} from "@/components/layouts/sidebar/TIL/DaySection";
import {ChevronRight} from "lucide-react";
import Link from "next/link";
import {MonthData} from "@/types/TIL";

export async function MonthSection({year, month}: MonthData) {
  const days = await getTILDaysInMonth(year, month);

  return (
    <SidebarMenuItem>
      <Collapsible className="group/month-collapsible">
        <div className="flex gap-2">
          <CollapsibleTrigger asChild>
            <button className="data-[state=open]:rotate-90">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </button>
          </CollapsibleTrigger>
          <SidebarMenuButton asChild>
            <Link href={`/TIL/${year}/${month}`}>{month}月</Link>
          </SidebarMenuButton>
        </div>
        <CollapsibleContent>
          <SidebarMenuSub>
            {days.map((dayData) => (
              <DaySection
                key={dayData.name}
                year={year}
                month={month}
                day={dayData.name}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
