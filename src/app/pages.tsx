"use client"
import Image from "next/image";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CalendarIcon, ClockIcon, UserIcon, MessageSquareIcon, PaperclipIcon } from "lucide-react"

export default function MeetingForm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    reminderDate: '',
    reminderTime: '',
    notes: '',
    files: [],
    intentions: [],
  })

  const [dragActive, setDragActive] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

 /*  const handleIntentionChange = (intention: string) => {
    setFormData(prevData => ({
      ...prevData,
      intentions: prevData.intentions.includes(intention)
        ? prevData.intentions.filter(i => i !== intention)
        : [...prevData.intentions, intention]
    }))
  } */

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  /*   if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    } */
  }

  /* const handleFiles = (files: FileList) => {
    setFormData(prevData => ({
      ...prevData,
      files: [...prevData.files, ...Array.from(files)]
    }))
  } */


    /*   /*    if (key === 'files') {
     /*      value.forEach((file: File) => formDataToSend.append('files', file)) 
    } else if (key === 'intentions') {
      formDataToSend.append('intentions', JSON.stringify(value))
    } else */
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
/*           if (key === 'files') {
            value.forEach((file: File) => formDataToSend.append('files', file));
          } else if (key === 'intentions') {
            formDataToSend.append('intentions', JSON.stringify(value));
          } else { */
            formDataToSend.append(key, value as string);
          /* } */
        });
    
        const webhookResponse = await fetch('https://hook.us1.make.com/fr7dbps2gmf55ekv8myomklbekczobx6', {
          method: 'POST',
          body: JSON.stringify(Object.fromEntries(formDataToSend)),
          headers: { 
            'Content-Type': 'application/json'// Asegúrate de usar el token correcto configurado en n8n
          }
        });
    
        if (webhookResponse.ok) {
          alert('Reunión programada con éxito y datos enviados al webhook!');
          setFormData({
            name: '',
            location: '',
            reminderDate: '',
            reminderTime: '',
            notes: '',
            files: [],
            intentions: [],
          });
        } else {
          throw new Error('Error al enviar datos al webhook');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al programar la reunión o enviar datos al webhook. Por favor, intenta de nuevo.');
      }
    };
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LinkedIn%20cover%20-%201-dqOfepCVMoQreoWnBB7WQZtT31i0uj.jpg" alt="0800 WEB" className="mb-8 w-full" />
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Programa tu Reunión</h2>
          <p className="text-center text-gray-600 mb-8">Productos con impacto.</p>
        </div>
      </div>
      <div className="md:w-1/2 p-8 bg-white shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre de la Reunión</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10"
                placeholder="Nombre de la reunión"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">Ubicación</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={formData.location === 'presencial' ? 'default' : 'outline'}
                className={`w-full ${formData.location === 'presencial' ? 'bg-black text-white' : 'bg-white text-black border-2 border-black'}`}
                onClick={() => handleSelectChange('location', 'presencial')}
              >
                Presencial
              </Button>
              <Button
                type="button"
                variant={formData.location === 'remoto' ? 'default' : 'outline'}
                className={`w-full ${formData.location === 'remoto' ? 'bg-black text-white' : 'bg-white text-black border-2 border-black'}`}
                onClick={() => handleSelectChange('location', 'remoto')}
              >
                Remoto
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reminderDate" className="text-sm font-medium text-gray-700">Fecha del Recordatorio</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="reminderDate"
                  name="reminderDate"
                  type="date"
                  value={formData.reminderDate}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminderTime" className="text-sm font-medium text-gray-700">Hora del Recordatorio</Label>
              <div className="relative">
                <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="reminderTime"
                  name="reminderTime"
                  type="time"
                  value={formData.reminderTime}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">Notas</Label>
            <div className="relative">
              <MessageSquareIcon className="absolute left-3 top-3 text-gray-400" size={18} />
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="pl-10 min-h-[100px]"
                placeholder="Detalles de la reunión..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Archivos</Label>
            <div 
              className={`border-2 border-dashed rounded-md p-4 ${dragActive ? 'border-black' : 'border-gray-300'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Input
                type="file"
                multiple
/*                 onChange={(e) => handleFiles(e.target.files)} */
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center text-gray-500">
                <PaperclipIcon size={24} />
                <span>Arrastra y suelta archivos aquí o haz clic para seleccionar</span>
              </Label>
            </div>
            {formData.files.length > 0 && (
              <ul className="list-disc pl-5">
                {formData.files.map((file: File, index: number) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Intención de la Reunión</Label>
            <div className="grid grid-cols-2 gap-4">
              {['Estrategia', 'Soporte', 'Cierre de venta', 'Resolutiva', 'Orientativa'].map((intention) => (
                <Button
                  key={intention}
                  type="button"
/*                   variant={formData.intentions.includes(intention) ? 'default' : 'outline'}
                  className={`w-full ${formData.intentions.includes(intention) ? 'bg-black text-white' : 'bg-white text-black border-2 border-black'}`}
                  onClick={() => handleIntentionChange(intention)} */
                >
                  {intention}
                </Button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">Programar Reunión</Button>
        </form>
      </div>
    </div>
  );
}
