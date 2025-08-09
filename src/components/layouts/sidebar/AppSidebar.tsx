import {getTILYears} from "@/lib/github";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {YearSection} from "@/components/layouts/sidebar/TIL/YearSection";
import Link from "next/link";
import {Book, ChevronRight, Calendar} from "lucide-react";

export async function AppSidebar() {
  const years = await getTILYears();

  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>学習ログ</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible asChild className="group/collasible">
              <SidebarMenuItem>
                <div className="flex">
                  <CollapsibleTrigger asChild>
                    <button className="data-[state=open]:rotate-90">
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </button>
                  </CollapsibleTrigger>
                  <SidebarMenuButton asChild tooltip="日報">
                    <Link href={`/TIL`}>
                      <Calendar className="h-4 w-4" />
                      <span>日報</span>
                    </Link>
                  </SidebarMenuButton>
                </div>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {years.map((yearData) => (
                      <SidebarMenuSubItem key={yearData.year}>
                        <YearSection year={yearData.year} />
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <SidebarMenuItem className="ml-4">
              <SidebarMenuButton asChild tooltip="学習メモ">
                <Link href="/notions">
                  <Book className="h-4 w-4" />
                  <span>学習メモ</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
