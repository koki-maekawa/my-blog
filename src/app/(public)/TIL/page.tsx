import TILYearCard from "@/components/TIL/TILYearCard";
import {getTILYears} from "@/lib/github";

export default async function TILPage() {
  const years = await getTILYears();
  return (
    <div className="min-h-scren">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            年度別の学習記録一覧
          </h1>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            {years.map((yearData) => (
              <TILYearCard key={yearData.name} year={yearData.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
