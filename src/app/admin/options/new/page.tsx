import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OptionGroupForm } from "@/components/admin/option-group-form"

export default function NewOptionGroupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Novo Grupo de Opções</CardTitle>
        <CardDescription>
          Preencha os detalhes do novo grupo e adicione suas opções.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OptionGroupForm />
      </CardContent>
    </Card>
  )
}
