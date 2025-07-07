"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductForm } from "@/components/admin/product-form"
import { products } from "@/lib/data"
import type { Product } from "@/lib/types"

export default function EditProductPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch this from your database
  const product = products.find((p) => p.id === params.id) as Product | undefined

  if (!product) {
    return <div>Produto não encontrado</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Produto</CardTitle>
        <CardDescription>
          Atualize os detalhes do produto &quot;{product.name}&quot;.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProductForm initialData={product} />
      </CardContent>
    </Card>
  )
}
