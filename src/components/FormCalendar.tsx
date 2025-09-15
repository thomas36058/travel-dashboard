import { useState } from "react";

export interface Month {
  month: string;
  countries: string[];
}

interface FormCalendarProps {
  months: Month[];
  setMonths: React.Dispatch<React.SetStateAction<Month[]>>;
}

export default function FormCalendar({ months, setMonths }: FormCalendarProps) {
  const [place, setPlace] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("janeiro");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!place) return;

    setMonths((prev) =>
      prev.map((m) =>
        m.month === selectedMonth
          ? { ...m, countries: [...m.countries, place] }
          : m
      )
    );

    setPlace("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center mb-6">
      <input
        type="text"
        placeholder="Digite um local"
        className="border rounded-lg p-2 w-64"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />

      <select
        className="border rounded-lg p-2"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {months.map((m) => (
          <option key={m.month} value={m.month}>
            {m.month}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Adicionar
      </button>
    </form>
  );
}
