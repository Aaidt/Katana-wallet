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
        <div className="flex flex-col gap-2 p-16">
            <div className="text-white font-bold text-4xl">
                Secret Recovery Phrase
            </div>

            <div className="text-gray-400 text-md">
                Your secret recovery phrase is used to recover your wallet if you forget your password.
            </div>

            <div className="flex">
                <input type="text" className="border border-gray-700 w-240 text-white rounded-md p-2"
                    placeholder="Enter your secret recovery phrase (or leave blank to generate)" />
                <button
                    className="bg-white ml-4 rounded-md duration-200 transition-all px-7 py-3 text-md text-black hover:bg-white/80"
                    onClick={() => {
                        setGenerate(true)
                    }}
                >
                    Generate Wallet
                </button>
            </div>
            {generate && (

                <div className="mt-10 p-10 border border-gray-400/30 rounded-md ">
                    <h1 className="font-medium text-3xl ">Your secret phrase</h1>

                    <div className="grid grid-cols-4 grid-rows-3 gap-2 pt-6">
                        {phrases.map((phrase, index) => {
                            return (
                                <div key={index} className="border border-gray-400/20 bg-gray-400/10 text-center
                            text-md font-medium gap-2 rounded-md p-5 cursor-pointer hover:bg-gray-500/30 duration-200 transition-all">
                                    {phrase}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}