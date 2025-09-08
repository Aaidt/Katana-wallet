import Link from 'next/link'

export function Footer() {
    return (
        <div className="bottom-0 w-full">
            <div className="m-8 border-t border-white/20">
                <div className="text-white font-thin m-8 text-md flex gap-1">
                    Design inspired by
                    <Link target="_blank"
                        className="hover:underline hover: underline-offset-4 duration-200 transition-all font-bold"
                        href="https://wallet-kosh.vercel.app/">Kosh.</Link>
                    Coded by
                    <Link target="_blank"
                        className="hover:underline hover: underline-offset-4 duration-200 transition-all font-bold"
                        href="https://github.com/Aaidt/Katana-wallet">Aadit.</Link>
                </div>
            </div>
        </div>
    )
}
