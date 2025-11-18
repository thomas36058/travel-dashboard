export type Expense = {
  id: string;
  category: string;
  description: string;
  amount: number;
};

export type Hotel = {
  id: string;
  name: string;
  url: string;
  price: number;
};

export type Transport = {
  id: string;
  category: string;
  amount: number;
};

export type Tour = {
  id: string;
  name: string;
  amount: number;
};

export interface Activity {
  id: string;
  description: string;
  date: string;
  period: Period;
  order: number;
}

export type Period = "morning" | "afternoon" | "night";

type DayActivity = {
  id: string;
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

export type Travel = {
  id: string;
  name: string;
  initialDate: string;
  finalDate: string;
  destinations: string[];
  hotels: Hotel[];
  transports: Transport[];
  tours: Tour[];
  activities: Activity[];
};
