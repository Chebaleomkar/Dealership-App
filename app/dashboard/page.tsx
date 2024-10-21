import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DollarSign, ShoppingCart, TrendingUp, Search, Users, type LucideProps } from "lucide-react";
import {  DropdownMenu , DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    Icon: React.ComponentType<LucideProps>;
    iconClassName?: string;
}


const Dashboard = () => {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 m-2">

            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <Image
                                    src="/images/profile-placeholder.jpg"
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Total Revenue" value="$45,231.89" change="+20.1% from last month" Icon={DollarSign} />
                    <StatCard title="Orders" value="+2,350" change="+10.5% from last month" Icon={ShoppingCart} />
                    <StatCard title="Customers" value="+12,234" change="+19% from last month" Icon={Users} />
                    <StatCard title="Conversion Rate" value="3.2%" change="+2.4% from last month" Icon={TrendingUp} />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    <ProductsCard
                        data={[
                            { id: "ORD001", customer: "John Doe", total: "$125.00", status: "Shipped" },
                            { id: "ORD002", customer: "Jane Smith", total: "$200.00", status: "Processing" },
                            { id: "ORD003", customer: "Bob Johnson", total: "$75.50", status: "Delivered" }
                        ]}
                        title="Most liked Products"
                        subtitle="you have 3 most liked products"
                        buttonName="View Liked Products"
                        isProductList={true}
                    />

                    <ProductsCard
                        data={[
                            { name: "Product A", sales: 1234, revenue: "$12,340" },
                            { name: "Product B", sales: 923, revenue: "$9,230" },
                            { name: "Product C", sales: 825, revenue: "$8,250" }
                        ]}
                        title="Top Selling Products"
                        subtitle="Your best performers this month"
                        link="/product/list"
                        buttonName="View All products"
                        isProductList={false}
                    />
                </div>

            </div>
            </div>
        </div>
    )
}
export default Dashboard;


const ProductsCard = ({
    data,
    title,
    subtitle,
    link,
    buttonName,
    isProductList
}: {
    data: any;
    title: string;
    subtitle: string;
    link?: string;
    buttonName: string;
    isProductList: boolean;
}) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title || "Card title"}</CardTitle>
                <CardDescription>{subtitle || "Card Subtitle"}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {isProductList
                        ? data?.map((p: any) => (
                            <div key={p.id} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{p.customer}</p>
                                    <p className="text-sm text-muted-foreground">Order ID: {p.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{p.total}</p>
                                    <p className="text-sm text-muted-foreground">{p.status}</p>
                                </div>
                            </div>
                        ))
                        : data?.map((product: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{product.revenue}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </CardContent>
            <CardFooter>
                {link ? (
                    <a href={link}>
                        <Button variant="outline" className="w-full">
                            {buttonName || "button"}
                        </Button>
                    </a>
                ) : (
                    <Button variant="outline" className="w-full">
                        {buttonName || "button"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};


const StatCard = ({ title, value, change, Icon, iconClassName }: StatCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={`h-4 w-4 text-muted-foreground ${iconClassName || ""}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{change}</p>
            </CardContent>
        </Card>
    );
};