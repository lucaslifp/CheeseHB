import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductForm } from "@/components/admin/product-form"

export default function NewProductPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Novo Produto</CardTitle>
        <CardDescription>
          Preencha os detalhes do novo produto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProductForm />
      </CardContent>
    </Card>
  )
}
