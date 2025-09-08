import { motion } from 'framer-motion'
import { Keypair } from "@solana/web3.js"
import { Wallet } from "@/components/Wallet"
import nacl from "tweetnacl"
import { generateMnemonic, mnemonicToSeedSync } from 'bip39'
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { derivePath } from "ed25519-hd-key";

const mnemonic = generateMnemonic();
let phrases: string[] = []
mnemonic.split(" ").map((phrase) => {
    phrases.push(phrase)
})

const seed = mnemonicToSeedSync(mnemonic)
for (let i = 0; i < 4; i++) {
    const path = `m/44'/501'/${i}'/0'`; // This is the derivation path
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
}


export function Sol() {

    const [generate, setGenerate] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [wallets, setWallets] = useState<{ id: number, keypair: Keypair }[]>([])

    const initial = { opacity: 0, y: -40 }
    const whileInView = { opacity: 1, y: 0 }
    const viewport = { once: true }
    const transition = { duration: 0.2 }

    return (
        <div>
            <div className="flex flex-col gap-2 p-16">
                <motion.div
                    initial={initial}
                    whileInView={whileInView}
                    viewport={viewport}
                    transition={transition}
                >
                    <div className="text-white font-bold text-4xl">
                        Secret Recovery Phrase
                    </div>

                    <div className="text-gray-400 text-md">
                        Your secret recovery phrase is used to recover your wallet if you forget your password.
                    </div>

                    <div className="flex items-center">
                        <div>
                            <input type="text" className="border border-gray-700 w-240 text-white font-thin rounded-md p-2"
                                placeholder="Enter your secret recovery phrase (or leave blank to generate)" />
                        </div>

                        <div>
                            <button
                                className="bg-white ml-4 cursor-pointer rounded-md duration-200 transition-all px-7 py-3 text-md text-black hover:bg-white/80"
                                onClick={() => {
                                    setGenerate(true)
                                }}
                            >
                                Generate Wallet
                            </button>
                        </div>
                    </div>
                </motion.div>

                {generate && (
                    <motion.div
                        initial={initial}
                        whileInView={whileInView}
                        viewport={viewport}
                        transition={transition}
                    >
                        <div className="mt-10 p-10 border border-gray-400/30 rounded-md ">
                            <div className="flex items-center justify-between">
                                <h1 className="font-medium text-3xl ">Your secret phrase</h1>
                                {isVisible ? <Eye
                                    onClick={() => {
                                        setIsVisible(false)
                                    }} className='cursor-pointer'
                                /> :
                                    <EyeOff
                                        onClick={() => {
                                            setIsVisible(true)
                                        }} className='cursor-pointer'
                                    />}
                            </div>

                            {isVisible ? (
                                <motion.div
                                    initial={initial}
                                    whileInView={whileInView}
                                    viewport={viewport}
                                    transition={transition}
                                >
                                    <div className="grid grid-cols-4 grid-rows-3 gap-2 pt-6">
                                        {phrases.map((phrase, index) => {
                                            return (
                                                <div key={index} className="border border-gray-400/10 bg-gray-400/10 text-center
                            text-md font-medium gap-2 rounded-md p-5 hover:bg-gray-500/30 duration-200 transition-all">
                                                    {phrase}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </motion.div>
                            ) : null
                            }
                        </div>

                        <div className=" pt-10 flex justify-between">
                            <div className="text-4xl font-bold">
                                Solana wallet
                            </div>

                            <div>
                                <button
                                    className="bg-white ml-4 cursor-pointer text-sm rounded-md duration-200 transition-all px-4 py-3 text-md text-black hover:bg-white/80"
                                    onClick={() => {
                                        setWallets(prev => [
                                            ...prev,
                                            { id: prev.length + 1, keypair: Keypair.generate() }
                                        ])
                                    }}
                                >Add wallet
                                </button>
                                <button
                                    className="bg-red-900 cursor-pointer text-white text-sm ml-4 rounded-md duration-200 transition-all px-4 py-3 text-md text-black hover:bg-red-900/80"
                                    onClick={() => {
                                        setWallets([])
                                    }}
                                >Clear wallets</button>
                            </div>
                        </div>


                        {wallets.map((wallet) => (
                            <Wallet key={wallet.id} n={wallet.id} keypair={wallet.keypair} />
                        ))}

                    </motion.div >

                )}
            </div>
        </div >
    );
}
