"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { OptionGroup } from "@/lib/types"
import { Separator } from "../ui/separator"
import { PlusCircle, Trash2 } from "lucide-react"

const optionItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "O nome da opção é obrigatório."),
  price: z.coerce.number().min(0, "O preço não pode ser negativo."),
  active: z.boolean().default(true),
})

const optionGroupSchema = z.object({
  name: z.string().min(2, "O nome do grupo deve ter pelo menos 2 caracteres."),
  controlType: z.enum(["radio", "stepper"]),
  min: z.coerce.number().min(0),
  max: z.coerce.number().min(1),
  options: z.array(optionItemSchema).min(1, "O grupo deve ter pelo menos uma opção."),
})

type OptionGroupFormValues = z.infer<typeof optionGroupSchema>

interface OptionGroupFormProps {
  initialData?: OptionGroup
}

export function OptionGroupForm({ initialData }: OptionGroupFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        name: "",
        controlType: "radio" as const,
        min: 1,
        max: 1,
        options: [],
      }

  const form = useForm<OptionGroupFormValues>({
    resolver: zodResolver(optionGroupSchema),
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  })
  
  const controlType = form.watch("controlType")

  function onSubmit(data: OptionGroupFormValues) {
    // In a real app, you would send this data to your API/database.
    console.log(data)

    toast({
      title: `Grupo ${initialData ? "atualizado" : "criado"}!`,
      description: `O grupo "${data.name}" foi salvo com sucesso.`,
    })

    // Redirect back to the options list
    router.push("/admin/options")
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6 p-6 border rounded-md">
           <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Grupo</FormLabel>
                <FormControl>
                  <Input placeholder="Bordas Recheadas" {...field} />
                </FormControl>
                 <FormDescription>
                    Este é o título que aparecerá no modal de personalização (ex: &quot;Escolha a Borda&quot;).
                  </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="controlType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Seleção</FormLabel>
                  <Select onValueChange={(value: "radio" | "stepper") => {
                      field.onChange(value)
                      if (value === 'radio') {
                        form.setValue('min', 1)
                        form.setValue('max', 1)
                      } else {
                         form.setValue('min', 0)
                         form.setValue('max', 10)
                      }
                  }} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="radio">Escolha Única</SelectItem>
                      <SelectItem value="stepper">Múltiplas Escolhas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mín. Seleções</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} disabled={controlType === 'radio'} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Máx. Seleções</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} disabled={controlType === 'radio'} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
        </div>
        
        <Separator />
        
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Itens do Grupo</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ id: `new-${fields.length}`, name: '', price: 0, active: true })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Item
                </Button>
            </div>
            <div className="space-y-4">
                {fields.length > 0 ? fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr_150px_auto] items-end gap-4 p-4 border rounded-lg">
                        <FormField
                            control={form.control}
                            name={`options.${index}.name`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do Item</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Catupiry" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`options.${index}.price`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço Adicional</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" placeholder="8.00" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remover</span>
                        </Button>
                    </div>
                )) : (
                  <div className="text-center text-muted-foreground py-8">
                    Nenhum item adicionado a este grupo ainda.
                  </div>
                )}
            </div>
            {form.formState.errors.options && (
                 <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.options.message}
                 </p>
            )}
        </div>

        <div className="flex justify-end space-x-2 pt-8">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Grupo</Button>
        </div>
      </form>
    </Form>
  )
}
