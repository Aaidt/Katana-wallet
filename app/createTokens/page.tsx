"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, Transaction, SystemProgram } from "@solana/web3.js";
import { TOKEN_2022_PROGRAM_ID, getMintLen, createInitializeMetadataPointerInstruction, createMintToInstruction, createInitializeMintInstruction, TYPE_SIZE, LENGTH_SIZE, ExtensionType, getAssociatedTokenAddress, getAssociatedTokenAddressSync, createAssociatedTokenAccountInstruction } from "@solana/spl-token"
import { pack, createInitializeInstruction } from "@solana/spl-token-metadata";
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
      const metadata = {
         mint: mintKeyPair.publicKey,
         name: nameRef.current?.value!,
         symbol: symbolRef.current?.value!,
         uri: "https://cdn.100xdevs.com/metadata.json",
         additionalMetadata: []
      }

      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

      const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

      const transaction = new Transaction().add(
         SystemProgram.createAccount({
            fromPubkey: wallet.publicKey!,
            newAccountPubkey: mintKeyPair.publicKey!,
            space: mintLen,
            lamports,
            programId: TOKEN_2022_PROGRAM_ID
         }),
         createInitializeMetadataPointerInstruction(mintKeyPair.publicKey, wallet.publicKey, mintKeyPair.publicKey, TOKEN_2022_PROGRAM_ID),
         createInitializeMintInstruction(mintKeyPair.publicKey, 9, wallet.publicKey!, null, TOKEN_2022_PROGRAM_ID),
         createInitializeInstruction({
            programId: TOKEN_2022_PROGRAM_ID,
            mint: mintKeyPair.publicKey,
            metadata: mintKeyPair.publicKey,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mintAuthority: wallet.publicKey!,
            updateAuthority: wallet.publicKey!
         })
      );
      transaction.feePayer = wallet.publicKey!;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
      transaction.partialSign(mintKeyPair);

      await wallet.sendTransaction(transaction, connection);
      console.log(`Token mint created at ${mintKeyPair.publicKey.toBase58()}`)

      const associatedToken = getAssociatedTokenAddressSync(
         mintKeyPair.publicKey,
         wallet.publicKey!,
         false,
         TOKEN_2022_PROGRAM_ID
      );

      console.log(associatedToken.toBase58());
      const transaction2 = new Transaction().add(
         createAssociatedTokenAccountInstruction(
            wallet.publicKey!,
            associatedToken,
            wallet.publicKey!,
            mintKeyPair.publicKey,
            TOKEN_2022_PROGRAM_ID,
         ),
      );

      await wallet.sendTransaction(transaction2, connection);

      const transaction3 = new Transaction().add(
         createMintToInstruction(mintKeyPair.publicKey, associatedToken, wallet.publicKey!, 1000000000, [], TOKEN_2022_PROGRAM_ID)
      );

      await wallet.sendTransaction(transaction3, connection);
   }

   return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
         <div className="w-full max-w-md rounded-2xl border border-foreground/10 bg-card p-8 shadow-md">
            <h1 className="mb-6 text-center text-2xl font-semibold text-foreground">
               🚀 Token LaunchPad
            </h1>

            <div className="space-y-4">
               <input
                  ref={nameRef}
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  onKeyDown={(e) => {
                     if (e.key === "Enter") symbolRef.current?.focus();
                  }}
               />

               <input
                  ref={symbolRef}
                  type="text"
                  placeholder="Symbol"
                  className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  onKeyDown={(e) => {
                     if (e.key === "Enter") imageRef.current?.focus();
                  }}
               />

               <input
                  ref={imageRef}
                  type="text"
                  placeholder="Image URL"
                  className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  onKeyDown={(e) => {
                     if (e.key === "Enter") initialSupply.current?.focus();
                  }}
               />

               <input
                  ref={initialSupply}
                  type="text"
                  placeholder="Initial Supply"
                  className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  onKeyDown={async (e) => {
                     if (e.key === "Enter") await createToken();
                  }}
               />
            </div>

            <button
               onClick={createToken}
               className="mt-6 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground 
                    cursor-pointer transition-colors hover:bg-primary/90"
            >
               Create Token
            </button>
         </div>
      </div>
   );


}
