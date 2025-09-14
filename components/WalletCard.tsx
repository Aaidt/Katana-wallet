"use client"


import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useState, useEffect } from "react";

interface axiosResponse {
    solana: {
        usd: number
    }
}

export function WalletCard() {

    const [balance, setBalance] = useState<number>(0)
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [usd, setUsd] = useState<number>(0);

    const { connection } = useConnection()
    const wallet = useWallet();

    useEffect(() => {
        getBalance();
    }, [connection, wallet]);

    useEffect(() => {
        getCurrentSOLToUSDPrice();
    }, []) 

    useEffect(() => {
        setUsd(balance/1e9 * currentPrice);
    }, [balance, currentPrice])

    async function getBalance() {
        if (!wallet.publicKey) return;
        const currentBalance = await connection.getBalance(wallet.publicKey);

        setBalance(currentBalance);
    }

    async function getCurrentSOLToUSDPrice() {
        try{
            const response = await axios.get<axiosResponse>("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=solana")
            setCurrentPrice(response.data.solana.usd);
        }catch(err){
            console.log("Error in fetching the current price: " + err);
        }
        if (balance) {
            setUsd(currentPrice * balance / 1e9)
        }

    }


    return (
        <div>
            <div className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-100 via-blue-800 to-pink-900 bg-clip-text text-transparent">
                    Katana Wallet
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Securely manage your Solana assets on Devnet & Mainnet
                </p>
            </div>

            <div className="rounded-xl bg-transparent text-card-foreground shadow border-2">
                <div className="flex items-center justify-between p-6">
                    <div className="space-y-1">
                        <div className="font-semibold leading-none tracking-tight">
                            Wallet Overview
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Manage your tokens and transactions
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-0">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Total Balance</p>
                            <p className="text-2xl font-bold">{(balance / 1e9).toFixed(4)} SOL</p>
                            <p className="text-lg text-muted-foreground">
                                ≈ ${usd.toFixed(2)} USD
                            </p>
                        </div>

                        <button
                            className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors
                            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
                            [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 
                            bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                            onClick={async () => {
                                if (wallet.publicKey) {
                                    try {
                                        await connection.requestAirdrop(wallet.publicKey, 5 * 1e9)
                                        alert("Recieved an airdrop for 5SOL!!!");
                                        await getBalance()
                                    } catch (err) {
                                        alert("Either you hit the max limit for airdrops today or the faucet has run dry.")
                                        console.log("Error while recieving airdrop: " + err);
                                    }
                                }
                            }}
                        >
                            Get Airdrop
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}