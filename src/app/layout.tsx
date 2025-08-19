import "./globals.css";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/layouts/sidebar/AppSidebar";
import {Separator} from "@/components/ui/separator";
import {DynamicBreadcrumb} from "@/components/layouts/DynamicBreadcrumb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <DynamicBreadcrumb />
              </div>
            </header>
            <main className="flex-1 overflow-y-auto p-8">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
