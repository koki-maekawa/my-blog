import {getNotionPost, getNotionPostInfo} from "@/lib/notionPost";
import {notFound} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import NotionPostPage from "@/components/notionPost/notionPostPage";
import {IdParams} from "@/types/common";

export default async function PostPage({params}: IdParams) {
  const {id} = await params;
  const notionPost = await getNotionPost(id);
  const notionPostInfo = await getNotionPostInfo(id);

  if (!notionPostInfo) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white border py-2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl">{notionPostInfo.emojiIcon}</span>
          <span className="text-3xl font-bold">{notionPostInfo.title}</span>
          <div className="flex gap-1 text-sm text-gray-500">
            {notionPostInfo.tags.map((tag) => (
              <Badge key={`${id}-${tag}`}>{tag}</Badge>
            ))}
          </div>
        </div>
        <NotionPostPage notionPost={notionPost} />
      </div>
    </div>
  );
}
