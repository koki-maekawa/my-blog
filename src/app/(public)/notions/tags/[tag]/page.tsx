import NotionPageInfoCard from "@/components/notion/notionPageInfoCard";
import {searchNotionPagesInfo} from "@/lib/notion";
import {TagParams} from "@/types/common";

export default async function notionTagPostsPage({params}: TagParams) {
  const {tag} = await params;
  const posts = await searchNotionPagesInfo(tag);
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            タグ「{tag}」の記事一覧
          </h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-6">
            {posts.map((notionPost, index) => (
              <div
                key={notionPost.id}
                className="transition-all duration-200 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <NotionPageInfoCard notionPageInfo={notionPost} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
