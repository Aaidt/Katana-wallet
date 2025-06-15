import { ethers } from "ethers";
import { generateMnemonic } from 'bip39'


export async function Eth() {

    const wallet = ethers.Wallet.createRandom();

    const publicKey = wallet.address;
    const privateKey = wallet.privateKey;

    console.log("Public Key (Address):", publicKey);
    console.log("Private Key:", privateKey);

    const message = "hello world";

    const signature = await wallet.signMessage(message);
    console.log("Signature:", signature);

    const recoveredAddress = ethers.verifyMessage(message, signature);

    console.log("Recovered Address:", recoveredAddress);
    console.log("Signature is valid:", recoveredAddress === publicKey);

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
                <input type="text" className="border border-gray-700 w-240 text-white rounded-md p-2" placeholder="Enter your secret recovery phrase" />
                <button
                    className="bg-white ml-4 rounded-md duration-200 transition-all px-7 py-3 text-md text-black hover:bg-white/80"
                >
                    Generate Wallet
                </button>
            </div>

            <div className="mt-10 p-6 border border-gray-400 rounded-md ">
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

        </div>
    );
}