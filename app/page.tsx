"use client"

import { Swords } from "lucide-react"
import { useState } from 'react'
import { Sol } from "@/components/Sol"
import { Eth } from "@/components/Eth"

export default function Home() {
  const [sol, setSol] = useState<boolean | null>(null)
  const [eth, setEth] = useState<boolean | null>(null)

  return (
    <div>

      <div className="flex mx-15 justify-between items-center pt-10">
        <div
          onClick={() => {
            setSol(null)
            setEth(null)
          }}
          className="text-3xl font-bold flex items-center gap-2 cursor-pointer">
          <Swords
            className="w-10 h-10" /> Katana Wallet
        </div>
      </div>

      <div className="pt-20 pl-15 font-bold text-5xl ">Katana supports multiple blockchains</div>
      <div className="pl-16 text-gray-400 pt-3 font-thin text-lg">Choose a blockchain to get started with.</div>

      <div className="flex pl-16 pt-3 gap-2 ">
        <button
          className="bg-white rounded-md duration-200 transition-all px-7 py-3 text-md text-black hover:bg-white/80"
          onClick={() => setSol(true)}
        >
          Solana
        </button>
        <button
          className="bg-white rounded-md duration-200 transition-all px-7 py-3 text-md text-black hover:bg-white/80"
          onClick={() => setEth(true)}
        >
          Ethereum
        </button>
      </div>

      {sol ? (
        <Sol />
      ) : eth ? (
        <Eth />
      ) : (
        <div>
          <div className="text-gray-400 flex justify-center font-thin text-lg p-16 pt-20">
            Start by selecting one blockchain.
          </div>
        </div>
      )}


    </div>
  )
}
