import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import {pageNameMap, PageRoute} from "@/routes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * パンくずを生成
 * @param pathName
 * @returns
 */
export function generateBreadcrumbs(pathName: string) {
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

  return breadcrumbPaths.map((path, index) => {
    const currentPath = breadcrumbPaths[index];

    // 動的ルートと静的ルートの区別を行う
    let key = path as PageRoute;

    if (key.includes("/notions/tags/") && !pageNameMap[key]) {
      key = PageRoute.NOTIONS_TAG;
    } else if (key.includes("/notions/") && !pageNameMap[key]) {
      key = PageRoute.NOTION_DETAIL;
    }

    return {
      path: currentPath,
      label: pageNameMap[key] || currentPath.split("/").pop(),
    };
  });
}
