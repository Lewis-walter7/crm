
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[var(--bg-primary)]">

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center max-w-2xl px-4"
      >
        <div className="mb-6 flex justify-center">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <Lock size={32} className="text-[var(--color-primary)] opacity-80" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Personal CRM
        </h1>

        <p className="text-lg text-[var(--text-secondary)] mb-8 font-light">
          Your private space for managing connections. <br className="hidden md:block" />
          Simple, secure, and built just for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/login">
            <Button size="lg" className="px-8 min-w-[160px] text-lg">
              Enter Dashboard <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>

          <Link href="/register">
            <span className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              Create new account
            </span>
          </Link>
        </div>
      </motion.div>

      <footer className="absolute bottom-6 text-center text-[var(--text-secondary)] text-xs opacity-50">
        Local Environment • v1.0.0
      </footer>
    </div>
  );
}
