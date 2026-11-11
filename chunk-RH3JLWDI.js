import {
  getAssociatedTokenAddressSync,
  readTokenAmountOrZero,
  restoreWallet
} from "./chunk-ONAMLBMU.js";
import {
  PublicKey,
  getConfig
} from "./chunk-WXGNZ34X.js";

// node_modules/@solana/spl-token/lib/esm/instructions/types.js
var TokenInstruction;
(function(TokenInstruction2) {
  TokenInstruction2[TokenInstruction2["InitializeMint"] = 0] = "InitializeMint";
  TokenInstruction2[TokenInstruction2["InitializeAccount"] = 1] = "InitializeAccount";
  TokenInstruction2[TokenInstruction2["InitializeMultisig"] = 2] = "InitializeMultisig";
  TokenInstruction2[TokenInstruction2["Transfer"] = 3] = "Transfer";
  TokenInstruction2[TokenInstruction2["Approve"] = 4] = "Approve";
  TokenInstruction2[TokenInstruction2["Revoke"] = 5] = "Revoke";
  TokenInstruction2[TokenInstruction2["SetAuthority"] = 6] = "SetAuthority";
  TokenInstruction2[TokenInstruction2["MintTo"] = 7] = "MintTo";
  TokenInstruction2[TokenInstruction2["Burn"] = 8] = "Burn";
  TokenInstruction2[TokenInstruction2["CloseAccount"] = 9] = "CloseAccount";
  TokenInstruction2[TokenInstruction2["FreezeAccount"] = 10] = "FreezeAccount";
  TokenInstruction2[TokenInstruction2["ThawAccount"] = 11] = "ThawAccount";
  TokenInstruction2[TokenInstruction2["TransferChecked"] = 12] = "TransferChecked";
  TokenInstruction2[TokenInstruction2["ApproveChecked"] = 13] = "ApproveChecked";
  TokenInstruction2[TokenInstruction2["MintToChecked"] = 14] = "MintToChecked";
  TokenInstruction2[TokenInstruction2["BurnChecked"] = 15] = "BurnChecked";
  TokenInstruction2[TokenInstruction2["InitializeAccount2"] = 16] = "InitializeAccount2";
  TokenInstruction2[TokenInstruction2["SyncNative"] = 17] = "SyncNative";
  TokenInstruction2[TokenInstruction2["InitializeAccount3"] = 18] = "InitializeAccount3";
  TokenInstruction2[TokenInstruction2["InitializeMultisig2"] = 19] = "InitializeMultisig2";
  TokenInstruction2[TokenInstruction2["InitializeMint2"] = 20] = "InitializeMint2";
  TokenInstruction2[TokenInstruction2["GetAccountDataSize"] = 21] = "GetAccountDataSize";
  TokenInstruction2[TokenInstruction2["InitializeImmutableOwner"] = 22] = "InitializeImmutableOwner";
  TokenInstruction2[TokenInstruction2["AmountToUiAmount"] = 23] = "AmountToUiAmount";
  TokenInstruction2[TokenInstruction2["UiAmountToAmount"] = 24] = "UiAmountToAmount";
  TokenInstruction2[TokenInstruction2["InitializeMintCloseAuthority"] = 25] = "InitializeMintCloseAuthority";
  TokenInstruction2[TokenInstruction2["TransferFeeExtension"] = 26] = "TransferFeeExtension";
  TokenInstruction2[TokenInstruction2["ConfidentialTransferExtension"] = 27] = "ConfidentialTransferExtension";
  TokenInstruction2[TokenInstruction2["DefaultAccountStateExtension"] = 28] = "DefaultAccountStateExtension";
  TokenInstruction2[TokenInstruction2["Reallocate"] = 29] = "Reallocate";
  TokenInstruction2[TokenInstruction2["MemoTransferExtension"] = 30] = "MemoTransferExtension";
  TokenInstruction2[TokenInstruction2["CreateNativeMint"] = 31] = "CreateNativeMint";
  TokenInstruction2[TokenInstruction2["InitializeNonTransferableMint"] = 32] = "InitializeNonTransferableMint";
  TokenInstruction2[TokenInstruction2["InterestBearingMintExtension"] = 33] = "InterestBearingMintExtension";
  TokenInstruction2[TokenInstruction2["CpiGuardExtension"] = 34] = "CpiGuardExtension";
  TokenInstruction2[TokenInstruction2["InitializePermanentDelegate"] = 35] = "InitializePermanentDelegate";
  TokenInstruction2[TokenInstruction2["TransferHookExtension"] = 36] = "TransferHookExtension";
  TokenInstruction2[TokenInstruction2["MetadataPointerExtension"] = 39] = "MetadataPointerExtension";
  TokenInstruction2[TokenInstruction2["GroupPointerExtension"] = 40] = "GroupPointerExtension";
  TokenInstruction2[TokenInstruction2["GroupMemberPointerExtension"] = 41] = "GroupMemberPointerExtension";
  TokenInstruction2[TokenInstruction2["ScaledUiAmountExtension"] = 43] = "ScaledUiAmountExtension";
  TokenInstruction2[TokenInstruction2["PausableExtension"] = 44] = "PausableExtension";
  TokenInstruction2[TokenInstruction2["UnwrapLamports"] = 45] = "UnwrapLamports";
  TokenInstruction2[TokenInstruction2["PermissionedBurnExtension"] = 46] = "PermissionedBurnExtension";
})(TokenInstruction || (TokenInstruction = {}));

// node_modules/@solana/spl-token/lib/esm/instructions/internal.js
function addSigners(keys, ownerOrAuthority, multiSigners) {
  if (multiSigners.length) {
    keys.push({ pubkey: ownerOrAuthority, isSigner: false, isWritable: false });
    for (const signer of multiSigners) {
      keys.push({
        pubkey: signer instanceof PublicKey ? signer : signer.publicKey,
        isSigner: true,
        isWritable: false
      });
    }
  } else {
    keys.push({ pubkey: ownerOrAuthority, isSigner: true, isWritable: false });
  }
  return keys;
}

// src/lib/gate.js
function adminList() {
  const config = getConfig();
  return Array.isArray(config.admins) ? config.admins.filter(Boolean) : [];
}
function adminPassMint() {
  const config = getConfig();
  try {
    return localStorage.getItem("btf.adminPass") || config.adminPassMint || "";
  } catch {
    return config.adminPassMint || "";
  }
}
function rememberAdminPass(mint) {
  try {
    localStorage.setItem("btf.adminPass", mint);
  } catch {
  }
}
function createAdminGate({ area, gate, status, connection, onGranted }) {
  const bootstrap = adminList();
  const passMint = adminPassMint();
  let granted = false;
  const render = (ok, message) => {
    granted = ok;
    if (area) area.classList.toggle("hide", !ok);
    if (gate) gate.classList.toggle("hide", ok);
    if (status && message !== void 0) status.textContent = message;
    if (ok && typeof onGranted === "function") onGranted();
  };
  if (bootstrap.length === 0 && !passMint) {
    render(false, "\u914D\u7F6E\u4E2D\u6CA1\u6709\u7BA1\u7406\u5458\u5730\u5740\uFF0C\u4E5F\u6CA1\u6709\u7BA1\u7406\u51ED\u8BC1\uFF0C\u672C\u9875\u5DF2\u9501\u5B9A\u3002");
    return {
      verify: async () => false,
      check: () => false,
      isGranted: () => false,
      admins: bootstrap,
      passMint: ""
    };
  }
  render(false, "\u672C\u9875\u4EC5\u9650\u9879\u76EE\u65B9\u7BA1\u7406\u5458\u3002\u8BF7\u8FDE\u63A5\u7BA1\u7406\u5458\u94B1\u5305\u3002");
  const inList = (address) => Boolean(address) && bootstrap.includes(address);
  return {
    admins: bootstrap,
    passMint,
    isGranted: () => granted,
    /** 同步判断：仅在 bootstrap 名单内时可直接通过。 */
    check(address) {
      const ok = inList(address);
      if (ok) render(true);
      return ok;
    },
    /** 异步判断：名单 或 持有管理凭证。 */
    async verify(address) {
      if (!address) {
        render(false, "\u8BF7\u5148\u8FDE\u63A5\u94B1\u5305\u3002");
        return false;
      }
      if (inList(address)) {
        render(true);
        return true;
      }
      const mint = adminPassMint();
      if (!mint) {
        render(false, `\u5F53\u524D\u94B1\u5305 ${short(address)} \u4E0D\u662F\u7BA1\u7406\u5458\u3002`);
        return false;
      }
      try {
        const ata = getAssociatedTokenAddressSync(new PublicKey(mint), new PublicKey(address));
        const balance = await readTokenAmountOrZero(connection, ata);
        if (balance >= 1n) {
          render(true);
          return true;
        }
        render(false, `\u5F53\u524D\u94B1\u5305 ${short(address)} \u6CA1\u6709\u7BA1\u7406\u51ED\u8BC1\uFF0C\u65E0\u6CD5\u4F7F\u7528\u672C\u9875\u529F\u80FD\u3002`);
        return false;
      } catch (error) {
        render(false, `\u6821\u9A8C\u7BA1\u7406\u51ED\u8BC1\u5931\u8D25\uFF1A${error.message}`);
        return false;
      }
    }
  };
}
function short(address) {
  if (!address) return "\u2014";
  return `${address.slice(0, 4)}\u2026${address.slice(-4)}`;
}
async function restoreAdminWallet(gate) {
  const wallet = await restoreWallet();
  if (!wallet) return null;
  if (!await gate.verify(wallet.publicKey.toBase58())) return null;
  return wallet;
}

export {
  TokenInstruction,
  addSigners,
  adminList,
  adminPassMint,
  rememberAdminPass,
  createAdminGate,
  restoreAdminWallet
};
//# sourceMappingURL=chunk-RH3JLWDI.js.map
