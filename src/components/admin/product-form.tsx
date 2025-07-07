"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Product } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"
import { Separator } from "../ui/separator"
import { Checkbox } from "../ui/checkbox"
import { allOptionGroups } from "@/lib/data"

const productSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  price: z.coerce.number().min(0.01, {
    message: "O preço deve ser maior que zero.",
  }),
  category: z.enum(["Pizzas", "Lanches", "Bebidas", "Sobremesas"]),
  image: z.string().url({ message: "Por favor, insira uma URL de imagem válida." }).optional().or(z.literal('')),
  status: z.boolean().default(true),
  optionGroupIds: z.array(z.string()).optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
  initialData?: Product
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null)

  const defaultValues = initialData
    ? {
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        category: initialData.category,
        image: initialData.image || '',
        status: true, // Assuming all existing products are active
        optionGroupIds: initialData.optionGroupIds || []
      }
    : {
        name: "",
        description: "",
        price: 0,
        category: "Pizzas" as const,
        image: "",
        status: true,
        optionGroupIds: [],
      }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  function onSubmit(data: ProductFormValues) {
    // In a real app, you would send this data to your API/database.
    console.log(data)

    toast({
      title: `Produto ${initialData ? "atualizado" : "criado"}!`,
      description: `O produto "${data.name}" foi salvo com sucesso.`,
    })

    // Redirect back to the products list
    router.push("/admin/products")
    router.refresh() // To see the new/updated product in the list (in a real app)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem do Produto</FormLabel>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        {imagePreview ? (
                           <Image
                            src={imagePreview}
                            alt="Preview do produto"
                            width={200}
                            height={200}
                            className="aspect-square w-full rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center space-y-2 text-center text-muted-foreground p-8">
                             <Upload className="h-12 w-12" />
                             <p>Faça o upload de uma imagem</p>
                          </div>
                        )}
                        {/* This is a placeholder for file upload functionality */}
                        <Input 
                            type="file" 
                            className="text-sm"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImagePreview(reader.result as string);
                                        // In a real app, you'd handle the upload and get a URL
                                        // For now, we'll just use the data URI for preview.
                                        // field.onChange("https://some-uploaded-url.com/image.png");
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                         <FormMessage />
                      </div>
                    </CardContent>
                  </Card>
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Pizza de Calabresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Molho de tomate, queijo mussarela, calabresa fatiada..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
               <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="59.90" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pizzas">Pizzas</SelectItem>
                          <SelectItem value="Lanches">Lanches</SelectItem>
                          <SelectItem value="Bebidas">Bebidas</SelectItem>
                          <SelectItem value="Sobremesas">Sobremesas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Status
                    </FormLabel>
                    <FormDescription>
                      Se ativo, o produto aparecerá na loja.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-2">Grupos de Opções</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Vincule grupos de personalização a este produto. Os grupos podem ser gerenciados na seção &quot;Grupos de Opções&quot;.
          </p>
          <FormField
            control={form.control}
            name="optionGroupIds"
            render={() => (
              <FormItem className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {allOptionGroups.map((group) => (
                    <FormField
                      key={group.id}
                      control={form.control}
                      name="optionGroupIds"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={group.id}
                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(group.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), group.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== group.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-normal">
                                {group.name}
                              </FormLabel>
                               <FormDescription>
                                {group.options.length} {group.options.length === 1 ? 'opção' : 'opções'}
                              </FormDescription>
                            </div>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Produto</Button>
        </div>
      </form>
    </Form>
  )
}
