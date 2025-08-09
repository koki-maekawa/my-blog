import {MonthParams} from "@/types/common";
import {getTILDaysInMonth} from "@/lib/github";
import TILDayCard from "@/components/TIL/TILDayCard";

export default async function TILMonthPage({params}: MonthParams) {
  const {year, month} = await params;
  const days = await getTILDaysInMonth(year, month);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-12">{`${month}月日報一覧`}</h1>
      <div className="max-w-3xl mx-auto py-2 flex flex-col gap-4">
        {days.map((dayData) => (
          <TILDayCard
            key={dayData.tilDate}
            year={year}
            month={month}
            day={dayData.tilDate}
          />
        ))}
      </div>
    </div>
  );
}
