import { Swords, Sun, Moon } from "lucide-react"
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div>

      <div className="flex mx-15 justify-between items-center pt-10">
        <div className="text-3xl font-bold flex gap-2">
          <Swords className="w-7 h-7 mt-1" /> Katana Wallet
        </div>
      </div>

      <div className="pt-20 pl-15 font-bold text-5xl ">We support multiple blockchains</div>
      <div className="p-16 text-gray-400 pt-3 font-bold text-2xl">Choose a blockchain to get started with.</div>

      <div className="flex pl-16 gap-2">
        <button className="bg-white rounded-md px-4 py-2 text-black hover:bg-white/80">Solana</button>
        <button className="bg-white rounded-md px-4 py-2 text-black hover:bg-white/80">Ethereum</button>
      </div>



    </div>
  )
}
