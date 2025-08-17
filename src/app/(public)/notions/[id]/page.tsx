import {getNotionPage, getNotionPageInfo} from "@/lib/notion";
import {Badge} from "@/components/ui/badge";
import NotionPage from "@/components/notion/notionPage";
import {IdParams} from "@/types/common";
import Link from "next/link";

export default async function PostPage({params}: IdParams) {
  const {id} = await params;
  const [notionPage, notionPageInfo] = await Promise.all([
    getNotionPage(id),
    getNotionPageInfo(id),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto py-2">
        <div className="flex flex-col items-center gap-4 my-8">
          <span className="text-5xl">{notionPageInfo.emojiIcon}</span>
          <span className="text-3xl font-bold">{notionPageInfo.title}</span>
          <div className="flex gap-1 text-sm text-gray-500">
            {notionPageInfo.tags.map((tag) => (
              <Badge key={`${id}-${tag}`}>
                <Link href={`/notions/tags/${tag}`}>{tag}</Link>
              </Badge>
            ))}
          </div>
        </div>
        <NotionPage notionPage={notionPage} />
      </div>
    </div>
  );
}
