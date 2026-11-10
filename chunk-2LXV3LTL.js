import {
  TokenInstruction,
  addSigners
} from "./chunk-3LL4RXX2.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  u64
} from "./chunk-6SBUITAN.js";
import {
  SystemProgram,
  TransactionInstruction,
  __toESM,
  require_Layout
} from "./chunk-WXGNZ34X.js";

// node_modules/@solana/spl-token/lib/esm/instructions/associatedTokenAccount.js
function createAssociatedTokenAccountIdempotentInstruction(payer, associatedToken, owner, mint, programId = TOKEN_PROGRAM_ID, associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID) {
  return buildAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, Buffer.from([1]), programId, associatedTokenProgramId);
}
function buildAssociatedTokenAccountInstruction(payer, associatedToken, owner, mint, instructionData, programId = TOKEN_PROGRAM_ID, associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID) {
  const keys = [
    { pubkey: payer, isSigner: true, isWritable: true },
    { pubkey: associatedToken, isSigner: false, isWritable: true },
    { pubkey: owner, isSigner: false, isWritable: false },
    { pubkey: mint, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    { pubkey: programId, isSigner: false, isWritable: false }
  ];
  return new TransactionInstruction({
    keys,
    programId: associatedTokenProgramId,
    data: instructionData
  });
}

// node_modules/@solana/spl-token/lib/esm/instructions/transfer.js
var import_buffer_layout = __toESM(require_Layout(), 1);
var transferInstructionData = (0, import_buffer_layout.struct)([(0, import_buffer_layout.u8)("instruction"), u64("amount")]);
function createTransferInstruction(source, destination, owner, amount, multiSigners = [], programId = TOKEN_PROGRAM_ID) {
  const keys = addSigners([
    { pubkey: source, isSigner: false, isWritable: true },
    { pubkey: destination, isSigner: false, isWritable: true }
  ], owner, multiSigners);
  const data = Buffer.alloc(transferInstructionData.span);
  transferInstructionData.encode({
    instruction: TokenInstruction.Transfer,
    amount: BigInt(amount)
  }, data);
  return new TransactionInstruction({ keys, programId, data });
}

export {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferInstruction
};
//# sourceMappingURL=chunk-2LXV3LTL.js.map
