import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NewTravel from "./NewTravel";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchTravels, removeTravel } from "@/slices/travelsSlice";
import { useEffect } from "react";

function CardTravels() {
  const travels = useSelector((state: RootState) => state.travels);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteTravel = (id: string) => {
    if (confirm("Tem certeza que deseja apagar esta viagem?")) {
      dispatch(removeTravel(id));
    }
  };

  useEffect(() => {
    dispatch(fetchTravels());
  }, [dispatch]);

  return (
    <Card className="w-full mx-auto shadow-lg rounded-2xl">
      <CardHeader className="gap-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Viagens
          </CardTitle>

          <NewTravel />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        <ScrollArea className="rounded-md py-2">
          {travels.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Nenhuma viagem cadastrada ainda.
            </p>
          ) : (
            <ul className="space-y-3">
              {travels.map((travel) => (
                <li
                  key={travel.id}
                  className="p-3 border rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-center"
                >
                  <Link
                    to={`/travel/${travel.id}`}
                    className="flex-1 min-w-0 pr-4"
                  >
                    <h3 className="font-semibold truncate">{travel.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(travel.initialDate).toLocaleDateString()}→{" "}
                      {new Date(travel.finalDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm truncate">
                      Destinos:{" "}
                      <span className="font-medium">
                        {travel.destinations.join(", ")}
                      </span>
                    </p>
                  </Link>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteTravel(travel.id)}
                  >
                    Apagar
                  </Button>
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
