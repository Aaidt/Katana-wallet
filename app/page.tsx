"use client"

import { Swords } from "lucide-react"
import { Sol } from "@/components/Sol"

export default function Home() {

   return (
      <div className="bg-black min-h-screen text-white">

         <div className="flex mx-15 justify-between items-center pt-10">
            <div className="text-3xl font-bold flex items-center gap-2 cursor-pointer">
               <Swords
                  className="w-10 h-10" /> Katana Wallet
            </div> 
         </div>

         <div className="pt-20 pl-15 font-bold text-5xl ">Katana supports multiple blockchains</div>
         <div className="pl-16 pt-3 font-thin text-lg">Choose a blockchain to get started with.</div>

         <Sol />

      </div>


   )
}
