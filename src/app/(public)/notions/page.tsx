import NotionPageInfoCard from "@/components/notion/notionPageInfoCard";
import NotionsSearch from "@/components/notion/notionsSearch";
import {getNotionPagesInfo, searchNotionPagesInfo} from "@/lib/notion";
import {SearchParams} from "@/types/common";

export default async function notionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.search || "";
  const notionPagesInfo = query
    ? await searchNotionPagesInfo(query)
    : await getNotionPagesInfo();
  return (
    <div className="min-h-scren">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            学習メモ
          </h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-12">
            <NotionsSearch />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-6">
            {notionPagesInfo.map((notionPageInfo) => (
              <NotionPageInfoCard
                key={notionPageInfo.id}
                notionPageInfo={notionPageInfo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
