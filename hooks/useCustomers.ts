// src/hooks/useCustomers.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for customer data if needed
interface Customer {
    _id: string;
    name: string;
    email: string;
    phoneNo: string;
    billNos : string[];
}

export const useCustomers = () => {
    const [data, setData] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            setError(null); // Reset error state before new fetch

            try {
                const response = await axios.get('/api/customers'); // Adjust the URL based on your setup
                setData(response.data); // Assuming the response data is an array of customers
            } catch (err) {
                setError('Failed to fetch customers'); // You can customize the error message
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []); // Empty dependency array to run on mount

    return { data, loading, error };
};
