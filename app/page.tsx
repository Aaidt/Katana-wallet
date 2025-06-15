"use client"

import { Swords, Sun, Moon } from "lucide-react"
import { useState } from 'react'
import { Sol } from "@/components/Sol"
import { Eth } from "@/components/Eth"

export default function Home() {
  const [sol, setSol] = useState<boolean | null>(null)

  return (
    <div>

      <div className="flex mx-15 justify-between items-center pt-10">
        <div className="text-3xl font-bold flex items-center gap-2">
          <Swords className="w-10 h-10 " /> Katana Wallet
        </div>
      </div>

      <div className="pt-20 pl-15 font-bold text-5xl ">We support multiple blockchains</div>
      <div className="pl-16 text-gray-400 pt-3 font-bold text-2xl">Choose a blockchain to get started with.</div>

      <div className="flex pl-16 pt-3 gap-2 ">
        <button
          className="bg-white rounded-md duration-200 transition-all px-7 py-3 text-md text-black hover:bg-white/80"
          onClick={() => setSol(true)}
        >
          Solana
        </button>
        <button
          className="bg-white rounded-md duration-200 transition-all px-7 py-3 text-md text-black hover:bg-white/80"
          onClick={() => setSol(false)}
        >
          Ethereum
        </button>
      </div>

      {sol ? (
        <Sol />
      ) : (
        <Eth />
      )}


    </div>
  )
}
