"use client"

import Link from "next/link"
import { MoreHorizontal, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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

import { allOptionGroups } from "@/lib/data"

export default function OptionGroupsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Grupos de Opções</CardTitle>
                <CardDescription>
                Gerencie os grupos de personalização para seus produtos.
                </CardDescription>
            </div>
            <Button asChild>
                <Link href="/admin/options/new">
                    <>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Criar Novo Grupo
                    </>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Grupo</TableHead>
              <TableHead>Tipo de Controle</TableHead>
              <TableHead className="hidden md:table-cell">Nº de Itens</TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allOptionGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="font-medium">{group.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{group.controlType === 'radio' ? 'Escolha Única' : 'Múltipla Escolha'}</Badge> 
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {group.options.length}
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
                         <Link href={`/admin/options/edit/${group.id}`}>Editar</Link>
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
    </Card>
  )
}
