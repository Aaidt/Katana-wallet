import { Keypair } from "@solana/web3.js"
import { Eye, EyeOff } from 'lucide-react'
import bs58 from 'bs58'
import { useState } from 'react'

export function Wallet({ n }: { n: number | null }) {
    const keypair = Keypair.generate();
    const publicKey = keypair.publicKey.toString();
    const privateKey = keypair.secretKey;
    const privateKeyBase58 = bs58.encode(privateKey)

    const [isVisible, setIsVisible] = useState(false)

    if (n === null) return null;
    return <div className="flex flex-col items-stretch">
        <div className="border-t border-x border-white/10 rounded-b-none rounded-2xl pt-6 pl-8 pb-12 mt-8 z-10">
            <div className="text-3xl font-medium">
                Wallet {n}
            </div>
        </div>
        <div className="z-0 bg-white/10 rounded-2xl p-8 -translate-y-5">
            <div className="text-xl font-bold">Public Key:</div>
            <div>{publicKey}</div>
            <br />
            <div className="text-xl font-bold">Private Key:</div>
            {isVisible ? (
                <div className="flex justify-between">
                    <div>
                        {privateKeyBase58}
                    </div>
                    <EyeOff
                        onClick={() => {
                            setIsVisible(false)
                        }}
                    />
                </div>
            ) : (
                <div className="flex justify-between">
                    <div>*  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * 
                         *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *</div>
                    <Eye
                        onClick={() => {
                            setIsVisible(true)
                        }}
                    />
                </div>
            )}
        </div>
    </div>
}