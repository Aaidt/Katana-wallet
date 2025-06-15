export function Eth() {
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

            <div className="text-white text-sm"></div>
        </div>
    );
}