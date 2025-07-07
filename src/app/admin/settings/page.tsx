
"use client"

import * as React from "react"
import Image from "next/image"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type DayOfWeek = 'domingo' | 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado';

interface Schedule {
  open: boolean;
  from: string;
  to: string;
}

const initialSchedule: Record<DayOfWeek, Schedule> = {
  domingo: { open: true, from: '18:00', to: '22:00' },
  segunda: { open: false, from: '18:00', to: '23:00' },
  terca: { open: true, from: '18:00', to: '23:00' },
  quarta: { open: true, from: '18:00', to: '23:00' },
  quinta: { open: true, from: '18:00', to: '23:00' },
  sexta: { open: true, from: '18:00', to: '23:30' },
  sabado: { open: true, from: '18:00', to: '23:30' },
};

const daysOfWeek: { id: DayOfWeek; label: string }[] = [
    { id: 'domingo', label: 'Domingo' },
    { id: 'segunda', label: 'Segunda-feira' },
    { id: 'terca', label: 'Terça-feira' },
    { id: 'quarta', label: 'Quarta-feira' },
    { id: 'quinta', label: 'Quinta-feira' },
    { id: 'sexta', label: 'Sexta-feira' },
    { id: 'sabado', label: 'Sábado' },
];

export default function AdminSettings() {
  const { toast } = useToast()
  const [schedule, setSchedule] = React.useState(initialSchedule);
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

  const handleTimeChange = (day: DayOfWeek, field: 'from' | 'to', value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleOpenChange = (day: DayOfWeek, isOpen: boolean) => {
     setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], open: isOpen }
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would collect all state (including schedule) and send to your API
    console.log({ schedule, logoPreview });
    toast({
      title: "Configurações Salvas!",
      description: "Suas alterações foram salvas com sucesso (simulação).",
    })
  }

  return (
    <form onSubmit={handleSave} className="grid flex-1 auto-rows-max items-start gap-4 md:gap-8">
      {/* Informações da Loja Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Loja</CardTitle>
          <CardDescription>
            Atualize os dados principais e a identidade visual do seu negócio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="store-name">Nome da Loja</Label>
                <Input
                  id="store-name"
                  type="text"
                  className="w-full"
                  defaultValue="CheesePizza"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" type="tel" defaultValue="(99) 99999-9999" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" type="text" defaultValue="@cheesepizza" />
                  </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  type="text"
                  className="w-full"
                  defaultValue="Rua da Pizza, 123, Bairro Saboroso"
                />
              </div>
            </div>
             <div className="md:col-span-1">
              <Label>Logo da Loja</Label>
              <Card className="mt-2">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {logoPreview ? (
                      <Image
                        src={logoPreview}
                        alt="Preview do logo"
                        width={150}
                        height={150}
                        className="aspect-square rounded-md object-contain"
                      />
                    ) : (
                      <div className="flex h-[150px] w-[150px] flex-col items-center justify-center space-y-2 rounded-md border border-dashed text-center text-muted-foreground">
                        <Upload className="h-12 w-12" />
                        <p className="text-xs">Fazer upload</p>
                      </div>
                    )}
                    <Input
                      id="logo-upload"
                      type="file"
                      className="text-sm"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setLogoPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Horário de Funcionamento Card */}
      <Card>
        <CardHeader>
          <CardTitle>Horário de Funcionamento</CardTitle>
           <CardDescription>
            Defina os horários em que sua loja aceita pedidos para cada dia da semana.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            {daysOfWeek.map((day) => (
               <div key={day.id}>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 py-3">
                        <Label htmlFor={`status-${day.id}`} className="font-semibold col-span-1">
                            {day.label}
                        </Label>
                        <div className="flex items-center gap-2 col-span-1 md:col-span-2">
                             <Input 
                                id={`from-${day.id}`} 
                                type="time" 
                                className="w-full"
                                value={schedule[day.id].from}
                                onChange={(e) => handleTimeChange(day.id, 'from', e.target.value)}
                                disabled={!schedule[day.id].open}
                             />
                            <span className="text-muted-foreground">-</span>
                             <Input 
                                id={`to-${day.id}`} 
                                type="time" 
                                className="w-full"
                                value={schedule[day.id].to}
                                onChange={(e) => handleTimeChange(day.id, 'to', e.target.value)}
                                disabled={!schedule[day.id].open}
                            />
                        </div>
                        <div className="flex items-center justify-end space-x-2 col-span-1">
                            <Switch 
                                id={`status-${day.id}`} 
                                checked={schedule[day.id].open}
                                onCheckedChange={(checked) => handleOpenChange(day.id, checked)}
                            />
                            <Label htmlFor={`status-${day.id}`} className={cn("text-sm", schedule[day.id].open ? 'text-foreground' : 'text-muted-foreground')}>
                                {schedule[day.id].open ? 'Aberto' : 'Fechado'}
                            </Label>
                        </div>
                    </div>
                    {day.id !== 'sabado' && <Separator />}
                </div>
            ))}
        </CardContent>
      </Card>

      {/* Controle da Loja Card */}
      <Card>
        <CardHeader>
          <CardTitle>Controle da Loja</CardTitle>
          <CardDescription>
            Controle o status geral e a visibilidade da sua loja.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode" className="text-base">
                        Modo Manutenção
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Se ativado, sua loja aparecerá como fechada para os clientes, independentemente do horário de funcionamento.
                    </p>
                </div>
                <Switch id="maintenance-mode" />
            </div>
        </CardContent>
      </Card>

      {/* Configurações de Entrega Card */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Entrega</CardTitle>
          <CardDescription>
            Gerencie os valores e o status do serviço de entrega.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-3">
                <Label htmlFor="delivery-fee">Taxa de Entrega Padrão (R$)</Label>
                <Input id="delivery-fee" type="number" step="0.50" defaultValue="5.00" />
            </div>
             <div className="grid gap-3">
                <Label htmlFor="min-order-value">Pedido Mínimo (R$)</Label>
                <Input id="min-order-value" type="number" step="1.00" defaultValue="20.00" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
              <Switch id="delivery-active" defaultChecked={true} />
              <Label htmlFor="delivery-active" className="text-base">Serviço de entrega ativo</Label>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-2">
          <Button variant="outline" type="button">Cancelar</Button>
          <Button type="submit">Salvar Alterações</Button>
      </div>
    </form>
  )
}

    