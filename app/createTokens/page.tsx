"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, Transaction, SystemProgram } from "@solana/web3.js";
import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { useRef } from "react"

export default function createTokens() {
    const { connection } = useConnection();
    const wallet = useWallet();

    const nameRef = useRef<HTMLInputElement | null>(null);
    const symbolRef = useRef<HTMLInputElement | null>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const initialSupply = useRef<HTMLInputElement | null>(null);

    async function createToken() {
        const mintKeyPair = Keypair.generate()
        const lamports = await getMinimumBalanceForRentExemptMint(connection)

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey!,
                newAccountPubkey: mintKeyPair.publicKey!,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID
            }),
            createInitializeMint2Instruction(mintKeyPair.publicKey, 9, wallet.publicKey!, wallet.publicKey, TOKEN_PROGRAM_ID)   
        );
        transaction.feePayer = wallet.publicKey!;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
        transaction.partialSign(mintKeyPair);

        await wallet.sendTransaction(transaction, connection);
        console.log(`Token mint created at ${mintKeyPair.publicKey.toBase58()}`)
    }

    return <div className="flex flex-col items-center justify-center pt-25">

        <h1>Token LaunchPad</h1>
        <input className='px-2 py-1 rounded-sm text-sm border border-foreground/20 text-foreground bg-background' ref={nameRef}
            type='text' placeholder='Name' onKeyDown={(e) => {
                if (e.key === "Enter") {
                    symbolRef.current?.focus()
                }
            }}></input> <br />
        <input className='px-2 py-1 rounded-sm text-sm border border-foreground/20 text-foreground bg-background' ref={symbolRef}
            type='text' placeholder='Symbol' onKeyDown={(e) => {
                if (e.key === "Enter") {
                    imageRef.current?.focus();
                }
            }}></input> <br />
        <input className='px-2 py-1 rounded-sm text-sm border border-foreground/20 text-foreground bg-background' ref={imageRef}
            type='text' placeholder='Image URL' onKeyDown={(e) => {
                if (e.key === "Enter") {
                    initialSupply.current?.focus()
                }
            }}></input> <br />
        <input className='px-2 py-1 rounded-sm text-sm border border-foreground/20 text-foreground bg-background' ref={initialSupply}
            type='text' placeholder='Initial Supply' onKeyDown={async (e) => {
                if (e.key === "Enter") {
                    await createToken();
                }
            }}  ></input> <br />
        <button onClick={createToken} className='rounded-md bg-foreground text-background px-3 py-2 text-sm font-normal cursor-pointer'>
            Create a token
        </button>
    </div>

}