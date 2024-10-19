import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from 'next/link';
import { Button } from './ui/button';
import { PanelLeft } from 'lucide-react';
import { Home, LineChart, Package, Package2, ShoppingCart, Users2 } from 'lucide-react';
const Navbar = () => {
    return (
        <div className="flex sm:hidden items-center justify-between bg-gray-900 gap-2 ">

            <nav className=" p-4">
                <div className="container mx-auto text-white flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold"> Computer Shope</h1>
                        <p className="text-sm">Your Trusted Partner for Computer Components</p>
                    </div>
                </div>
            </nav>

            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden ml-2">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Home className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="/dashboard/purchase-history"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            Orders
                        </Link>
                        <Link
                            href="/dashboard/manage-stock"
                            className="flex items-center gap-4 px-2.5 text-foreground"
                        >
                            <Package className="h-5 w-5" />
                            Products
                        </Link>
                        <Link
                            href="/dashboard/customers"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Users2 className="h-5 w-5" />
                            Customers
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <LineChart className="h-5 w-5" />
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Navbar
