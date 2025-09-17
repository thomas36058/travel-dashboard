import { useState } from "react";
import { Link } from "react-router-dom";
import { travelData } from "../data/travelData";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function getCellColor(value: string) {
  if (!value || value === "-") return "bg-white text-gray-800";

  if (
    value.includes("Inverno") ||
    value.includes("Frio") ||
    value.includes("Chuvoso")
  )
    return "bg-blue-100 text-blue-800";

  if (value.includes("Baixa temporada")) return "bg-yellow-200 text-yellow-900";

  if (value.includes("Ótimo") || value.includes("Clima confiável"))
    return "bg-orange-200 text-orange-900";

  if (value.includes("Alta temporada") || value.includes("Quente"))
    return "bg-pink-200 text-pink-900";

  if (value.includes("Natal")) return "bg-red-200 text-red-800";

  if (value.includes("Atrações fechadas")) return "bg-gray-200 text-gray-800";

  if (value.includes("Visitável") || value.includes("Bom"))
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
              <td className="border border-gray-300 p-2 font-semibold bg-slate-50 text-blue-900">
                <Link
                  to={`/country/${encodeURIComponent(country)}`}
                  className="hover:underline"
                >
                  {country}
                </Link>
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
