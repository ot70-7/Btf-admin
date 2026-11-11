import {
  COptionPublicKeyLayout
} from "./chunk-IQQJNEIU.js";
import {
  TokenInstruction,
  addSigners
} from "./chunk-RH3JLWDI.js";
import {
  TOKEN_PROGRAM_ID,
  publicKey,
  u64
} from "./chunk-ONAMLBMU.js";
import {
  TransactionInstruction,
  __toESM,
  require_Layout
} from "./chunk-WXGNZ34X.js";

// node_modules/@solana/spl-token/lib/esm/instructions/initializeMint2.js
var import_buffer_layout = __toESM(require_Layout(), 1);
var initializeMint2InstructionData = (0, import_buffer_layout.struct)([
  (0, import_buffer_layout.u8)("instruction"),
  (0, import_buffer_layout.u8)("decimals"),
  publicKey("mintAuthority"),
  new COptionPublicKeyLayout("freezeAuthority")
]);
function createInitializeMint2Instruction(mint, decimals, mintAuthority, freezeAuthority, programId = TOKEN_PROGRAM_ID) {
  const keys = [{ pubkey: mint, isSigner: false, isWritable: true }];
  const data = Buffer.alloc(67);
  initializeMint2InstructionData.encode({
    instruction: TokenInstruction.InitializeMint2,
    decimals,
    mintAuthority,
    freezeAuthority
  }, data);
  return new TransactionInstruction({
    keys,
    programId,
    data: data.subarray(0, initializeMint2InstructionData.getSpan(data))
  });
}

// node_modules/@solana/spl-token/lib/esm/instructions/mintTo.js
var import_buffer_layout2 = __toESM(require_Layout(), 1);
var mintToInstructionData = (0, import_buffer_layout2.struct)([(0, import_buffer_layout2.u8)("instruction"), u64("amount")]);
function createMintToInstruction(mint, destination, authority, amount, multiSigners = [], programId = TOKEN_PROGRAM_ID) {
  const keys = addSigners([
    { pubkey: mint, isSigner: false, isWritable: true },
    { pubkey: destination, isSigner: false, isWritable: true }
  ], authority, multiSigners);
  const data = Buffer.alloc(mintToInstructionData.span);
  mintToInstructionData.encode({
    instruction: TokenInstruction.MintTo,
    amount: BigInt(amount)
  }, data);
  return new TransactionInstruction({ keys, programId, data });
}

export {
  createInitializeMint2Instruction,
  createMintToInstruction
};
//# sourceMappingURL=chunk-SVCS7MIT.js.map
