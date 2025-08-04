import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchServices, addServiceAsync } from "@/store/slices/servicesSlice";
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
import { Plus, ChevronDown } from "lucide-react";

const TopServices = () => {
  const dispatch = useAppDispatch();
  const { services, isLoading, isAddingService, error } = useAppSelector(
    (state) => state.services
  );
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    formsSubmitted: 0,
    progress: 0,
  });

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addServiceAsync({
        ...formData,
        color: "bg-orange-500",
      })
    ).then(() => {
      setFormData({ name: "", formsSubmitted: 0, progress: 0 });
      setIsOpen(false);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "progress" ? parseInt(value) || 0 : value,
    }));
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">Error: {error}</div>;
  }

  return (
    <Card className="bg-[#1c1c1c] border-gray-800 mb-8">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-white">
          Top Services
        </CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Form Interaction</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Add New Service
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Service Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Website Development"
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="progress" className="text-gray-300">
                    Progress (%)
                  </Label>
                  <Input
                    id="progress"
                    name="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={handleInputChange}
                    placeholder="e.g., 85"
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="formsSubmitted" className="text-gray-300">
                    Forms Submitted
                  </Label>
                  <Input
                    id="formsSubmitted"
                    name="formsSubmitted"
                    type="number"
                    min="0"
                    value={formData.formsSubmitted}
                    onChange={handleInputChange}
                    placeholder="e.g., 100"
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={isAddingService}
                >
                  {isAddingService ? "Adding..." : "Add Service"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        {services.map((service, index) => (
          <div key={service.id} className="space-y-3">
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-gray-400 font-medium text-sm">
                  #{index + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="text-white font-medium text-sm mb-1">
                    {service.name}
                  </h4>
                  <p className="text-gray-400 text-xs">
                    {service.formsSubmitted} Form Submitted
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-8">
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${service.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopServices;
