"use client"

import Image from "next/image"
import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

export default function Header() {    
  const { theme, setTheme } = useTheme()
  const [network, setNetwork] = useState<"devnet" | "mainnet">("devnet")
  const [walletAddress] = useState("7Gs98d...89F") // mock, replace with wallet adapter hook

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

        {/* Right: Network, Wallet, Theme */}
        <div className="flex items-center space-x-4">
          {/* Network Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="capitalize">
                {network}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setNetwork("devnet")}>
                Devnet
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setNetwork("mainnet")}>
                Mainnet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wallet Address */}
          <Button variant="secondary" className="font-mono text-sm">
            {walletAddress}
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
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
  