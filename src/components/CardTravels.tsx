import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NewTravel from "./NewTravel";
import { useTravelsStore } from "@/stores/travels.store";

function CardTravels() {
  const travels = useTravelsStore((state) => state.travels);
  const removeTravel = useTravelsStore((state) => state.removeTravel);

  const handleDeleteTravel = (id: string) => {
    if (confirm("Are you sure you want to cancel the trip?")) {
      removeTravel(id);
    }
  };

  return (
    <Card className="w-full mx-auto shadow-lg rounded-2xl">
      <CardHeader className="gap-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Travels
          </CardTitle>

          <NewTravel />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        <ScrollArea className="rounded-md py-2">
          {travels.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No trips registered yet.
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
                      {new Date(travel.initialDate).toLocaleDateString()} →{" "}
                      {new Date(travel.finalDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm truncate">
                      Destinations:{" "}
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
                    Delete
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
