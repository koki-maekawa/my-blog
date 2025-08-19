import Link from "next/link";
import {MonthData} from "@/types/TIL";

export default function TILMonthCard({year, month}: MonthData) {
  return (
    <Link href={`/TIL/${year}/${month}`}>
      <div className="border border-solid rounded-md shadow-md py-4 px-6 sm:px-12 hover:shadow-lg transition-shadow duration-200">
        <span className="font-bold text-sm sm:text-base md:text-lg">
          {`${year}年${month}月 日報`}
        </span>
      </div>
    </Link>
  );
}
