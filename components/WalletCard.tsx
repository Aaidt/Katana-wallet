"use client"

import { useEffect, useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"

export function WalletCard() {

    const { connection } = useConnection();
    const wallet = useWallet();

    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        async function getBalance() {
            if (wallet.publicKey) {
                const newBalance = await connection.getBalance(wallet.publicKey);
                setBalance(newBalance);
            }
        }
        getBalance();
    }, [wallet.publicKey, connection])

    async function refreshBalance(){
        if(!wallet.publicKey) return 

        const newBalance = await connection.getBalance(wallet.publicKey);
        setBalance(newBalance);
    }


    return <div>
        <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Wallet Dashboard</h2>
            <p className="text-muted-foreground">
                View your balances, manage tokens, and request airdrops easily.
            </p>
        </div>


        <div className="rounded-xl bg-card text-card-foreground shadow border-2">
            <div className="flex items-center justify-between p-6">
                <div className="space-y-1">
                    <div className="font-semibold leading-none tracking-tight">
                        Wallet Overview
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Manage your tokens and transactions
                    </div>
                </div>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-wallet w-8 h-8 text-primary"
                >
                    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
                </svg>
            </div>

            <div className="p-6 pt-0">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Total Balance</p>
                        <p className="text-2xl font-bold">{balance / 1000000000} SOL</p>
                    </div>

                    <button
                        className="cursor-pointer nline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors
                        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
                        [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 
                        bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                        onClick={async () => {
                            if (wallet.publicKey) {
                                try {
                                    await connection.requestAirdrop(wallet.publicKey, 5 * 1000000000)
                                    alert("Recieved an airdrop for 5SOL!!!");
                                    await refreshBalance()
                                } catch (err) {
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
}