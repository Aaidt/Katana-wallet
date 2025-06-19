import { Keypair } from "@solana/web3.js"
import bs58 from 'bs58'

export function Wallet({ n }: { n: number | null }) {
    const keypair = Keypair.generate();
    const publicKey = keypair.publicKey.toString();
    const privateKey = keypair.secretKey;
    const privateKeyBase58 = bs58.encode(privateKey)

    if (n === null) return null;
    return <div className="flex flex-col">
        <div className="border border-white/30 rounded-2xl p-8 mt-8">
            <div className="text-3xl font-medium">
                Wallet {n}
            </div>

        </div>
        <div className="z-50 bg-white/10 rounded-2xl p-8 mt-5">
            <div className="text-xl font-medium">Public Key:</div>
            <div>{publicKey}</div>
            <br />
            <div className="text-xl font-medium">Private Key:</div>
            <div>{privateKeyBase58}</div>
        </div>
    </div>
}