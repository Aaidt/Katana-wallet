"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { SquareArrowDownLeft, Send } from "lucide-react";
import { SendModal } from "./SendModal";
import Image from "next/image";

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
        <div>
            <SendModal open={modalOpen} setOpen={setModalOpen} />
            <div className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-100 via-blue-800 to-pink-900 
                bg-clip-text text-transparent">
                    Katana Wallet
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Securely manage your Solana assets on Devnet & Mainnet
                </p>
            </div>

            <div className="flex flex-col justify-center items-center">
                <div className="w-[380px] rounded-2xl p-6 bg-white/80 dark:bg-zinc-900/80 
                border border-foreground/40 dark:border-foreground/20 shadow-xl backdrop-blur-md text-center space-y-6">

                    <div className="flex flex-col items-center gap-3">
                        <Image
                            src="https://i.pinimg.com/1200x/6f/65/ac/6f65ac68dee4841a75026411fe8e09a8.jpg"
                            alt="Solana Logo"
                            width={48}
                            height={48}
                            className="rounded-full "
                        />
                        <p className="text-3xl font-bold text-foreground">
                            {(balance / 1e9).toFixed(4)} <span className="text-purple-400">SOL</span>
                        </p>
                        <p className="text-lg text-muted-foreground">
                            ≈ ${usd.toFixed(2)} USD
                        </p>
                    </div>

                    <div className="h-px w-full bg-foreground/20" />

                    <div className="flex gap-4 w-full">
                        <button
                            className="flex-1 cursor-pointer flex items-center justify-center gap-2 text-sm font-medium 
                                rounded-md bg-foreground hover:opacity-90 px-4 py-3 text-background shadow-lg transition"
                            onClick={() => setModalOpen(true)}
                        >
                            <Send size={18} /> Send
                        </button>

                        <button
                            className="flex-1 cursor-pointer flex items-center justify-center gap-2 text-sm font-medium 
                                rounded-md bg-foreground hover:opacity-90 px-4 py-3 text-background shadow-lg transition"
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
                            <SquareArrowDownLeft size={18} /> Airdrop
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}