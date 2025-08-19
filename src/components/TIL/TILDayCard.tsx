import Link from "next/link";
import {DayData} from "@/types/TIL";

export default function TILDayCard({year, month, day}: DayData) {
  return (
    <Link href={`/TIL/${year}/${month}/${day}`}>
      <div className="border border-solid rounded-md shadow-md py-4 px-6 sm:px-12 hover:shadow-lg transition-shadow duration-200">
        <span className="font-bold text-sm sm:text-base md:text-lg">
          {`${month}月${day}日 日報`}
        </span>
      </div>
    </Link>
  );
}
