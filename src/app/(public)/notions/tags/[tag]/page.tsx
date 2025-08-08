import PostCard from "@/components/notionPost/notionPostCard";
import {searchNotionPosts} from "@/lib/notionPost";
import {TagParams} from "@/types/common";

export default async function notionTagPostsPage({params}: TagParams) {
  const {tag} = await params;
  const posts = await searchNotionPosts(tag);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-12">タグ：{tag}一覧</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {posts.map((notionPost) => (
          <PostCard key={notionPost.id} notionPost={notionPost} />
        ))}
      </div>
    </div>
  );
}
