import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { X } from "lucide-react";

function CardWishlist() {
  const [newDestination, setNewDestination] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);

  const capitalizeDestination = (text: string) =>
    text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const handleAddDestination = () => {
    if (!newDestination.trim()) return;

    setDestinations((prev) => [
      ...prev,
      capitalizeDestination(newDestination.trim()),
    ]);
    setNewDestination("");
  };

  const handleRemoveDestination = (index: number) => {
    setDestinations((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full mx-auto shadow-lg rounded-2xl">
      <CardHeader className="gap-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Next destinations
          </CardTitle>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ex: Disneyland, Paris"
            className="flex-1"
            value={newDestination}
            onChange={(e) => setNewDestination(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddDestination()}
          />
          <Button
            className="flex items-center gap-1"
            onClick={handleAddDestination}
          >
            Add
          </Button>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        <ScrollArea className="h-40 rounded-md py-2">
          <ul className="space-y-2">
            {destinations.map((destination, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-lg bg-muted px-3 py-2"
              >
                <span>{destination}</span>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleRemoveDestination(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default CardWishlist;
