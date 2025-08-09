import Link from "next/link";

interface MonthSectionProps {
  year: string;
  month: string;
}

export default function TILDayCard({year, month}: MonthSectionProps) {
  return (
    <div className="border p-4">
      <Link href={`/TIL/${year}/${month}`}>{`${year}年${month}月 日報`}</Link>
    </div>
  );
}
