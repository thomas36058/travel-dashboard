import { useState } from "react";
import { Link } from "react-router-dom";
import type { Month } from "../components/FormCalendar";
import FormCalendar from "../components/FormCalendar";
import { travelData } from "../data/travelData";

function Calendar() {
  const [months, setMonths] = useState<Month[]>(
    Object.entries(travelData).map(([month, countries]) => ({
      month,
      countries: [...countries],
    }))
  );

  return (
    <div>
      <FormCalendar months={months} setMonths={setMonths} />

      <div className="grid grid-cols-4 gap-4">
        {months.map((monthData, idx) => (
          <div
            key={idx}
            className="rounded-2xl shadow-lg border border-slate-200 bg-transparent flex items-stretch"
          >
            <div className="w-full p-4 flex items-center justify-center">
              <div className="w-full aspect-square flex flex-col items-center justify-start p-4">
                <div className="w-full text-center">
                  <h2 className="text-2xl font-bold capitalize">
                    {monthData.month}
                  </h2>
                </div>

                <div className="mt-3 w-full h-full border-2 border-dashed border-slate-100 bg-white/40 p-4 space-y-3 text-lg overflow-y-auto">
                  {monthData.countries.length > 0 ? (
                    monthData.countries.map((country, countryIdx) => (
                      <Link
                        key={countryIdx}
                        to={`/country/${encodeURIComponent(country)}`}
                        className="block bg-blue-100 hover:bg-blue-200 rounded px-2 py-1 text-sm transition-colors cursor-pointer"
                      >
                        {country}
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">
                      Nenhum local adicionado
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
