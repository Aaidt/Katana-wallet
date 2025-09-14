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


         <Sol />

      </div>


   )
}