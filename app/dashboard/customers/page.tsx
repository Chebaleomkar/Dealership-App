
"use client"
import { Heading } from '@/components/Heading';
import DashboardContent from '@/components/layout/Dashboard-content';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useCustomers } from '@/hooks/useCustomers';


const CustomerPage = () => {
    const {data:CustomerData , loading , error} = useCustomers();

    return (
        <DashboardContent>
            <Heading title="Customer" description="See customers' data here" />
            
            {/* Grid layout for customer cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CustomerData.map((customer, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">{customer.name}</CardTitle>
                            <CardDescription>{customer.email}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p><strong>Phone:</strong> {customer.phoneNo}</p>
                            <p><strong>Phone:</strong> {customer.email}</p>
                        </CardContent>
                        <CardContent>
                            <Button variant="outline" size="sm">Edit</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DashboardContent>
    );
};

export default CustomerPage;
