"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Send, ArrowDownLeft, Wifi } from "lucide-react";
import { SendModal } from "./SendModal";

interface axiosResponse {
   solana: {
      usd: number
   }
}

export function WalletCard() {

   const [balance, setBalance] = useState<number>(0)
   const [currentPrice, setCurrentPrice] = useState<number>(0);
   const [usd, setUsd] = useState<number>(0);
   const [modalOpen, setModalOpen] = useState<boolean>(false);

   const { connection } = useConnection()
   const wallet = useWallet();

   useEffect(() => {
      getBalance();
   }, [connection, wallet]);

   useEffect(() => {
      getCurrentSOLToUSDPrice();
   }, [])

   useEffect(() => {
      setUsd(balance / 1e9 * currentPrice);
   }, [balance, currentPrice])

   async function getBalance() {
      if (!wallet.publicKey) return;
      const currentBalance = await connection.getBalance(wallet.publicKey);

      setBalance(currentBalance);
   }

   async function getCurrentSOLToUSDPrice() {
      try {
         const response = await axios.get<axiosResponse>("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=solana")
         setCurrentPrice(response.data.solana.usd);
      } catch (err) {
         console.log("Error in fetching the current price: " + err);
      }
      if (balance) {
         setUsd(currentPrice * balance / 1e9)
      }

   }


   return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] gap-10 select-none">
         <SendModal open={modalOpen} setOpen={setModalOpen} />
         
         {/* Main Credit Card Display */}
         <div className="group relative w-[520px] h-[320px] perspective-1000">
            {/* Outer Glow - subtle and complementary */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#9945FF] to-[#14F195] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 rounded-[32px]"></div>
            
            <div className="absolute inset-0 bg-[#0a0a0a] dark:bg-[#030303] rounded-[32px] shadow-2xl transition-transform duration-500 transform group-hover:scale-[1.01] border border-white/10 overflow-hidden">
                
                {/* Crisp Gradient Beam */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#9945FF]/10 via-transparent to-transparent opacity-60 pointer-events-none transform -translate-y-1/2 translate-x-1/3" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#14F195]/10 via-transparent to-transparent opacity-50 pointer-events-none transform translate-y-1/3 -translate-x-1/3" />
               
               {/* Sharp Edge Highlight */}
               <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
               <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

               {/* Card Content */}
               <div className="relative h-full p-11 flex flex-col justify-between z-10">
                  
                  {/* Top Row */}
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-black border border-white/5 flex items-center justify-center relative overflow-hidden group/icon">
                             <div className="absolute inset-0 bg-[#9945FF] opacity-0 group-hover/icon:opacity-20 transition-opacity"></div>
                             <Wifi className="text-white rotate-90" size={24} />
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-2xl tracking-[0.2em] text-white font-mono leading-none">KATANA</span>
                           <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase mt-1.5 font-medium">Wealth</span>
                        </div>
                     </div>
                     <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] to-[#9945FF] tracking-[0.2em] uppercase">
                           Solana
                        </span>
                     </div>
                  </div>

                  {/* Middleware / Chip area */}
                  <div className="flex items-center gap-8 pl-1">
                     <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#bfa15f] flex items-center justify-center relative overflow-hidden shadow-lg border border-[#fadd82]/30">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="w-full h-[1px] bg-black/20 absolute top-1/3"></div>
                        <div className="w-full h-[1px] bg-black/20 absolute bottom-1/3"></div>
                        <div className="h-full w-[1px] bg-black/20 absolute left-1/2"></div>
                        <div className="h-2 w-2 border border-black/30 rounded-sm absolute"></div>
                     </div>
                     <div className="flex flex-col gap-1">
                         <div className="text-white/30 text-[10px] tracking-widest uppercase font-semibold">Total Balance</div>
                         <h2 className="text-5xl font-mono text-white tracking-widest drop-shadow-2xl">
                           {(balance / 1e9).toFixed(4)} <span className="text-white/40 text-2xl font-light">SOL</span>
                        </h2>
                     </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex justify-between items-end">
                     <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">USD Value</span>
                        <div className="font-mono text-2xl text-white tracking-wide flex items-center gap-2">
                            ${usd.toFixed(2)}
                        </div>
                     </div>
                     
                     {/* Sol Logo Abstract */}
                     <div className="opacity-90 relative">
                         <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#9945FF] to-[#14F195] shadow-lg ring-2 ring-white/10" />
                     </div>
                  </div>
               </div>
            </div>
         </div>


         {/* Sleek Pill Action Bar */}
         <div className="flex items-center gap-4 bg-white/60 dark:bg-black/40 backdrop-blur-xl p-2 pr-3 pl-3 rounded-full border border-black/5 dark:border-white/10 shadow-xl hover:scale-105 transition-transform duration-300">
            <button
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                onClick={() => setModalOpen(true)}
            >
                <Send size={16} />
                <span>Send</span>
            </button>

            <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1"></div>

            <button
                className="group flex items-center gap-3 px-6 py-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-foreground font-semibold text-sm transition-all active:scale-95"
                onClick={async () => {
                   if (wallet.publicKey) {
                      try {
                         await connection.requestAirdrop(wallet.publicKey, 5 * 1e9);
                         alert("Recieved an airdrop for 5SOL!!!");
                         await getBalance();
                      } catch (err) {
                         alert("Either you hit the max limit for airdrops today or the faucet has run dry.");
                         console.log("Error while recieving airdrop: " + err);
                      }
                   }
                }}
            >
                <ArrowDownLeft size={16} className={balance === 0 ? "animate-bounce" : ""} />
                <span>Airdrop</span>
            </button>
         </div>
      </div>
   )
}
