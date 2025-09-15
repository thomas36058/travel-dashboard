import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { countryData } from "../data/countryData";

function CountryDetail() {
  const { countryName } = useParams<{ countryName: string }>();

  if (!countryName) {
    return <div>País não encontrado</div>;
  }

  const country = countryData[countryName] || {
    name: countryName,
    capital: "N/A",
    population: "N/A",
    currency: "N/A",
    language: "N/A",
    climate: "N/A",
    bestTime: "N/A",
    highlights: ["Informações em breve..."],
    description: `Informações sobre ${countryName} serão adicionadas em breve.`,
    image: "🌍",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/calendar"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          Voltar ao Calendário
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {country.name}
        </h1>
        <p className="text-xl text-gray-600">{country.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            Informações Básicas
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Capital:</span>
              <span>{country.capital}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">População:</span>
              <span>{country.population}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Moeda:</span>
              <span>{country.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Idioma:</span>
              <span>{country.language}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            Informações de Viagem
          </h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium flex items-center gap-2 mb-1">
                Clima:
              </span>
              <span className="text-gray-700">{country.climate}</span>
            </div>
            <div>
              <span className="font-medium mb-1 block">Melhor época:</span>
              <span className="text-gray-700">{country.bestTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          Principais Atrações
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {country.highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
