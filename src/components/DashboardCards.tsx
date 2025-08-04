import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchCards, addCardAsync } from "@/store/slices/cardsSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, MoreHorizontal } from "lucide-react";
const DashboardCards: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cards, isLoading, isAddingCard, error } = useAppSelector(
    (state) => state.cards
  );
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    subtitle: "",
  });

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addCardAsync({
        ...formData,
        color: "text-foreground",
      })
    )
      .unwrap()
      .then(() => {
        setFormData({ title: "", value: "", subtitle: "" });
        setIsOpen(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading dashboard cards...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">Error: {error}</div>;
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          Dashboard Cards
        </h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Dashboard Card</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Total Clients"
                  required
                />
              </div>
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="e.g., 120"
                  required
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="e.g., New Prospects"
                  required
                />
              </div>
              <Button type="submit" className="w-full" loading={isAddingCard}>
                Add Card
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="bg-dashboard-card border-[#4b2314] rounded-lg"
          >
            <CardHeader className="flex items-center justify-between flex-row px-4 py-2">
              <CardTitle className="text-sm font-normal text-muted-foreground">
                {card.title}
              </CardTitle>
              <button
                className="p-1 rounded hover:bg-accent/50"
                aria-label="Open menu"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </CardHeader>

            <CardContent className="px-4 py-4"> 
              <div className={`text-3xl font-bold ${card.color} mb-2`}>
                {card.value}
              </div>
              <span className="inline-block bg-[#0e3426] text-[#00ca77] text-xs px-2 py-1 rounded">
                {card.subtitle}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;
