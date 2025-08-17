"use client";

import {NotionRenderer} from "react-notion-x";
import {NotionPageProps} from "@/types/notion";
import {Code} from "react-notion-x/build/third-party/code";
import Link from "next/link";
import Image from "next/image";

export default function NotionPage({notionPage}: NotionPageProps) {
  return (
    <NotionRenderer
      recordMap={notionPage}
      fullPage={false}
      darkMode={false}
      components={{
        Code,
        nextImage: Image,
        nextLink: Link,
      }}
      mapPageUrl={(id) => `/notions/${id}`}
    />
  );
}
