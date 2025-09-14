import { Send } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

export function SendModal({
    open,
    setOpen
}: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}) {


    return (open &&
        <div onClick={() => {
            setOpen(false)
        }} className="fixed top-0 left-0 h-screen w-screen bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center">
            <div onClick={(e) => e.stopPropagation()} className="bg-background rounded-md w-120 h-80 flex flex-col text-foreground 
                    p-6 items-center">
                <div className="font-bold text-4xl m-6 text-foreground">Send SOL</div>

                <div className="flex flex-col gap-5 items-center">
                    <div className="flex gap-3 items-center">
                        <label htmlFor="addr">address</label>
                        <input id="addr" className="px-3 py-2 text-sm border border-foreground/20 rounded"
                            placeholder="Enter recievers address" type="string" />
                    </div>

                    <div className="flex gap-3 items-center">
                        <label htmlFor="amt">Amt</label>
                        <input id="amount" className="px-3 py-2 text-sm border border-foreground/20 rounded"
                            placeholder="Enter amount to send" type="string" />
                    </div>

                </div>

                <button className="cursor-pointer hover:bg-foreground/80 px-3 py-2 bg-foreground text-background flex gap-2 items-center rounded m-5">
                    Send<Send size={20} strokeWidth="1.4" />
                </button>

            </div>
        </div>
    )
}