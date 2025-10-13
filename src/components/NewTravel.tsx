import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TagsInput } from "./ui/input-chips";
import { DatePicker } from "./ui/date-picker";

function NewTravel() {
  const [name, setName] = React.useState("");
  const [initialDate, setInitialDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [finalDate, setFinalDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [destinations, setDestinations] = React.useState<string[]>([]);

  const addNewTravel = () => {
    if (
      !name ||
      !initialDate ||
      !finalDate ||
      initialDate > finalDate ||
      destinations.length === 0
    )
      return;

    const newTravel = {
      id: Date.now(),
      name,
      initialDate,
      finalDate,
      destinations,
    };

    const storedTravels = JSON.parse(localStorage.getItem("travels") || "[]");
    storedTravels.push(newTravel);
    localStorage.setItem("travels", JSON.stringify(storedTravels));

    setName("");
    setInitialDate(new Date());
    setFinalDate(new Date());
    setDestinations([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nova Viagem</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar nova viagem</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Nome da viagem</Label>
            <Input
              id="name-1"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">Data de Início</Label>
              <DatePicker
                value={initialDate}
                onChange={setInitialDate}
                className="w-full"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="username-1">Data Final</Label>
              <DatePicker
                value={finalDate}
                onChange={setFinalDate}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="username-1">Destinos</Label>
            <TagsInput
              placeholder="Digite e pressione Enter"
              value={destinations}
              onValueChange={setDestinations}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" onClick={addNewTravel}>
            Criar viagem
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewTravel;
