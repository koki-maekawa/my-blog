import Link from "next/link";
import {getNotionPagesInfo} from "@/lib/notion";
import {
  getTILYears,
  getTILMonthesInYear,
  getTILDaysInMonth,
} from "@/lib/github";
import NotionPageInfoCard from "@/components/notion/notionPageInfoCard";
import TILDayCard from "@/components/TIL/TILDayCard";
import {Book, Calendar, ArrowRight} from "lucide-react";

export default async function Home() {
  const [notionPages, tilYears] = await Promise.all([
    getNotionPagesInfo(),
    getTILYears(),
  ]);
  const tilMonthes = await getTILMonthesInYear(tilYears[0].name);

  const latestTilDays = (
    await getTILDaysInMonth(tilYears[0].name, tilMonthes[0].name)
  )
    .reverse()
    .slice(0, 4);
  const latestNotions = notionPages.slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to MaeBlog
          </h1>
        </div>

        <div className="max-w-7xl mx-auto">
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Book className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  最新の学習メモ
                </h2>
              </div>
              <Link
                href="/notions"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                すべて見る
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {latestNotions.map((notion, index) => (
                <div
                  key={notion.id}
                  className="transition-all duration-200 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <NotionPageInfoCard notionPageInfo={notion} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  最新の日報
                </h2>
              </div>
              <Link
                href="/TIL"
                className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors"
              >
                すべて見る
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {latestTilDays.map((dayData) => (
                <TILDayCard
                  key={dayData.name}
                  year={tilYears[0].name}
                  month={tilMonthes[0].name}
                  day={dayData.name}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
