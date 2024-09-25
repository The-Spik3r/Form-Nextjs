"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  MessageSquareIcon,
} from "lucide-react";
import { log } from "console";

export default function MeetingForm() {
  const [formData, setFormData] = useState({
    clientId: "",
    name: "",
    location: "",
    reminderDate: "",
    reminderTime: "",
    notes: "",
    intentions: "",
  });
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async (clientString: string = "") => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://hook.us1.make.com/fr7dbps2gmf55ekv8myomklbekczobx6"
        );
        const data = await response.json();
        console.log("json obtenido", data);
        const nombres = data.map(
          (cliente: { Nombre: string /* , ID : string*/ }) =>
            cliente.Nombre /* && cliente.ID */
        ); // Especificamos el tipo de cliente
        setClients(nombres);
        console.log(nombres, "nombres");
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClients();
  }, [1]);

  console.log(clients, "clientes");
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    try {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } catch (error) {
      alert(
        "Hubo un error al seleccionar el cliente. Intenta de nuevo." + error
      );
    } finally {
      console.log("seleccionado", value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare the data for the POST request
      const data = {
        ...formData, // Spread operator to include all form data
      };

      // Send the POST request
      const response = await fetch(
        "https://hook.us1.make.com/ues9f9nbu74syxhp42lssjvulad2frtt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
          body: JSON.stringify(data), // Convert form data to JSON string
        }
      );

      // Check for successful response
      if (response.ok) {
        console.log("Form data submitted:", formData);
        alert("Reunión programada con éxito!");
        setFormData({
          clientId: "",
          name: "",
          location: "",
          reminderDate: "",
          reminderTime: "",
          notes: "",
          intentions: "",
        });
      } else {
        // Handle errors
        const errorData = await response.json();
        console.error("Error submitting form:", errorData);
        alert("Hubo un error al programar la reunión. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al programar la reunión. Intenta de nuevo.");
    }
  };
  const intencion = [
    "Estrategia",
    "Soporte",
    "Cierre de venta",
    "Resolutiva",
    "Orientativa",
  ];
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LinkedIn%20cover%20-%201-dqOfepCVMoQreoWnBB7WQZtT31i0uj.jpg"
            alt="0800 WEB"
            className="mb-8 w-full rounded-lg shadow-md"
          />
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Programa tu Reunión
          </h2>
          <p className="text-center text-purple-600 mb-8">
            Productos con impacto.
          </p>
        </div>
      </div>
      <div className="md:w-1/2 p-8 bg-white shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="clientId"
              className="text-sm font-medium text-gray-700"
            >
              Cliente
            </Label>
            <Select
              name="clientId"
              onValueChange={(value) => handleSelectChange("clientId", value)}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full bg-blue-50 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue
                  placeholder={
                    isLoading ? "Cargando clientes..." : "Selecciona un cliente"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client: { Nombre: string; ID: string }) => (
                  <SelectItem key={client.ID} value={client.ID}>
                    {client.Nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nombre de la Reunión
            </Label>
            <div className="relative">
              <UserIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                size={18}
              />
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 bg-blue-50 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Nombre de la reunión"
                required
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="intentions"
              className="text-sm font-medium text-gray-700"
            >
              Intencion de la reunión
            </Label>
            <Select
              name="intencion"
              onValueChange={(value) => handleSelectChange("intentions", value)}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full bg-blue-50 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue
                  placeholder={
                    isLoading
                      ? "Cargando intenciones..."
                      : "Selecciona una intención"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {intencion.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="location"
              className="text-sm font-medium text-gray-700"
            >
              Ubicación
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={
                  formData.location === "presencial" ? "default" : "outline"
                }
                className={`w-full ${
                  formData.location === "presencial"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-2 border-blue-600"
                }`}
                onClick={() => handleSelectChange("location", "presencial")}
              >
                Presencial
              </Button>
              <Button
                type="button"
                variant={formData.location === "remoto" ? "default" : "outline"}
                className={`w-full ${
                  formData.location === "remoto"
                    ? "bg-purple-600 text-white"
                    : "bg-white text-purple-600 border-2 border-purple-600"
                }`}
                onClick={() => handleSelectChange("location", "remoto")}
              >
                Remoto
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="reminderDate"
                className="text-sm font-medium text-gray-700"
              >
                Fecha del Recordatorio
              </Label>
              <div className="relative">
                <CalendarIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                  size={18}
                />
                <Input
                  id="reminderDate"
                  name="reminderDate"
                  type="date"
                  value={formData.reminderDate}
                  onChange={handleChange}
                  className="pl-10 bg-blue-50 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="reminderTime"
                className="text-sm font-medium text-gray-700"
              >
                Hora del Recordatorio
              </Label>
              <div className="relative">
                <ClockIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                  size={18}
                />
                <Input
                  id="reminderTime"
                  name="reminderTime"
                  type="time"
                  value={formData.reminderTime}
                  onChange={handleChange}
                  className="pl-10 bg-blue-50 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="notes"
              className="text-sm font-medium text-gray-700"
            >
              Notas
            </Label>
            <div className="relative">
              <MessageSquareIcon
                className="absolute left-3 top-3 text-blue-400"
                size={18}
              />
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="pl-10 min-h-[100px] bg-blue-50 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Detalles de la reunión..."
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors duration-300"
          >
            Programar Reunión
          </Button>
        </form>
      </div>
    </div>
  );
}
