import {
  AuthorityType,
  createSetAuthorityInstruction
} from "./chunk-62AUFYRB.js";
import "./chunk-IQQJNEIU.js";
import {
  createAdminGate,
  restoreAdminWallet
} from "./chunk-RH3JLWDI.js";
import {
  $,
  chooseWallet,
  connectWallet,
  detectProviders,
  el,
  getConnection,
  reviewTransaction,
  setStatus,
  shorten,
  signAndSend,
  toast,
  walletHint,
  withBusy
} from "./chunk-ONAMLBMU.js";
import {
  PublicKey,
  Transaction,
  getConfig
} from "./chunk-WXGNZ34X.js";

// src/revoke.js
var config = getConfig();
var connection = getConnection();
var state = { wallet: null, mint: config.token.mint };
var gate = null;
init();
function init() {
  gate = createAdminGate({
    area: $("#admin-area"),
    gate: $("#gate"),
    status: $("#gate-status"),
    connection,
    onGranted: () => refreshAuthorities()
  });
  $("#gate-connect").addEventListener("click", onConnect);
  $("#connect").addEventListener("click", onConnect);
  $("#revoke-mint").addEventListener("click", () => revoke("mint"));
  $("#revoke-freeze").addEventListener("click", () => revoke("freeze"));
  $("#build").textContent = window.__AURA_BUILD__ ? `\u6784\u5EFA ${window.__AURA_BUILD__}` : "";
  if (!state.mint) {
    setStatus("\u914D\u7F6E\u91CC\u6CA1\u6709 Mint \u5730\u5740\uFF0C\u65E0\u6CD5\u7EE7\u7EED\u3002", "error");
    $("#revoke-mint").disabled = true;
    $("#revoke-freeze").disabled = true;
    return;
  }
  if (detectProviders().length === 0) {
    $("#connect").textContent = "\u5728\u94B1\u5305\u4E2D\u6253\u5F00";
    setStatus(walletHint(), "error");
  }
  refreshAuthorities();
  restoreSession();
}
async function restoreSession() {
  const wallet = await restoreAdminWallet(gate);
  if (!wallet) return;
  state.wallet = wallet;
  $("#connect").textContent = shorten(wallet.publicKey.toBase58());
}
async function refreshAuthorities() {
  try {
    const info = await connection.getParsedAccountInfo(new PublicKey(state.mint), "confirmed");
    const parsed = info.value?.data?.parsed?.info;
    if (!parsed) {
      setStatus("\u8BFB\u4E0D\u5230\u8BE5 Mint\uFF0C\u8BF7\u68C0\u67E5 RPC \u6216\u5730\u5740\u3002", "error");
      return;
    }
    const mintAuthority = parsed.mintAuthority ?? null;
    const freezeAuthority = parsed.freezeAuthority ?? null;
    $("#authorities").replaceChildren(
      row("Mint \u5730\u5740", state.mint),
      row("\u5C0F\u6570\u4F4D / \u4F9B\u5E94\u91CF", `${parsed.decimals} / ${parsed.supply}`),
      row("Mint Authority", mintAuthority ? `${shorten(mintAuthority, 6, 6)}\uFF08\u53EF\u589E\u53D1\uFF09` : "\u65E0\uFF08\u5DF2\u64A4\u9500\uFF09"),
      row("Freeze Authority", freezeAuthority ? `${shorten(freezeAuthority, 6, 6)}\uFF08\u53EF\u51BB\u7ED3\uFF09` : "\u65E0\uFF08\u5DF2\u64A4\u9500\uFF09")
    );
    $("#revoke-mint").disabled = !mintAuthority;
    $("#revoke-freeze").disabled = !freezeAuthority;
    if (!mintAuthority && !freezeAuthority) {
      setStatus("\u4E24\u9879\u6743\u9650\u5747\u5DF2\u64A4\u9500\uFF0C\u4F9B\u5E94\u91CF\u4E0E\u51BB\u7ED3\u80FD\u529B\u6C38\u4E45\u56FA\u5B9A\u3002", "ok");
    } else {
      setStatus("\u4ECD\u6709\u6743\u9650\u672A\u64A4\u9500\uFF0C\u53EF\u6309\u4E0B\u9762\u4E24\u6B65\u5206\u522B\u6267\u884C\u3002", "info");
    }
  } catch (error) {
    setStatus(`\u8BFB\u53D6\u5931\u8D25\uFF1A${error.message}`, "error");
  }
}
function row(label, value) {
  return el("div", { class: "kv__row" }, el("dt", { text: label }), el("dd", { text: value }));
}
async function onConnect() {
  if (detectProviders().length === 0) {
    toast(walletHint(), "error", 8e3);
    return;
  }
  try {
    state.wallet = await connectWallet({ choose: chooseWallet });
    $("#connect").textContent = shorten(state.wallet.publicKey.toBase58());
    const allowed = await gate?.verify(state.wallet.publicKey.toBase58());
    if (!allowed) {
      toast("\u5F53\u524D\u94B1\u5305\u4E0D\u662F\u7BA1\u7406\u5458\uFF0C\u64A4\u9500\u529F\u80FD\u672A\u89E3\u9501", "error", 8e3);
      return;
    }
    await refreshAuthorities();
  } catch (error) {
    toast(error.message, "error", 9e3);
  }
}
async function revoke(kind) {
  if (!state.wallet) return toast("\u8BF7\u5148\u8FDE\u63A5\u94B1\u5305", "error");
  const isMint = kind === "mint";
  const label = isMint ? "Mint Authority\uFF08\u589E\u53D1\u6743\u9650\uFF09" : "Freeze Authority\uFF08\u51BB\u7ED3\u6743\u9650\uFF09";
  const authorityType = isMint ? AuthorityType.MintTokens : AuthorityType.FreezeAccount;
  const confirmed = await reviewTransaction({
    title: isMint ? "\u64A4\u9500\u589E\u53D1\u6743\u9650" : "\u64A4\u9500\u51BB\u7ED3\u6743\u9650",
    subtitle: "\u8FD9\u662F\u4E00\u7B14\u72EC\u7ACB\u4EA4\u6613\uFF0C\u64A4\u9500\u540E\u4E0D\u53EF\u6062\u590D\u3002",
    rows: [
      ["Mint", state.mint],
      ["\u64A4\u9500\u9879", label],
      ["\u53D8\u66F4", "\u4F60\u7684\u94B1\u5305 \u2192 \u65E0\uFF08null\uFF09"],
      ["\u7B7E\u540D\u94B1\u5305", shorten(state.wallet.publicKey.toBase58(), 6, 6)]
    ],
    risks: [
      isMint ? "\u64A4\u9500\u540E\u6C38\u8FDC\u65E0\u6CD5\u518D\u589E\u53D1 BTF\u3002" : "\u64A4\u9500\u540E\u6C38\u8FDC\u65E0\u6CD5\u51BB\u7ED3\u4EFB\u4F55\u8D26\u6237\u3002",
      "\u6B64\u64CD\u4F5C\u4E0D\u53EF\u9006\uFF0C\u4E14\u4F1A\u5199\u5165\u94FE\u4E0A\u6C38\u4E45\u8BB0\u5F55\u3002"
    ],
    confirmLabel: "\u786E\u8BA4\u64A4\u9500"
  });
  if (!confirmed) return;
  await withBusy(isMint ? $("#revoke-mint") : $("#revoke-freeze"), async () => {
    try {
      const tx = new Transaction().add(
        createSetAuthorityInstruction(new PublicKey(state.mint), state.wallet.publicKey, authorityType, null)
      );
      const signature = await signAndSend(connection, tx, state.wallet);
      toast(`\u5DF2\u64A4\u9500\uFF1A${shorten(signature)}`, "ok");
      await refreshAuthorities();
    } catch (error) {
      const info = await connection.getParsedAccountInfo(new PublicKey(state.mint), "confirmed").catch(() => null);
      const parsed = info?.value?.data?.parsed?.info;
      const stillThere = isMint ? parsed?.mintAuthority : parsed?.freezeAuthority;
      if (parsed && !stillThere) {
        toast("\u94FE\u4E0A\u5DF2\u751F\u6548\uFF08\u94B1\u5305\u62A5\u9519\u4F46\u4EA4\u6613\u6210\u529F\uFF09", "ok", 9e3);
        await refreshAuthorities();
        return;
      }
      toast(error.message, "error", 9e3);
      setStatus(
        `${isMint ? "\u589E\u53D1" : "\u51BB\u7ED3"}\u6743\u9650\u4ECD\u5B58\u5728\uFF0C\u672C\u6B21\u672A\u751F\u6548\u3002\u9519\u8BEF\uFF1A${error.message}`,
        "error"
      );
    }
  });
  await refreshAuthorities();
}
//# sourceMappingURL=revoke.js.map
