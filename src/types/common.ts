export type IdParams = {params: Promise<{id: string}>};

export type TagParams = {params: Promise<{tag: string}>};

export type YearParams = {params: Promise<{year: string}>};

export type MonthParams = {
  params: Promise<{
    year: string;
    month: string;
  }>;
};

export type DayParams = {
  params: Promise<{
    year: string;
    month: string;
    day: string;
  }>;
};

export type SearchParams = {search?: string};
