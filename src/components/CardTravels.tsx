import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

type Travel = {
  id: number;
  name: string;
  initialDate: Date;
  finalDate: Date;
  destinations: string[];
};

function CardTravels() {
  const [travels, setTravels] = useState<Travel[]>([]);

  useEffect(() => {
    const storedTravels = JSON.parse(localStorage.getItem("travels") || "[]");

    const parsedTravels = storedTravels.map((t: Travel) => ({
      ...t,
      initialDate: new Date(t.initialDate),
      finalDate: new Date(t.finalDate),
    }));
    setTravels(parsedTravels);
  }, []);

  return (
    <Card className="w-full mx-auto shadow-lg rounded-2xl">
      <CardHeader className="gap-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Viagens
          </CardTitle>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        <ScrollArea className="h-40 rounded-md py-2 pr-4">
          {travels.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Nenhuma viagem cadastrada ainda.
            </p>
          ) : (
            <ul className="space-y-3">
              {travels.map((travel) => (
                <li
                  key={travel.id}
                  className="p-3 border rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <Link to={`/travel/${travel.id}`}>
                    <h3 className="font-semibold">{travel.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {travel.initialDate.toLocaleDateString()} →{" "}
                      {travel.finalDate.toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      Destinos:{" "}
                      <span className="font-medium">
                        {travel.destinations.join(", ")}
                      </span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default CardTravels;
