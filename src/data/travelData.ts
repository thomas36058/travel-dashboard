export interface TravelMonth {
  month: string;
  countries: string[];
}

export const travelData: Record<string, string[]> = {
  janeiro: ["Tailândia", "África do Sul", "México"],
  fevereiro: ["Brasil", "Argentina", "Espanha"],
  março: ["Japão", "Marrocos", "Portugal"],
  abril: ["Itália", "Egito", "Turquia"],
  maio: ["França", "Canadá", "Peru"],
  junho: ["Indonésia", "Grécia", "Croácia"],
  julho: ["Islândia", "Noruega", "Chile"],
  agosto: ["EUA", "Alemanha", "Áustria"],
  setembro: ["China", "Índia", "Holanda"],
  outubro: ["Austrália", "Nova Zelândia", "Hungria"],
  novembro: ["Marrocos", "Egito", "Vietnã"],
  dezembro: ["Suíça", "Finlândia", "África do Sul"],
};
