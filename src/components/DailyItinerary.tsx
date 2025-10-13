import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GripVertical, Trash2, Sun, Sunset, Moon } from "lucide-react";
import type { Activity, DailyItineraryProps, Period } from "@/types/travel";

function generateDateRange(start: Date, end: Date): string[] {
  const dates: string[] = [];
  const current = new Date(start);

  while (current <= end) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export default function DailyItinerary({
  travel,
  onUpdate,
}: DailyItineraryProps) {
  const [activities, setActivities] = useState<Activity[]>(
    travel.activities || []
  );

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("morning");
  const [newActivity, setNewActivity] = useState("");
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const availableDates = generateDateRange(
    new Date(travel.initialDate),
    new Date(travel.finalDate)
  );

  const getPeriodIcon = (period: Period) => {
    switch (period) {
      case "morning":
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case "afternoon":
        return <Sunset className="w-4 h-4 text-orange-500" />;
      case "night":
        return <Moon className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPeriodLabel = (period: Period) => {
    switch (period) {
      case "morning":
        return "Manhã";
      case "afternoon":
        return "Tarde";
      case "night":
        return "Noite";
    }
  };

  const handleAddActivity = () => {
    if (!newActivity.trim() || !selectedDate) return;

    const maxOrder =
      activities
        .filter((a) => a.date === selectedDate && a.period === selectedPeriod)
        .reduce((max, a) => Math.max(max, a.order), -1) + 1;

    const activity: Activity = {
      id: Date.now(),
      description: newActivity,
      date: selectedDate,
      period: selectedPeriod,
      order: maxOrder,
    };

    const updated = [...activities, activity];
    setActivities(updated);
    setNewActivity("");
    onUpdate({ ...travel, activities: updated });
  };

  const handleDeleteActivity = (id: number) => {
    const updated = activities.filter((a) => a.id !== id);
    setActivities(updated);
    onUpdate({ ...travel, activities: updated });
  };

  const handleDragStart = (id: number) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === targetId) return;

    const draggedActivity = activities.find((a) => a.id === draggedItem);
    const targetActivity = activities.find((a) => a.id === targetId);

    if (
      !draggedActivity ||
      !targetActivity ||
      draggedActivity.date !== targetActivity.date ||
      draggedActivity.period !== targetActivity.period
    ) {
      return;
    }

    const updated = [...activities];
    const draggedIdx = updated.findIndex((a) => a.id === draggedItem);
    const targetIdx = updated.findIndex((a) => a.id === targetId);

    const [removed] = updated.splice(draggedIdx, 1);
    updated.splice(targetIdx, 0, removed);

    updated.forEach((activity, idx) => {
      if (
        activity.date === draggedActivity.date &&
        activity.period === draggedActivity.period
      ) {
        activity.order = idx;
      }
    });

    setActivities(updated);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    onUpdate({ ...travel, activities });
  };

  const groupedActivities = activities.reduce((acc, activity) => {
    if (!acc[activity.date]) {
      acc[activity.date] = { morning: [], afternoon: [], night: [] };
    }

    if (!acc[activity.date][activity.period])
      acc[activity.date][activity.period] = [];
    acc[activity.date][activity.period].push(activity);

    return acc;
  }, {} as Record<string, Record<Period, Activity[]>>);

  Object.values(groupedActivities).forEach((dateGroup) => {
    Object.values(dateGroup).forEach((periodActivities) => {
      periodActivities.sort((a, b) => a.order - b.order);
    });
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>🗓️ Roteiro Diário</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold mb-3">Adicionar Atividade</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar data" />
              </SelectTrigger>
              <SelectContent>
                {availableDates.map((date) => (
                  <SelectItem key={date} value={date}>
                    {new Date(date + "T12:00:00").toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedPeriod}
              onValueChange={(v) => setSelectedPeriod(v as Period)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="morning">Manhã</SelectItem>
                <SelectItem value="afternoon">Tarde</SelectItem>
                <SelectItem value="night">Noite</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Descrição da atividade"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddActivity()}
            />
          </div>
          <Button onClick={handleAddActivity} className="w-full mt-3">
            Adicionar Atividade
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Roteiro Completo</h3>

          {availableDates.map((date) => {
            const dateActivities = groupedActivities[date];
            if (!dateActivities) return null;

            return (
              <div key={date} className="border rounded-lg p-4">
                <h4 className="font-semibold text-base mb-3">
                  {new Date(date + "T12:00:00").toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </h4>

                <div className="space-y-3">
                  {(["morning", "afternoon", "night"] as Period[]).map(
                    (period) => {
                      const periodActivities = dateActivities[period] || [];
                      if (periodActivities.length === 0) return null;

                      return (
                        <div key={period} className="ml-2">
                          <div className="flex items-center gap-2 mb-2">
                            {getPeriodIcon(period)}
                            <span className="font-medium text-sm">
                              {getPeriodLabel(period)}
                            </span>
                          </div>

                          <div className="space-y-1 lg:ml-4">
                            {periodActivities.map((activity) => (
                              <div
                                key={activity.id}
                                draggable
                                onDragStart={() => handleDragStart(activity.id)}
                                onDragOver={(e) =>
                                  handleDragOver(e, activity.id)
                                }
                                onDragEnd={handleDragEnd}
                                className={`flex items-center gap-2 p-2 rounded border bg-white cursor-move hover:bg-gray-50 transition-colors ${
                                  draggedItem === activity.id
                                    ? "opacity-50"
                                    : ""
                                }`}
                              >
                                <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="flex-1 text-sm">
                                  {activity.description}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    handleDeleteActivity(activity.id)
                                  }
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}

          {activities.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Nenhuma atividade adicionada ainda. Comece criando seu roteiro!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
