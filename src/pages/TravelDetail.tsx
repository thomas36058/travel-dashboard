import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import DailyItinerary from "@/components/DailyItinerary";

type Expense = {
  id: number;
  category: string;
  description: string;
  amount: number;
};

type Hotel = {
  id: number;
  name: string;
  url: string;
  price: number;
};

type Transport = {
  id: number;
  category: string;
  amount: number;
};

type Tour = {
  id: number;
  name: string;
  amount: number;
};

type Travel = {
  id: number;
  name: string;
  initialDate: Date;
  finalDate: Date;
  destinations: string[];
  hotels?: Hotel[];
  transports?: Transport[];
  expenses?: Expense[];
  tours?: Tour[];
};

function TravelPage() {
  const { id } = useParams();
  const [travel, setTravel] = useState<Travel | null>(null);
  const [newHotel, setNewHotel] = useState({ name: "", url: "", price: "" });
  const [newTransport, setNewTransport] = useState({
    category: "",
    amount: "",
  });
  const [newTour, setNewTour] = useState({ name: "", amount: "" });
  const [newExpense, setNewExpense] = useState({
    category: "",
    description: "",
    amount: "",
  });

  useEffect(() => {
    const storedTravels = JSON.parse(localStorage.getItem("travels") || "[]");
    const foundTravel = storedTravels.find((t: Travel) => t.id === Number(id));

    if (foundTravel) {
      setTravel({
        ...foundTravel,
        initialDate: new Date(foundTravel.initialDate),
        finalDate: new Date(foundTravel.finalDate),
      });
    }
  }, [id]);

  const updateTravel = (updated: Travel) => {
    const storedTravels = JSON.parse(localStorage.getItem("travels") || "[]");
    const newTravels = storedTravels.map((t: Travel) =>
      t.id === updated.id ? updated : t
    );
    localStorage.setItem("travels", JSON.stringify(newTravels));
    setTravel(updated);
  };

  const handleAddHotel = () => {
    if (!travel || !newHotel.name || !newHotel.price) return;

    const hotel: Hotel = {
      id: Date.now(),
      name: newHotel.name,
      url: newHotel.url,
      price: Number(newHotel.price),
    };

    const updatedLodgings = [...(travel.hotels || []), hotel];
    updateTravel({ ...travel, hotels: updatedLodgings });

    setNewHotel({ name: "", url: "", price: "" });
  };

  const handleDeleteHotel = (hotelId: number) => {
    if (!travel) return;

    const updatedLodgings = (travel.hotels || []).filter(
      (hotel) => hotel.id !== hotelId
    );
    updateTravel({ ...travel, hotels: updatedLodgings });
  };

  const handleAddTransport = () => {
    if (!travel || !newTransport.category || !newTransport.amount) return;

    const transport: Transport = {
      id: Date.now(),
      category: newTransport.category,
      amount: Number(newTransport.amount),
    };

    const updatedTransports = [...(travel.transports || []), transport];
    updateTravel({ ...travel, transports: updatedTransports });

    setNewTransport({ category: "", amount: "" });
  };

  const handleDeleteTransport = (transportId: number) => {
    if (!travel) return;

    const updatedTransports = (travel.transports || []).filter(
      (t) => t.id !== transportId
    );
    updateTravel({ ...travel, transports: updatedTransports });
  };

  const handleAddExpense = () => {
    if (!travel || !newExpense.category || !newExpense.amount) return;

    const expense: Expense = {
      id: Date.now(),
      category: newExpense.category,
      description: newExpense.description,
      amount: Number(newExpense.amount),
    };

    const updatedExpenses = [...(travel.expenses || []), expense];
    updateTravel({ ...travel, expenses: updatedExpenses });

    setNewExpense({ category: "", description: "", amount: "" });
  };

  const handleDeleteExpense = (expenseId: number) => {
    if (!travel) return;

    const updatedExpenses = (travel.expenses || []).filter(
      (exp) => exp.id !== expenseId
    );
    updateTravel({ ...travel, expenses: updatedExpenses });
  };

  const handleAddTour = () => {
    if (!travel || !newTour.name || !newTour.amount) return;

    const tour: Tour = {
      id: Date.now(),
      name: newTour.name,
      amount: Number(newTour.amount),
    };

    const updatedTours = [...(travel.tours || []), tour];
    updateTravel({ ...travel, tours: updatedTours });

    setNewTour({ name: "", amount: "" });
  };

  const handleDeleteTour = (tourId: number) => {
    if (!travel) return;

    const updatedTours = (travel.tours || []).filter((t) => t.id !== tourId);
    updateTravel({ ...travel, tours: updatedTours });
  };

  if (!travel) {
    return <p className="text-center mt-10">Viagem não encontrada</p>;
  }

  const totalHotels = (travel.hotels || []).reduce(
    (acc, h) => acc + h.price,
    0
  );
  const totalTransports = (travel.transports || []).reduce(
    (acc, t) => acc + t.amount,
    0
  );
  const totalExpenses = (travel.expenses || []).reduce(
    (acc, e) => acc + e.amount,
    0
  );
  const totalTours = (travel.tours || []).reduce((acc, t) => acc + t.amount, 0);
  const grandTotal = totalHotels + totalTransports + totalExpenses + totalTours;

  return (
    <div className="p-6 mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-2">{travel.name}</h1>
      <p className="text-gray-600 mb-4">
        {travel.initialDate.toLocaleDateString()} →{" "}
        {travel.finalDate.toLocaleDateString()}
      </p>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Hospedagens</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="Nome do hotel"
                value={newHotel.name}
                onChange={(e) =>
                  setNewHotel({ ...newHotel, name: e.target.value })
                }
              />
              <Input
                placeholder="URL da hospedagem"
                value={newHotel.url}
                onChange={(e) =>
                  setNewHotel({ ...newHotel, url: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Preço total"
                value={newHotel.price}
                onChange={(e) =>
                  setNewHotel({ ...newHotel, price: e.target.value })
                }
              />
              <Button onClick={handleAddHotel}>Adicionar</Button>
            </div>

            {(travel.hotels || []).length > 0 ? (
              <>
                <ul className="divide-y">
                  {travel.hotels!.map((hotel) => (
                    <li key={hotel.id} className="py-2 flex justify-between">
                      <div>
                        {hotel.url && (
                          <a
                            href={hotel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline ml-2"
                          >
                            {hotel.name}
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span>€ {hotel.price.toFixed(2)}</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteHotel(hotel.id)}
                        >
                          Apagar
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="text-right font-semibold">
                  Total: € {totalHotels.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhuma hospedagem adicionada ainda.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transporte</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="Categoria (carro, avião, trem...)"
                value={newTransport.category}
                onChange={(e) =>
                  setNewTransport({ ...newTransport, category: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Valor total"
                value={newTransport.amount}
                onChange={(e) =>
                  setNewTransport({ ...newTransport, amount: e.target.value })
                }
              />
              <Button onClick={handleAddTransport}>Adicionar</Button>
            </div>

            {(travel.transports || []).length > 0 ? (
              <>
                <ul className="divide-y">
                  {travel.transports!.map((t) => (
                    <li
                      key={t.id}
                      className="py-2 flex justify-between items-center"
                    >
                      <span>
                        <strong>{t.category}</strong>
                      </span>
                      <div className="flex items-center gap-3">
                        <span>€ {t.amount.toFixed(2)}</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteTransport(t.id)}
                        >
                          Apagar
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="text-right font-semibold">
                  Total: € {totalTransports.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum transporte adicionado ainda.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gastos</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="Categoria"
                value={newExpense.category}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, category: e.target.value })
                }
              />
              <Input
                placeholder="Descrição"
                value={newExpense.description}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, description: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Valor"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
              />
              <Button onClick={handleAddExpense}>Adicionar</Button>
            </div>

            {(travel.expenses || []).length > 0 ? (
              <>
                <ul className="divide-y">
                  {travel.expenses!.map((exp) => (
                    <li
                      key={exp.id}
                      className="py-2 flex justify-between items-center"
                    >
                      <span>
                        <strong>{exp.category}</strong> - {exp.description}
                      </span>
                      <div className="flex items-center gap-3">
                        <span>€ {exp.amount.toFixed(2)}</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteExpense(exp.id)}
                        >
                          Apagar
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="text-right font-semibold">
                  Total: € {totalExpenses.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum gasto registrado ainda.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Passeios</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="Nome do passeio (Ex: Tour histórico, museu...)"
                value={newTour.name}
                onChange={(e) =>
                  setNewTour({ ...newTour, name: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Valor"
                value={newTour.amount}
                onChange={(e) =>
                  setNewTour({ ...newTour, amount: e.target.value })
                }
              />
              <Button onClick={handleAddTour}>Adicionar</Button>
            </div>

            {(travel.tours || []).length > 0 ? (
              <>
                <ul className="divide-y">
                  {travel.tours!.map((t) => (
                    <li
                      key={t.id}
                      className="py-2 flex justify-between items-center"
                    >
                      <span>{t.name}</span>
                      <div className="flex items-center gap-3">
                        <span>€ {t.amount.toFixed(2)}</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteTour(t.id)}
                        >
                          Apagar
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="text-right font-semibold">
                  Total: € {totalTours.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum passeio adicionado ainda.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Total Geral da Viagem</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-bold text-right">
            € {grandTotal.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <DailyItinerary travel={travel} onUpdate={updateTravel} />
    </div>
  );
}

export default TravelPage;
