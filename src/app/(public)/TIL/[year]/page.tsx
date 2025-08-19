import {YearParams} from "@/types/TIL";
import {getTILMonthesInYear} from "@/lib/github";
import TILMonthCard from "@/components/TIL/TILMonthCard";

export default async function TILYearPage({params}: YearParams) {
  const {year} = await params;
  const monthes = await getTILMonthesInYear(year);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {`${year}年の学習記録`}
          </h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            {monthes.map((monthData) => (
              <TILMonthCard
                key={monthData.name}
                year={year}
                month={monthData.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
