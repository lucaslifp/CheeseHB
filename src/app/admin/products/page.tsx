"use client"

import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { products } from "@/lib/data"

export default function ProductsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Produtos</CardTitle>
                <CardDescription>
                Gerencie os produtos da sua loja.
                </CardDescription>
            </div>
            <Button asChild>
                <Link href="/admin/products/new">
                    <>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Produto
                    </>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Imagem</span>
              </TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="hidden md:table-cell">Preço</TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={product.name}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.image}
                    width="64"
                    data-ai-hint={product['data-ai-hint']}
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">Ativo</Badge> 
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                         <Link href={`/admin/products/edit/${product.id}`}>Editar</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Mostrando <strong>1-{products.length}</strong> de <strong>{products.length}</strong> produtos
        </div>
      </CardFooter>
    </Card>
  )
}
