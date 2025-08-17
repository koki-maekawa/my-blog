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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-12">学習メモ</h1>
      <div className="flex justify-center my-6">
        <NotionsSearch />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {notionPagesInfo.map((notionPageInfo) => (
          <NotionPageInfoCard
            key={notionPageInfo.id}
            notionPageInfo={notionPageInfo}
          />
        ))}
      </div>
    </div>
  );
}
