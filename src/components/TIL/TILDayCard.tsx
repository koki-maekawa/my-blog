import Link from "next/link";

interface DaySectionProps {
  year: string;
  month: string;
  day: string;
}

export default function TILDayCard({year, month, day}: DaySectionProps) {
  return (
    <div className="border p-4">
      <Link href={`/TIL/${year}/${month}/${day}`}>
        {`${month}月${day}日 日報`}
      </Link>
    </div>
  );
}
