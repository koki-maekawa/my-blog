// rootParams
export type YearParams = {
  params: Promise<{year: string}>;
};

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

// API
export type YearData = {
  year: string;
};

export type MonthData = {
  year: string;
  month: string;
};

export type DayData = {
  year: string;
  month: string;
  day: string;
};
