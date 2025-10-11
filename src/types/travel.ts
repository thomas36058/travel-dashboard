export type Expense = {
  id: number;
  category: string;
  description: string;
  amount: number;
};

export type Hotel = {
  id: number;
  name: string;
  url: string;
  price: number;
};

export type Transport = {
  id: number;
  category: string;
  amount: number;
};

export type Tour = {
  id: number;
  name: string;
  amount: number;
};

export type Travel = {
  id: number;
  name: string;
  initialDate: Date;
  finalDate: Date;
  destinations: string[];
  hotels?: Hotel[];
  transports?: Transport[];
  expenses?: Expense[];
  tours?: Tour[];
  activities?: Activity[];
};

type DayActivity = {
  id: number;
  description: string;
};

export type DailyPlan = {
  date: string;
  activities?: DayActivity[];
};

export interface DailyItineraryProps {
  travel: Travel;
  onUpdate: (updated: Travel) => void;
}

export type Period = "morning" | "afternoon" | "night";

export interface Activity {
  id: number;
  description: string;
  date: string;
  period: Period;
  order: number;
}
