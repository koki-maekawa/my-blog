import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import {pageNameMap, PageRoute} from "@/routes";
import {Breadcrumb} from "@/types/common";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// パンくずリスト作成
export function generateBreadcrumbs(pathName: string): Breadcrumb[] {
  const arrPathName = pathName.split("/").filter((x) => x !== "");
  const breadcrumbPaths = [
    "/",
    ...arrPathName.map((value, index, arr) => {
      if (index === 0) {
        return `/${value}`;
      } else {
        return `/${arr.slice(0, index).join("/")}/${value}`;
      }
    }),
  ];

  const breadcrumbs = breadcrumbPaths.map((path, index) => {
    const currentPath = breadcrumbPaths[index];

    // 動的ルートと静的ルートの区別を行う
    let key = path as PageRoute;

    if (key.includes("/notions/tags/") && !pageNameMap[key]) {
      key = PageRoute.NOTIONS_TAG;
    } else if (key.includes("/notions/tags")) {
      return null;
    } else if (key.includes("/notions/") && !pageNameMap[key]) {
      key = PageRoute.NOTION_DETAIL;
    }

    return {
      path: currentPath,
      label: pageNameMap[key] || currentPath.split("/").pop(),
    };
  });

  return breadcrumbs.filter((item): item is Breadcrumb => item !== null);
}
