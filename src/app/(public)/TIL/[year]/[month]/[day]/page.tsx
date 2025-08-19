import {DayParams} from "@/types/TIL";
import {getTILDailyReport} from "@/lib/github";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default async function TILDayPage({params}: DayParams) {
  const {year, month, day} = await params;
  const dailyReport = await getTILDailyReport(year, month, day);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {`${year}年${month}月${day}日の学習記録`}
          </h1>
        </div>
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none p-8 md:p-12">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {dailyReport}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
