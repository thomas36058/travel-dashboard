import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import DailyItinerary from "@/components/DailyItinerary";

import type { Hotel, Transport, Tour } from "@/types/travel";
import { useTravelsStore } from "@/stores/travels.store";

function TravelPage() {
  const { id } = useParams<{ id: string }>();

  const travel = useTravelsStore((store) =>
    store.travels.find((travel) => travel.id === id)
  );
  const updateTravel = useTravelsStore((store) => store.updateTravel);

  const [loading, setLoading] = useState(true);

  const [newHotel, setNewHotel] = useState({ name: "", url: "", price: "" });
  const [newTransport, setNewTransport] = useState({
    category: "",
    amount: "",
  });
  const [newTour, setNewTour] = useState({ name: "", amount: "" });

  useEffect(() => {
    setTimeout(() => setLoading(false), 250);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!travel)
    return <p className="text-center mt-10">Travel not found</p>;

  const travelData = {
    ...travel,
    initialDate: new Date(travel.initialDate),
    finalDate: new Date(travel.finalDate),
  };

  const handleAddHotel = () => {
    if (!newHotel.name || !newHotel.price) return;

    const hotel: Hotel = {
      id: String(Date.now()),
      name: newHotel.name,
      url: newHotel.url,
      price: Number(newHotel.price),
    };

    updateTravel({
      ...travel,
      hotels: [...(travel.hotels || []), hotel],
    });

    setNewHotel({ name: "", url: "", price: "" });
  };

  const handleDeleteHotel = (hotelId: string) => {
    updateTravel({
      ...travel,
      hotels: (travel.hotels || []).filter((hotel) => hotel.id !== hotelId),
    });
  };

  const handleAddTransport = () => {
    if (!newTransport.category || !newTransport.amount) return;

    const transport: Transport = {
      id: String(Date.now()),
      category: newTransport.category,
      amount: Number(newTransport.amount),
    };

    updateTravel({
      ...travel,
      transports: [...(travel.transports || []), transport],
    });

    setNewTransport({ category: "", amount: "" });
  };

  const handleDeleteTransport = (transportId: string) => {
    updateTravel({
      ...travel,
      transports: travel.transports.filter(
        (transport) => transport.id !== transportId
      ),
    });
  };

  const handleAddTour = () => {
    if (!newTour.name || !newTour.amount) return;

    const tour: Tour = {
      id: String(Date.now()),
      name: newTour.name,
      amount: Number(newTour.amount),
    };

    updateTravel({
      ...travel,
      tours: [...(travel.tours || []), tour],
    });

    setNewTour({ name: "", amount: "" });
  };

  const handleDeleteTour = (tourId: string) => {
    updateTravel({
      ...travel,
      tours: travel.tours.filter((tour) => tour.id !== tourId),
    });
  };

  const totalHotels = (travel.hotels || []).reduce(
    (acc, hotel) => acc + hotel.price,
    0
  );
  const totalTransports = (travel.transports || []).reduce(
    (acc, transport) => acc + transport.amount,
    0
  );
  const totalTours = (travel.tours || []).reduce(
    (acc, tour) => acc + tour.amount,
    0
  );
  const grandTotal = totalHotels + totalTransports + totalTours;

  return (
    <div className="lg:p-6 mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-2">{travel.name}</h1>
      <p className="text-gray-600 mb-4">
        {travelData.initialDate.toLocaleDateString()} →{" "}
        {travelData.finalDate.toLocaleDateString()}
      </p>

      <Separator />

      {/* HOSPEDAGENS */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Accommodations</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="Name"
                value={newHotel.name}
                onChange={(e) =>
                  setNewHotel({ ...newHotel, name: e.target.value })
                }
              />
              <Input
                placeholder="Link"
                value={newHotel.url}
                onChange={(e) =>
                  setNewHotel({ ...newHotel, url: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={newHotel.price}
                onChange={(e) =>
                  setNewHotel({ ...newHotel, price: e.target.value })
                }
              />
              <Button onClick={handleAddHotel}>Add</Button>
            </div>

            {(travel.hotels || []).length > 0 ? (
              <>
                <ul className="divide-y">
                  {travel.hotels!.map((hotel) => (
                    <li key={hotel.id} className="py-2 flex justify-between">
                      <div>
                        {hotel.url ? (
                          <a
                            href={hotel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline ml-2"
                          >
                            {hotel.name}
                          </a>
                        ) : (
                          hotel.name
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span>€ {hotel.price.toFixed(2)}</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteHotel(hotel.id)}
                        >
                          Delete
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
                No accommodations added yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* TRANSPORTE */}
        <Card>
          <CardHeader>
            <CardTitle>Transports</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="Category (car, airplane, train...)"
                value={newTransport.category}
                onChange={(e) =>
                  setNewTransport({ ...newTransport, category: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={newTransport.amount}
                onChange={(e) =>
                  setNewTransport({ ...newTransport, amount: e.target.value })
                }
              />
              <Button onClick={handleAddTransport}>Add</Button>
            </div>

            {(travel.transports || []).length > 0 ? (
              <>
                <ul className="divide-y">
                  {travel.transports!.map((t) => (
                    <li
                      key={t.id}
                      className="py-2 flex justify-between items-center"
                    >
                      <strong>{t.category}</strong>
                      <div className="flex items-center gap-3">
                        <span>€ {t.amount.toFixed(2)}</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteTransport(t.id)}
                        >
                          Delete
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
                No transports added yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* PASSEIOS */}
        <Card>
          <CardHeader>
            <CardTitle>Tours</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="Name"
                value={newTour.name}
                onChange={(e) =>
                  setNewTour({ ...newTour, name: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={newTour.amount}
                onChange={(e) =>
                  setNewTour({ ...newTour, amount: e.target.value })
                }
              />
              <Button onClick={handleAddTour}>Add</Button>
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
                          Delete
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
                No tours added yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Travel value</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-right">
            € {grandTotal.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      <DailyItinerary
        travel={travel}
        onUpdate={(updatedTravel) => {
          updateTravel(updatedTravel);
        }}
      />
    </div>
  );
}

export default TravelPage;
