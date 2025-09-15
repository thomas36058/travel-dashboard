export interface CountryInfo {
  name: string;
  capital: string;
  population: string;
  currency: string;
  language: string;
  climate: string;
  bestTime: string;
  highlights: string[];
  description: string;
  image: string;
}

export const countryData: Record<string, CountryInfo> = {
  Tailândia: {
    name: "Tailândia",
    capital: "Bangkok",
    population: "69.8 milhões",
    currency: "Baht Tailandês (THB)",
    language: "Tailandês",
    climate: "Tropical quente e úmido",
    bestTime: "Novembro a Março",
    highlights: [
      "Templos Budistas",
      "Praias de Phuket",
      "Mercados Flutuantes",
      "Comida de Rua",
    ],
    description:
      "A Tailândia é conhecida por sua rica cultura, templos dourados, praias paradisíacas e culinária exótica. O país oferece uma mistura perfeita entre tradição e modernidade.",
    image: "🇹🇭",
  },
  Brasil: {
    name: "Brasil",
    capital: "Brasília",
    population: "215 milhões",
    currency: "Real (BRL)",
    language: "Português",
    climate: "Variado - Tropical a Subtropical",
    bestTime: "Maio a Setembro",
    highlights: [
      "Cristo Redentor",
      "Praias de Copacabana",
      "Amazônia",
      "Carnaval",
    ],
    description:
      "O Brasil é o maior país da América do Sul, famoso por suas praias deslumbrantes, floresta amazônica, cultura vibrante e hospitalidade do povo brasileiro.",
    image: "🇧🇷",
  },
  Japão: {
    name: "Japão",
    capital: "Tóquio",
    population: "125 milhões",
    currency: "Iene (JPY)",
    language: "Japonês",
    climate: "Temperado com quatro estações",
    bestTime: "Março a Maio, Setembro a Novembro",
    highlights: [
      "Monte Fuji",
      "Templos Kyoto",
      "Tecnologia Tokyo",
      "Cerejeiras",
    ],
    description:
      "O Japão combina tradições milenares com tecnologia de ponta, oferecendo experiências únicas desde templos zen até cidades futurísticas.",
    image: "🇯🇵",
  },
  França: {
    name: "França",
    capital: "Paris",
    population: "68 milhões",
    currency: "Euro (EUR)",
    language: "Francês",
    climate: "Temperado oceânico",
    bestTime: "Abril a Junho, Setembro a Outubro",
    highlights: ["Torre Eiffel", "Louvre", "Versalhes", "Riviera Francesa"],
    description:
      "A França é sinônimo de arte, cultura, gastronomia refinada e paisagens românticas. Dos castelos do Loire às praias da Côte d'Azur.",
    image: "🇫🇷",
  },
  EUA: {
    name: "Estados Unidos",
    capital: "Washington D.C.",
    population: "331 milhões",
    currency: "Dólar Americano (USD)",
    language: "Inglês",
    climate: "Variado por região",
    bestTime: "Varia por região",
    highlights: [
      "Estátua da Liberdade",
      "Grand Canyon",
      "Hollywood",
      "Parques Nacionais",
    ],
    description:
      "Os EUA oferecem uma diversidade impressionante, desde metrópoles vibrantes até paisagens naturais espetaculares, passando por uma cultura pop influente.",
    image: "🇺🇸",
  },
};
