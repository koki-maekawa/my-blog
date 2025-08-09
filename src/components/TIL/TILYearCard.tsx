import Link from "next/link";

interface YearSectionProps {
  year: string;
}

export default function TILDayCard({year}: YearSectionProps) {
  return (
    <div className="border p-4">
      <Link href={`/TIL/${year}`}>{`${year}年 日報`}</Link>
    </div>
  );
}
