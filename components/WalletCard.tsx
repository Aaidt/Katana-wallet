

export function WalletCard() {
    return <div className="rounded-xl bg-card text-card-foreground shadow border-2">
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
                    <p className="text-2xl font-bold"></p>
                </div>

                <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
          [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 
          bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                >
                    Get Airdrop
                </button>
            </div>
        </div>
    </div>
}