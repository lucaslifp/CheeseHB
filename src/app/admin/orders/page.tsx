import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminOrders() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>
            Acompanhe os pedidos recebidos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Esta página está em construção. Em breve você poderá ver seus pedidos aqui.</p>
        </CardContent>
      </Card>
    </div>
  )
}
