import { Send, X, Loader2 } from "lucide-react"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"

export function SendModal({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}) {
    if (!open) return null

    const wallet = useWallet();
    const { connection } = useConnection();

    const [loading, setLoading] = useState<boolean>(false);

    const addressRef = useRef<HTMLInputElement | null>(null);
    const amountRef = useRef<HTMLInputElement | null>(null);

    async function sendSOL() {
        if (!wallet.publicKey) {
            alert("Wallet not connected")
            return
        }
        const toValue = addressRef.current?.value;
        const amountValue = amountRef.current?.value;
        if (!toValue || !amountValue) {
            alert("Please fill in all fields")
            return
        }

        const transaction = new Transaction()

        try {
            setLoading(true)
            transaction.add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(toValue),
                lamports: Number(amountValue) * LAMPORTS_PER_SOL
            }))

            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = (
                await connection.getLatestBlockhash()
            ).blockhash

            const sig = await wallet.sendTransaction(transaction, connection);
            alert(`Sent amt:${amountValue} to ${toValue}\n Txn: ${sig}`)
        } catch (err) {
            alert("Error while sending this transaction: " + err);
            console.log("Error while sending this transaction: " + err);
        } finally{
            setLoading(false);
        }

    }

    return (
        <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white dark:bg-zinc-900 w-[420px] rounded-2xl shadow-2xl p-8 flex flex-col gap-6 text-foreground"
            >
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold text-center">Send SOL</h2>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col text-left gap-1">
                        <label htmlFor="addr" className="text-sm font-medium">
                            Recipient Address
                        </label>
                        <input
                            id="addr"
                            className="px-4 py-2 rounded-lg border border-foreground/20 bg-transparent 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            placeholder="Enter recipient address"
                            type="text"
                            ref={addressRef}
                        />
                    </div>

                    <div className="flex flex-col text-left gap-1">
                        <label htmlFor="amt" className="text-sm font-medium">
                            Amount (SOL)
                        </label>
                        <input
                            id="amt"
                            className="px-4 py-2 rounded-lg border border-foreground/20 bg-transparent 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            placeholder="Enter amount to send"
                            type="number"
                            min="0"
                            ref={amountRef}
                        />
                    </div>
                </div>

                <button
                    className="w-full mt-4 flex items-center justify-center gap-2 
                     px-4 py-3 rounded-xl font-medium bg-foreground
                     hover:opacity-90 text-background cursor-pointer white shadow-lg transition"
                    onClick={sendSOL}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 text-background animate-spin" size={18} />Sending...
                        </>
                    ) : (
                        <>
                            <Send size={20} /> Send SOL
                        </>
                    )}

                </button>
            </div>
        </div>
    )
}
