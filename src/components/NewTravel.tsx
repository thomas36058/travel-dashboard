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
import { useTravelsStore } from "@/stores/travels.store";

function NewTravel() {
  const addTravel = useTravelsStore((store) => store.addTravel);

  const [open, setOpen] = React.useState(false);

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
      id: crypto.randomUUID(),
      name,
      initialDate: initialDate.toISOString(),
      finalDate: finalDate.toISOString(),
      destinations,
      hotels: [],
      transports: [],
      tours: [],
      activities: [],
    };

    addTravel(newTravel);

    setName("");
    setInitialDate(new Date());
    setFinalDate(new Date());
    setDestinations([]);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              <Label>Data de Início</Label>
              <DatePicker
                value={initialDate}
                onChange={setInitialDate}
                className="w-full"
                disabledBefore={new Date()}
              />
            </div>

            <div className="grid gap-3">
              <Label>Data Final</Label>
              <DatePicker
                value={finalDate}
                onChange={setFinalDate}
                className="w-full"
                disabledBefore={initialDate}
                defaultMonth={initialDate}
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Label>Destinos</Label>
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

          <Button type="button" onClick={addNewTravel}>
            Criar viagem
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewTravel;
