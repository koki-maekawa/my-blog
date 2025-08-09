import TILYearCard from "@/components/TIL/TILYearCard";
import {getTILYears} from "@/lib/github";

export default async function TILPage() {
  const years = await getTILYears();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-12">{"日報一覧"}</h1>
      <div className="max-w-3xl mx-auto py-2 flex flex-col gap-4">
        {years.map((yearData) => (
          <TILYearCard key={yearData.year} year={yearData.year} />
        ))}
      </div>
    </div>
  );
}
