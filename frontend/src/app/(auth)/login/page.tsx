
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { Lock, User } from 'lucide-react';

import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('access_token', response.data.access_token);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.status === 401 ? 'Invalid credentials' : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="glass-card">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-sm text-[var(--text-secondary)]">Sign in to your CRM dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {error && <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">{error}</div>}
                        <Input
                            name="username"
                            placeholder="Username"
                            label="Username"
                            required
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            label="Password"
                            required
                        />

                        <Button type="submit" isLoading={isLoading} className="w-full mt-2">
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-[var(--color-primary)] hover:underline">
                            Register
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
