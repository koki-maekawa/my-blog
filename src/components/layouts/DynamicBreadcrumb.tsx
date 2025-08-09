"use client";
import React, {Fragment} from "react";
import {usePathname} from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {generateBreadcrumbs} from "@/lib/utils";

export function DynamicBreadcrumb() {
  const pathName = usePathname();
  const breadcrumbPaths = generateBreadcrumbs(pathName);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbPaths.map(({path, label}, index) => (
          <Fragment key={path}>
            {index !== 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index !== breadcrumbPaths.length - 1 && (
                <BreadcrumbLink href={path}>{label}</BreadcrumbLink>
              )}
              {index === breadcrumbPaths.length - 1 && (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
