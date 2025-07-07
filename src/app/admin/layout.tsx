"use client"

import * as React from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  PanelLeft,
  PackagePlus,
} from "lucide-react"

import {
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarInset
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin">
                      <>
                        <LayoutDashboard />
                        Dashboard
                      </>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/products">
                      <>
                        <Package />
                        Produtos
                      </>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/options">
                      <>
                        <PackagePlus />
                        Grupos de Opções
                      </>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/orders">
                      <>
                        <ShoppingCart />
                        Pedidos
                      </>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/settings">
                      <>
                        <Settings />
                        Configurações
                      </>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
        </Sidebar>
        <div className="flex-1">
           <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
             <div className="md:hidden">
                <SidebarTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <PanelLeft className="h-4 w-4" />
                  </Button>
                </SidebarTrigger>
             </div>
            <h1 className="text-xl font-semibold">CheesePizza Admin</h1>
          </header>
          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
