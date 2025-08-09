import {getTILMonthesInYear} from "@/lib/github";
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
import {MonthSection} from "@/components/layouts/sidebar/TIL/MonthSection";
import {ChevronRight} from "lucide-react";
import Link from "next/link";

interface YearSectionProps {
  year: string;
}

export async function YearSection({year}: YearSectionProps) {
  const months = await getTILMonthesInYear(year);

  return (
    <Collapsible className="group/collapsible">
      <SidebarMenuItem>
        <div className="flex gap-2">
          <CollapsibleTrigger asChild>
            <button className="data-[state=open]:rotate-90">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </button>
          </CollapsibleTrigger>
          <SidebarMenuButton asChild>
            <Link href={`/TIL/${year}`}>{year}年</Link>
          </SidebarMenuButton>
        </div>
        <CollapsibleContent>
          <SidebarMenuSub>
            {months.map((monthData) => (
              <MonthSection
                key={monthData.month}
                year={year}
                month={monthData.month}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
