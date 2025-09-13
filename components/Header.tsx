"use client"

import Image from "next/image"
import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-background backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        <div className="flex items-center space-x-2">
          <Image
            src="https://i.pinimg.com/1200x/6f/65/ac/6f65ac68dee4841a75026411fe8e09a8.jpg"
            alt="Solana Logo"
            width={28}
            height={28}
          />
          <span className="font-bold text-lg tracking-tight">Katana Wallet</span>
        </div>

        <div className="flex items-center space-x-4">


          <div className="flex items-center justify-center justify-between bg-background text-foreground text-sm px-3 py-2 rounded-md border border-foreground/20">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400  opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>

            Devnet
          </div>


          <WalletMultiButton className=" cursor-pointer 
            !bg-transparent 
            !text-foreground 
            !border 
            !border-foreground/20 
            hover:!bg-foreground/10"/>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="cursor-pointer"
          >
            {theme === "light" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
