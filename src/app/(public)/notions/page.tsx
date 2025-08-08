import PostCard from "@/components/notionPost/notionPostCard";
import NotionPostsSearch from "@/components/notionPost/notionPostsSearch";
import {getNotionPosts, searchNotionPosts} from "@/lib/notionPost";
import {SearchParams} from "@/types/common";

export default async function notionPostsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.search || "";
  const posts = query ? await searchNotionPosts(query) : await getNotionPosts();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-12">学習メモ</h1>
      <div className="flex justify-center my-6">
        <NotionPostsSearch />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {posts.map((notionPost) => (
          <PostCard key={notionPost.id} notionPost={notionPost} />
        ))}
      </div>
    </div>
  );
}
