import PostCard from "@/components/notionPost/notionPostCard";
import {getNotionPosts} from "@/lib/notionPost";

export default async function notionPostsPage() {
  const posts = await getNotionPosts();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {posts.map((notionPost) => (
          <PostCard key={notionPost.id} notionPost={notionPost} />
        ))}
      </div>
    </div>
  );
}
