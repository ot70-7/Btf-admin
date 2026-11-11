import {
  COptionPublicKeyLayout
} from "./chunk-6YHESE6Y.js";
import {
  TokenInstruction,
  addSigners
} from "./chunk-NSHW2634.js";
import {
  TOKEN_PROGRAM_ID
} from "./chunk-G3HNJYJA.js";
import {
  TransactionInstruction,
  __toESM,
  require_Layout
} from "./chunk-WXGNZ34X.js";

// node_modules/@solana/spl-token/lib/esm/instructions/setAuthority.js
var import_buffer_layout = __toESM(require_Layout(), 1);
var AuthorityType;
(function(AuthorityType2) {
  AuthorityType2[AuthorityType2["MintTokens"] = 0] = "MintTokens";
  AuthorityType2[AuthorityType2["FreezeAccount"] = 1] = "FreezeAccount";
  AuthorityType2[AuthorityType2["AccountOwner"] = 2] = "AccountOwner";
  AuthorityType2[AuthorityType2["CloseAccount"] = 3] = "CloseAccount";
  AuthorityType2[AuthorityType2["TransferFeeConfig"] = 4] = "TransferFeeConfig";
  AuthorityType2[AuthorityType2["WithheldWithdraw"] = 5] = "WithheldWithdraw";
  AuthorityType2[AuthorityType2["CloseMint"] = 6] = "CloseMint";
  AuthorityType2[AuthorityType2["InterestRate"] = 7] = "InterestRate";
  AuthorityType2[AuthorityType2["PermanentDelegate"] = 8] = "PermanentDelegate";
  AuthorityType2[AuthorityType2["ConfidentialTransferMint"] = 9] = "ConfidentialTransferMint";
  AuthorityType2[AuthorityType2["TransferHookProgramId"] = 10] = "TransferHookProgramId";
  AuthorityType2[AuthorityType2["ConfidentialTransferFeeConfig"] = 11] = "ConfidentialTransferFeeConfig";
  AuthorityType2[AuthorityType2["MetadataPointer"] = 12] = "MetadataPointer";
  AuthorityType2[AuthorityType2["GroupPointer"] = 13] = "GroupPointer";
  AuthorityType2[AuthorityType2["GroupMemberPointer"] = 14] = "GroupMemberPointer";
  AuthorityType2[AuthorityType2["ScaledUiAmountConfig"] = 15] = "ScaledUiAmountConfig";
  AuthorityType2[AuthorityType2["PausableConfig"] = 16] = "PausableConfig";
  AuthorityType2[AuthorityType2["PermissionedBurn"] = 17] = "PermissionedBurn";
})(AuthorityType || (AuthorityType = {}));
var setAuthorityInstructionData = (0, import_buffer_layout.struct)([
  (0, import_buffer_layout.u8)("instruction"),
  (0, import_buffer_layout.u8)("authorityType"),
  new COptionPublicKeyLayout("newAuthority")
]);
function createSetAuthorityInstruction(account, currentAuthority, authorityType, newAuthority, multiSigners = [], programId = TOKEN_PROGRAM_ID) {
  const keys = addSigners([{ pubkey: account, isSigner: false, isWritable: true }], currentAuthority, multiSigners);
  const data = Buffer.alloc(35);
  setAuthorityInstructionData.encode({
    instruction: TokenInstruction.SetAuthority,
    authorityType,
    newAuthority
  }, data);
  return new TransactionInstruction({
    keys,
    programId,
    data: data.subarray(0, setAuthorityInstructionData.getSpan(data))
  });
}

export {
  AuthorityType,
  createSetAuthorityInstruction
};
//# sourceMappingURL=chunk-IMPSMUIZ.js.map
