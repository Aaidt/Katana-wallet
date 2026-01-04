"use client"

import Image from "next/image"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        <div className="flex items-center space-x-2">
          <Image
            src="https://i.pinimg.com/1200x/6f/65/ac/6f65ac68dee4841a75026411fe8e09a8.jpg"
            alt="Solana Logo"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="font-bold text-lg tracking-tight">Katana Wallet</span>
        </div>

        <div className="flex items-center space-x-4">


          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 text-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-black/5 dark:border-white/10 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Devnet</span>
          </div>


          <WalletMultiButton style={{
            backgroundColor: "transparent",
            color: "var(--foreground)",
            fontSize: '0.876rem',
            padding: "0.25rem 1rem"
          }} />

        </div>
      </div>
    </header>
  )
}
