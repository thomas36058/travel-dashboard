import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import DailyItinerary from "@/components/DailyItinerary";
import type { Hotel, Travel } from "@/types/travel";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

function TravelPage() {
  const { id } = useParams<{ id: string }>();
  const [travel, setTravel] = useState<Travel | null>(null);
  const [loading, setLoading] = useState(true);

  const [newHotel, setNewHotel] = useState({ name: "", url: "", price: "" });
  const [newTransport, setNewTransport] = useState({
    category: "",
    amount: "",
  });
  const [newTour, setNewTour] = useState({ name: "", amount: "" });

  useEffect(() => {
    const fetchTravel = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "travels", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Omit<Travel, "id">;
          setTravel({ id: docSnap.id, ...data });
        } else {
          setTravel(null);
        }
      } catch (error) {
        console.error("Erro ao buscar viagem:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravel();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!travel)
    return <p className="text-center mt-10">Viagem não encontrada</p>;

  const travelData = {
    ...travel,
    initialDate: new Date(travel.initialDate),
    finalDate: new Date(travel.finalDate),
  };

  const handleAddHotel = async () => {
    if (!newHotel.name || !newHotel.price) return;

    const hotel: Hotel = {
      id: String(Date.now()),
      name: newHotel.name,
      url: newHotel.url,
      price: Number(newHotel.price),
    };

    if (!travel) return;

    const updated = {
      ...travel,
      hotels: [...(travel.hotels || []), hotel],
    };
    setTravel(updated);

    try {
      const travelRef = doc(db, "travels", travel.id);
      await updateDoc(travelRef, {
        hotels: updated.hotels,
      });

      setNewHotel({ name: "", url: "", price: "" });
    } catch (error) {
      console.error("Erro ao adicionar hotel:", error);
    }
  };

  const handleDeleteHotel = async (hotelId: string) => {
    if (!travel) return;

    const updated = {
      ...travel,
      hotels: (travel.hotels || []).filter((h) => h.id !== hotelId),
    };

    setTravel(updated);

    try {
      const travelRef = doc(db, "travels", travel.id);
      await updateDoc(travelRef, { hotels: updated.hotels });
    } catch (error) {
      console.error("Erro ao apagar hotel:", error);
    }
  };

  const handleAddTransport = async () => {
    if (!newTransport.category || !newTransport.amount) return;

    const transport = {
      id: String(Date.now()),
      category: newTransport.category,
      amount: Number(newTransport.amount),
    };

    const updated = {
      ...travel,
      transports: [...(travel.transports || []), transport],
    };
    setTravel(updated);

    try {
      const travelRef = doc(db, "travels", travel.id);
      await updateDoc(travelRef, {
        transports: updated.transports,
      });

      setNewTransport({ category: "", amount: "" });
    } catch (error) {
      console.error("Erro ao adicionar transporte:", error);
    }
  };

  const handleDeleteTransport = async (transportId: string) => {
    const updated = {
      ...travel,
      transports: travel.transports.filter((h) => h.id !== transportId),
    };

    setTravel(updated);

    try {
      const travelRef = doc(db, "travels", travel.id);
      await updateDoc(travelRef, { hotels: updated.transports });
    } catch (error) {
      console.error("Erro ao apagar hotel:", error);
    }
  };

  const handleAddTour = async () => {
    if (!newTour.name || !newTour.amount) return;

    const tour = {
      id: String(Date.now()),
      name: newTour.name,
      amount: Number(newTour.amount),
    };

    const updated = {
      ...travel,
      tours: [...(travel.tours || []), tour],
    };
    setTravel(updated);

    try {
      const travelRef = doc(db, "travels", travel.id);
      await updateDoc(travelRef, {
        tours: updated.tours,
      });

      setNewTour({ name: "", amount: "" });
    } catch (error) {
      console.error("Erro ao adicionar tour:", error);
    }
  };

  const handleDeleteTour = async (tourId: string) => {
    const updated = {
      ...travel,
      tours: travel.tours.filter((h) => h.id !== tourId),
    };

    setTravel(updated);

    try {
      const travelRef = doc(db, "travels", travel.id);
      await updateDoc(travelRef, { hotels: updated.tours });
    } catch (error) {
      console.error("Erro ao apagar hotel:", error);
    }
  };

  const totalHotels = (travel.hotels || []).reduce(
    (acc, h) => acc + h.price,
    0
  );
  const totalTransports = (travel.transports || []).reduce(
    (acc, t) => acc + t.amount,
    0
  );
  const totalTours = (travel.tours || []).reduce((acc, t) => acc + t.amount, 0);
  const grandTotal = totalHotels + totalTransports + totalTours;

  return (
    <div className="lg:p-6 mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-2">{travel.name}</h1>
      <p className="text-gray-600 mb-4">
        {travelData.initialDate.toLocaleDateString()} →{" "}
        {travelData.finalDate.toLocaleDateString()}
      </p>

      <Separator />

      <div className="grid lg:grid-cols-2 gap-4">
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

      <DailyItinerary
        travel={travel}
        onUpdate={async (updatedTravel) => {
          setTravel(updatedTravel);
          await updateDoc(doc(db, "travels", travel.id), {
            activities: updatedTravel.activities,
          });
        }}
      />
    </div>
  );
}

export default TravelPage;
