"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OptionGroupForm } from "@/components/admin/option-group-form"
import { allOptionGroups } from "@/lib/data"
import type { OptionGroup } from "@/lib/types"

export default function EditOptionGroupPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch this from your database
  const group = allOptionGroups.find((g) => g.id === params.id) as OptionGroup | undefined

  if (!group) {
    return <div>Grupo de opções não encontrado</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Grupo de Opções</CardTitle>
        <CardDescription>
          Atualize os detalhes do grupo &quot;{group.name}&quot;.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OptionGroupForm initialData={group} />
      </CardContent>
    </Card>
  )
}
