import Link from "next/link";
import {YearData} from "@/types/TIL";

export default function TILYearCard({year}: YearData) {
  return (
    <Link href={`/TIL/${year}`}>
      <div className="border border-solid rounded-md shadow-md py-4 px-6 sm:px-8 md:px-12 hover:shadow-lg transition-shadow duration-200">
        <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
          {`${year}年 日報`}
        </span>
      </div>
    </Link>
  );
}
