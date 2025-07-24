import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {NotionPostCardProps} from "@/types/notionPost";
import Link from "next/link";
import {formatDistanceToNow} from "date-fns";
import {ja} from "date-fns/locale";
import {useMemo} from "react";

export default function NotionPostCard({notionPost}: NotionPostCardProps) {
  const formattedDate = useMemo(() => {
    return formatDistanceToNow(new Date(notionPost.updatedAt), {
      addSuffix: true,
      locale: ja,
    });
  }, [notionPost.updatedAt]);

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <Link href={`/notions/${notionPost.id}`}>
        <div className="flex">
          <div className="w-1/5 flex items-center justify-center rounded-sm m-2">
            <span className="text-5xl">{notionPost.emojiIcon}</span>
          </div>
          <div className="flex-1">
            <CardHeader className="py-4">
              <CardTitle className="line-clamp-2">{notionPost.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-1 line-clamp-2 text-sm text-gray-500">
                {notionPost.tags.map((tag) => (
                  <Badge key={`${notionPost.id}-${tag}`}>{tag}</Badge>
                ))}
              </div>
              <div className="text-right text-sm text-gray-500 ">
                <time>{formattedDate}</time>
              </div>
            </CardContent>
          </div>
        </div>
      </Link>
    </Card>
  );
}
