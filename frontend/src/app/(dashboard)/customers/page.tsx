
'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Search, MoreVertical } from 'lucide-react';

import api from '@/lib/api';

export default function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [customers, setCustomers] = useState<any[]>([]);

    React.useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await api.get('/customers');
                setCustomers(res.data);
            } catch (error) {
                console.error('Failed to fetch customers', error);
            }
        };
        fetchCustomers();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Customers</h1>
                    <p className="text-[var(--text-secondary)]">Manage your client relationships</p>
                </div>
                <Button>
                    <Plus size={18} /> Add Customer
                </Button>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
                    <Input
                        placeholder="Search customers..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="secondary">Filter</Button>
            </div>

            <div className="grid gap-4">
                {customers.map((customer) => (
                    <Card key={customer._id || customer.id} hoverable className="glass-card flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--color-primary)] font-bold">
                                {customer.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold">{customer.name}</h3>
                                <p className="text-sm text-[var(--text-secondary)]">{customer.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="hidden md:block text-sm">
                                <p className="text-[var(--text-secondary)]">Company</p>
                                <p>{customer.company}</p>
                            </div>

                            <div className="hidden md:block">
                                <span className={`px-2 py-1 rounded-full text-xs ${customer.status === 'Customer'
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                    {customer.status}
                                </span>
                            </div>

                            <Button variant="secondary" size="sm" className="!p-2">
                                <MoreVertical size={16} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
