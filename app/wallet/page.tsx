import Header from "@/components/Header";
import { WalletCard } from "@/components/WalletCard";

export default function Wallet() {
    return (
        <div>
            <Header />

            <div className="pt-20 m-8">
                <WalletCard />
            </div>


        </div>

    );
}