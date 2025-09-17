import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Travel = {
  id: number;
  name: string;
  initialDate: Date;
  finalDate: Date;
  destinations: string[];
};

function TravelPage() {
  const { id } = useParams();
  const [travel, setTravel] = useState<Travel | null>(null);

  useEffect(() => {
    const storedTravels = JSON.parse(localStorage.getItem("travels") || "[]");
    const found = storedTravels.find((t: Travel) => t.id === Number(id));
    if (found) {
      setTravel({
        ...found,
        initialDate: new Date(found.initialDate),
        finalDate: new Date(found.finalDate),
      });
    }
  }, [id]);

  if (!travel) {
    return <p className="text-center mt-10">Viagem não encontrada 🚫</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold">{travel.name}</h1>
      <ul>
        {travel.destinations.map((destination, index) => (
          <li key={index}>{destination}</li>
        ))}
      </ul>
    </div>
  );
}

export default TravelPage;
