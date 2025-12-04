import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GripVertical, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [draggedItem, setDraggedItem] = useState<{
    id: string;
    period: Period;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDate, setActiveDate] = useState<string>("");

  const availableDates = generateDateRange(
    new Date(travel.initialDate),
    new Date(travel.finalDate)
  );

  const getPeriodLabel = (period: Period) => {
    switch (period) {
      case "morning":
        return "Morning";
      case "afternoon":
        return "Afternoon";
      case "night":
        return "Night";
    }
  };

  const handleAddActivity = () => {
    if (!newActivity.trim() || !selectedDate) return;

    const maxOrder =
      activities
        .filter((a) => a.date === selectedDate && a.period === selectedPeriod)
        .reduce((max, a) => Math.max(max, a.order), -1) + 1;

    const activity: Activity = {
      id: String(Date.now()),
      description: newActivity,
      date: selectedDate,
      period: selectedPeriod,
      order: maxOrder,
    };

    const updated = [...activities, activity];
    setActivities(updated);
    setNewActivity("");
    setIsDialogOpen(false);

    onUpdate({ ...travel, activities: updated });
  };

  const handleDeleteActivity = (id: string) => {
    const updated = activities.filter((a) => a.id !== id);
    setActivities(updated);
    onUpdate({ ...travel, activities: updated });
  };

  const handleDragStart = (id: string, period: Period) => {
    setDraggedItem({ id, period });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetPeriod: Period, date: string) => {
    if (!draggedItem) return;

    const draggedActivity = activities.find((a) => a.id === draggedItem.id);
    if (!draggedActivity || draggedActivity.date !== date) {
      setDraggedItem(null);
      return;
    }

    if (draggedItem.period === targetPeriod) {
      setDraggedItem(null);
      return;
    }

    const targetPeriodActivities = activities.filter(
      (a) => a.date === date && a.period === targetPeriod
    );
    const maxOrder = targetPeriodActivities.reduce(
      (max, a) => Math.max(max, a.order),
      -1
    );

    const updated = activities.map((a) =>
      a.id === draggedItem.id
        ? { ...a, period: targetPeriod, order: maxOrder + 1 }
        : a
    );

    setActivities(updated);
    setDraggedItem(null);
    onUpdate({ ...travel, activities: updated });
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
        <CardTitle>🗓️ Daily Itinerary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          {availableDates.map((date) => {
            const dateActivities = groupedActivities[date] || {
              morning: [],
              afternoon: [],
              night: [],
            };

            return (
              <div key={date} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-base">
                    {new Date(date + "T12:00:00").toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </h4>

                  <Dialog
                    open={isDialogOpen && activeDate === date}
                    onOpenChange={(open) => {
                      setIsDialogOpen(open);
                      if (open) {
                        setActiveDate(date);
                        setSelectedDate(date);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add new
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add new activity</DialogTitle>
                        <DialogDescription>
                          Add new activity to{" "}
                          {new Date(date + "T12:00:00").toLocaleDateString(
                            "pt-BR"
                          )}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Period</label>
                          <Select
                            value={selectedPeriod}
                            onValueChange={(v) =>
                              setSelectedPeriod(v as Period)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Morning</SelectItem>
                              <SelectItem value="afternoon">Afternoon</SelectItem>
                              <SelectItem value="night">Night</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Activity
                          </label>
                          <Input
                            placeholder="Description"
                            value={newActivity}
                            onChange={(e) => setNewActivity(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleAddActivity()
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddActivity}>Add</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(["morning", "afternoon", "night"] as Period[]).map(
                    (period) => {
                      const periodActivities = dateActivities[period] || [];

                      return (
                        <div
                          key={period}
                          className="flex flex-col"
                          onDragOver={handleDragOver}
                          onDrop={() => handleDrop(period, date)}
                        >
                          <Card className="flex-1 shadow-sm border-t-4 border-t-gray-600">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm font-semibold text-slate-700">
                                {getPeriodLabel(period)}
                                <span className="ml-2 text-xs font-normal text-slate-500">
                                  ({periodActivities.length})
                                </span>
                              </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-2 min-h-[200px]">
                              {periodActivities.map((activity) => (
                                <Card
                                  key={activity.id}
                                  draggable
                                  onDragStart={() =>
                                    handleDragStart(activity.id, period)
                                  }
                                  className="cursor-move hover:shadow-md transition-shadow bg-white"
                                >
                                  <CardContent className="p-3">
                                    <div className="flex items-start justify-between gap-2">
                                      <GripVertical className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                      <span className="flex-1 text-sm break-words">
                                        {activity.description}
                                      </span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0 flex-shrink-0"
                                        onClick={() =>
                                          handleDeleteActivity(activity.id)
                                        }
                                      >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}

                              {periodActivities.length === 0 && (
                                <div className="text-center py-8 text-slate-400">
                                  <p className="text-xs">No activity</p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}