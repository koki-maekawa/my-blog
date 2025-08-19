// src/app/(public)/TIL/[year]/[month]/page.tsx
import {MonthParams} from "@/types/TIL";
import {getTILDaysInMonth} from "@/lib/github";
import TILDayCard from "@/components/TIL/TILDayCard";

export default async function TILMonthPage({params}: MonthParams) {
  const {year, month} = await params;
  const days = await getTILDaysInMonth(year, month);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {`${year}年${month}月の学習記録`}
          </h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            {days.map((dayData) => (
              <TILDayCard
                key={dayData.name}
                year={year}
                month={month}
                day={dayData.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
