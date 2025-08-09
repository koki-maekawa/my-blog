import {DayParams} from "@/types/common";
import {getTILDailyReport} from "@/lib/github";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default async function TILDayPage({params}: DayParams) {
  const {year, month, day} = await params;
  const dailyReport = await getTILDailyReport(year, month, day);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-12">日報</h1>
      <div className="max-w-3xl mx-auto bg-white border py-2">
        <article className="prose prose-lg max-w-none p-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {dailyReport}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
