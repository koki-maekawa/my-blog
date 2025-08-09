import {YearParams} from "@/types/common";
import {getTILMonthesInYear} from "@/lib/github";
import TILMonthCard from "@/components/TIL/TILMonthCard";

export default async function TILYearPage({params}: YearParams) {
  const {year} = await params;
  const monthes = await getTILMonthesInYear(year);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-12">{`${year}年日報一覧`}</h1>
      <div className="max-w-3xl mx-auto py-2 flex flex-col gap-4">
        {monthes.map((monthData) => (
          <TILMonthCard
            key={monthData.month}
            year={year}
            month={monthData.month}
          />
        ))}
      </div>
    </div>
  );
}
