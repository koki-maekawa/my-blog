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
  console.log(resolvedSearchParams);
  const query = resolvedSearchParams.search || "";
  console.log(query);
  const posts = query ? await searchNotionPosts(query) : await getNotionPosts();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full">
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
