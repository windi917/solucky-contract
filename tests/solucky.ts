import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solucky } from "../target/types/solucky";

import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

const GLOBAL_AUTHORITY_SEED = "global-authority";

describe("solucky", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const publicKey = provider.publicKey;

  anchor.setProvider(provider);

  const program = anchor.workspace.Solucky as Program<Solucky>;

  it("Is initialized!", async () => {
    // Add your test here.
    const [globalAuthority, bump] = await PublicKey.findProgramAddressSync(
      [Buffer.from(GLOBAL_AUTHORITY_SEED)],
      program.programId
    );

    console.log("Global Authority: ", globalAuthority);
    console.log("Admin: ", publicKey);

    let tx = new Transaction();

    const ix = await program.methods.initialize().accounts({
      admin: publicKey,
      globalAuthority,
      systemProgram: SystemProgram.programId,
    }).instruction();
    tx.add(ix);

    tx.feePayer = publicKey;
    tx.recentBlockhash = (await provider.connection.getLatestBlockhash()).blockhash;
    console.log("Recent Block Hash: ", tx.recentBlockhash);
    const signedTx = await provider.wallet.signTransaction(tx);
    console.log("Signed TX: ", signedTx);
    const txId = await program.provider.connection.sendRawTransaction(signedTx.serialize(), { skipPreflight: true });

    console.log("Transaction Signature: ", txId);

  });
});

