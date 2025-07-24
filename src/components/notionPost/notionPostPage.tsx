"use client";
import {NotionRenderer} from "react-notion-x";
import {NotionPostPageProps} from "@/types/notionPost";
import {Code} from "react-notion-x/build/third-party/code";
import Link from "next/link";
import Image from "next/image";

export default function NotionPostPage({notionPost}: NotionPostPageProps) {
  return (
    <NotionRenderer
      recordMap={notionPost}
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
