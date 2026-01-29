
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, MessageSquare, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Customers', href: '/customers', icon: Users },
        { name: 'Interactions', href: '/interactions', icon: MessageSquare },
    ];

    return (
        <div className="flex h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            {/* Sidebar */}
            <aside className="w-64 glass border-r flex flex-col justify-between p-4">
                <div>
                    <div className="text-2xl font-bold mb-8 px-2 text-[var(--color-primary)]">
                        CRM Pro
                    </div>
                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-[var(--color-primary)] text-white'
                                            : 'hover:bg-[var(--bg-card)] text-[var(--text-secondary)]'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-2 border-t border-[var(--glass-border)] pt-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500"></div>
                        <div className="text-sm">
                            <div className="font-bold">Lewis</div>
                            <div className="text-[var(--text-secondary)] text-xs">Admin</div>
                        </div>
                    </div>
                    <Button variant="secondary" className="w-full justify-center text-sm">
                        <LogOut size={16} /> Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 relative">
                {children}
            </main>
        </div>
    );
}
