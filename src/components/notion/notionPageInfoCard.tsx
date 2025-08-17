"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {NotionPageInfoCardProps} from "@/types/notion";
import Link from "next/link";
import {formatDistanceToNow} from "date-fns";
import {ja} from "date-fns/locale";
import {useMemo} from "react";

export default function NotionPageInfoCard({
  notionPageInfo,
}: NotionPageInfoCardProps) {
  const formattedDate = useMemo(() => {
    return formatDistanceToNow(new Date(notionPageInfo.updatedAt), {
      addSuffix: true,
      locale: ja,
    });
  }, [notionPageInfo.updatedAt]);

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden max-w-xl relative">
      <Link
        href={`/notions/${notionPageInfo.id}`}
        className="absolute inset-0"
      />
      <div className="flex">
        <div className="w-1/5 flex items-center justify-center rounded-sm m-2">
          <span className="text-5xl">{notionPageInfo.emojiIcon}</span>
        </div>
        <div className="flex-1">
          <CardHeader className="py-4">
            <CardTitle className="line-clamp-2">
              {notionPageInfo.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-1 line-clamp-2 text-sm text-gray-500">
              {notionPageInfo.tags.map((tag) => (
                <Badge key={`${notionPageInfo.id}-${tag}`}>
                  <Link href={`/notions/tags/${tag}`} className="relative z-10">
                    {tag}
                  </Link>
                </Badge>
              ))}
            </div>
            <div className="text-right text-sm text-gray-500 ">
              <time>{formattedDate}</time>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
