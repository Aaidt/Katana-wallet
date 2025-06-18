import { motion } from 'framer-motion'
import { Keypair } from "@solana/web3.js"
import nacl from "tweetnacl"
import { generateMnemonic } from 'bip39'
import { useState } from "react"

export function Sol() {

    const [generate, setGenerate] = useState(false)

    const keypair = Keypair.generate();
    const publicKey = keypair.publicKey.toString();
    const privateKey = keypair.secretKey

    console.log(publicKey)
    console.log(privateKey)

    // const signature = nacl.sign.detached(message, privateKey)
    // const result = nacl.sign.detached.verify(
    //     message,
    //     signature,
    //     keypair.publicKey.toBytes()
    // )

    const mnemonic = generateMnemonic();
    let phrases: string[] = []
    for (let i = 0; i < 12; i++) {
        phrases.push(mnemonic.split(" ")[i])
    }

    return (
        <div>
            <div className="flex flex-col gap-2 p-16">
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="text-white font-bold text-4xl">
                        Secret Recovery Phrase
                    </div>

                    <div className="text-gray-400 text-md">
                        Your secret recovery phrase is used to recover your wallet if you forget your password.
                    </div>

                    <div className="flex items-center">
                        <div>
                            <input type="text" className="border border-gray-700 w-240 text-white rounded-md p-2"
                                placeholder="Enter your secret recovery phrase (or leave blank to generate)" />
                        </div>

                        <div>
                            <button
                                className="bg-white ml-4 rounded-md duration-200 transition-all px-7 py-3 text-md text-black hover:bg-white/80"
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
                        initial={{ opacity: 0, y: -80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="mt-10 p-10 border border-gray-400/30 rounded-md ">
                            <h1 className="font-medium text-3xl ">Your secret phrase</h1>

                            <div className="grid grid-cols-4 grid-rows-3 gap-2 pt-6">
                                {phrases.map((phrase, index) => {
                                    return (
                                        <div key={index} className="border border-gray-400/10 bg-gray-400/10 text-center
                            text-md font-medium gap-2 rounded-md p-5 cursor-pointer hover:bg-gray-500/30 duration-200 transition-all">
                                            {phrase}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className=" pt-10 flex justify-between">
                            <div className="text-4xl">
                                Solana wallet
                            </div>

                            <div>
                                <button
                                    className="bg-white ml-4 rounded-md duration-200 transition-all px-7 py-3 text-md text-black hover:bg-white/80"
                                >Add wallet</button>
                                <button
                                    className="bg-red-900 text-white ml-4 rounded-md duration-200 transition-all px-7 py-3 text-md text-black hover:bg-red-900/80"
                                >Delete wallet</button>
                            </div>
                        </div>
                    </motion.div >

                )}
            </div>
        </div >
    );
}