import { useState } from "react";
import { travelData } from "../data/travelData";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getCellColor(value: string) {
  if (!value || value === "-") return "bg-white text-gray-800";

  if (
    value.includes("Winter") ||
    value.includes("Cold") ||
    value.includes("Rainy")
  )
    return "bg-blue-100 text-blue-800";

  if (value.includes("Low season")) return "bg-yellow-200 text-yellow-900";

  if (value.includes("Great") || value.includes("Reliable weather"))
    return "bg-orange-200 text-orange-900";

  if (value.includes("High season") || value.includes("Hot"))
    return "bg-pink-200 text-pink-900";

  if (value.includes("Christmas")) return "bg-red-200 text-red-800";

  if (value.includes("Closed attractions")) return "bg-gray-200 text-gray-800";

  if (value.includes("Visitable") || value.includes("Good"))
    return "bg-green-200 text-green-800";

  return "bg-white text-black";
}

function Calendar() {
  const [data] = useState(travelData);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-slate-100"></th>
            {months.map((month) => (
              <th
                key={month}
                className="border border-gray-300 p-2 text-center bg-slate-100"
              >
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([country, values]) => (
            <tr key={country}>
              <td className="border border-gray-300 p-2 font-semibold bg-slate-50 text-gray-800">
                {country}
              </td>
              {months.map((month) => {
                const value = values[month] || "-";
                const colorClass = getCellColor(value);
                return (
                  <td
                    key={month}
                    className={`border border-gray-300 p-2 text-center ${colorClass}`}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
