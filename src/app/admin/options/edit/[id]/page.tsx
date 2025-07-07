import { OptionGroupForm } from "@/components/admin/option-group-form";
import { allOptionGroups } from "@/lib/data";
import type { OptionGroup } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PageProps {
  params: { id: string };
}

export default async function EditOptionGroupPage({ params }: PageProps) {
  const group = allOptionGroups.find((g) => g.id === params.id) as
    | OptionGroup
    | undefined;

  if (!group) {
    return <div>Grupo de opções não encontrado</div>;
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
  );
}
