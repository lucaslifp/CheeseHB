import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Bem-vindo ao seu Painel de Controle</CardTitle>
          <CardDescription>
            Aqui você pode gerenciar sua loja, produtos, pedidos e configurações.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Selecione uma opção no menu lateral para começar.</p>
        </CardContent>
      </Card>
    </div>
  )
}
