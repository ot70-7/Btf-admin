import {
  createInitializeMint2Instruction,
  createMintToInstruction
} from "./chunk-F4TPPL4P.js";
import "./chunk-2IIECPCM.js";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferInstruction
} from "./chunk-2LXV3LTL.js";
import {
  adminList,
  adminPassMint,
  createAdminGate,
  rememberAdminPass
} from "./chunk-3LL4RXX2.js";
import {
  $,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  chooseWallet,
  connectWallet,
  detectProviders,
  el,
  encodeBase58,
  getAssociatedTokenAddressSync,
  getConnection,
  getMinimumBalanceForRentExemptMint,
  setStatus,
  shorten,
  signAndSend,
  toast,
  walletHint,
  withBusy
} from "./chunk-6SBUITAN.js";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  getConfig
} from "./chunk-WXGNZ34X.js";

// src/admins.js
var config = getConfig();
var connection = getConnection();
var state = { wallet: null, passMint: "" };
var gate = null;
init();
function init() {
  gate = createAdminGate({
    area: $("#admin-area"),
    gate: $("#gate"),
    status: $("#gate-status"),
    connection,
    onGranted: () => refresh()
  });
  $("#gate-connect").addEventListener("click", onConnect);
  $("#connect").addEventListener("click", onConnect);
  $("#init-pass").addEventListener("click", () => withBusy($("#init-pass"), createPass));
  $("#add-admin").addEventListener("click", () => withBusy($("#add-admin"), addAdmin));
  $("#refresh").addEventListener("click", () => withBusy($("#refresh"), refresh));
}
async function onConnect() {
  if (detectProviders().length === 0) {
    toast(walletHint(), "error", 8e3);
    return;
  }
  try {
    state.wallet = await connectWallet({ choose: chooseWallet });
    $("#connect").textContent = shorten(state.wallet.publicKey.toBase58());
    if (!await gate?.verify(state.wallet.publicKey.toBase58())) {
      toast("\u8BE5\u94B1\u5305\u4E0D\u662F\u7BA1\u7406\u5458", "error", 8e3);
      return;
    }
    await refresh();
  } catch (error) {
    toast(error.message, "error", 9e3);
  }
}
async function refresh() {
  state.passMint = adminPassMint();
  const bootstrap = adminList();
  if (!state.passMint) {
    $("#init-card").classList.remove("hide");
    $("#add-card").classList.add("hide");
    $("#admin-rows").replaceChildren(
      ...bootstrap.map(
        (address) => el("tr", {}, el("td", { text: shorten(address, 6, 6) }), el("td", { text: "\u914D\u7F6E\u540D\u5355" }))
      )
    );
    $("#admin-summary").replaceChildren(
      kv("\u914D\u7F6E\u540D\u5355", `${bootstrap.length} \u4E2A`),
      kv("\u7BA1\u7406\u51ED\u8BC1", "\u5C1A\u672A\u521B\u5EFA")
    );
    setStatus("\u8FD8\u6CA1\u6709\u7BA1\u7406\u51ED\u8BC1\uFF1A\u5148\u521B\u5EFA\uFF0C\u4E4B\u540E\u5373\u53EF\u628A\u51ED\u8BC1\u8F6C\u7ED9\u5176\u4ED6\u7BA1\u7406\u5458\u3002", "info");
    return;
  }
  $("#init-card").classList.add("hide");
  $("#add-card").classList.remove("hide");
  try {
    const accounts = await connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
      commitment: "confirmed",
      filters: [
        { dataSize: 165 },
        { memcmp: { offset: 0, bytes: state.passMint } }
      ],
      dataSlice: { offset: 32, length: 40 }
    });
    const holders = /* @__PURE__ */ new Map();
    for (const { account } of accounts) {
      const owner = encodeBase58(account.data.subarray(0, 32));
      const view = new DataView(account.data.buffer, account.data.byteOffset + 32, 8);
      const amount = view.getBigUint64(0, true);
      if (amount > 0n) holders.set(owner, (holders.get(owner) ?? 0n) + amount);
    }
    $("#admin-summary").replaceChildren(
      kv("\u7BA1\u7406\u51ED\u8BC1", state.passMint),
      kv("\u51ED\u8BC1\u6301\u6709\u4EBA", `${holders.size} \u4E2A`),
      kv("\u914D\u7F6E\u540D\u5355", `${bootstrap.length} \u4E2A`)
    );
    const rows = [.../* @__PURE__ */ new Set([...bootstrap, ...holders.keys()])].map(
      (address) => el(
        "tr",
        {},
        el(
          "td",
          {},
          el("a", {
            href: `https://solscan.io/account/${address}`,
            target: "_blank",
            rel: "noreferrer",
            text: shorten(address, 6, 6)
          })
        ),
        el("td", {
          text: holders.has(address) ? `${holders.get(address)} \u679A` : "\u914D\u7F6E\u540D\u5355"
        })
      )
    );
    $("#admin-rows").replaceChildren(...rows);
    setStatus("\u7BA1\u7406\u5458\u5217\u8868\u5DF2\u66F4\u65B0\u3002", "ok");
  } catch (error) {
    setStatus(`\u8BFB\u53D6\u51ED\u8BC1\u6301\u6709\u4EBA\u5931\u8D25\uFF1A${error.message}`, "error");
  }
}
async function createPass() {
  if (!state.wallet) return toast("\u8BF7\u5148\u8FDE\u63A5\u94B1\u5305", "error");
  const mintKeypair = Keypair.generate();
  const mint = mintKeypair.publicKey;
  try {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const ata = getAssociatedTokenAddressSync(mint, state.wallet.publicKey);
    const tx = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: state.wallet.publicKey,
        newAccountPubkey: mint,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID
      }),
      createInitializeMint2Instruction(mint, 0, state.wallet.publicKey, state.wallet.publicKey),
      createAssociatedTokenAccountIdempotentInstruction(
        state.wallet.publicKey,
        ata,
        state.wallet.publicKey,
        mint
      ),
      createMintToInstruction(mint, ata, state.wallet.publicKey, 10n)
    );
    const signature = await signAndSend(connection, tx, state.wallet, { signers: [mintKeypair] });
    rememberAdminPass(mint.toBase58());
    state.passMint = mint.toBase58();
    toast(`\u7BA1\u7406\u51ED\u8BC1\u5DF2\u521B\u5EFA\uFF1A${shorten(signature)}`, "ok", 9e3);
    setStatus(
      `\u51ED\u8BC1\u5730\u5740 ${mint.toBase58()}\u3002\u8BF7\u628A\u5B83\u5199\u8FDB config/project.json \u7684 adminPassMint \u5E76\u91CD\u65B0\u90E8\u7F72\uFF0C\u5426\u5219\u6362\u6D4F\u89C8\u5668\u4F1A\u5931\u6548\u3002`,
      "ok"
    );
    await refresh();
  } catch (error) {
    toast(error.message, "error", 9e3);
  }
}
async function addAdmin() {
  if (!state.wallet) return toast("\u8BF7\u5148\u8FDE\u63A5\u94B1\u5305", "error");
  if (!state.passMint) return toast("\u8BF7\u5148\u521B\u5EFA\u7BA1\u7406\u51ED\u8BC1", "error");
  let target;
  try {
    target = new PublicKey($("#new-admin").value.trim());
  } catch {
    return toast("\u5730\u5740\u683C\u5F0F\u4E0D\u6B63\u786E", "error");
  }
  try {
    const mint = new PublicKey(state.passMint);
    const source = getAssociatedTokenAddressSync(mint, state.wallet.publicKey);
    const destination = getAssociatedTokenAddressSync(mint, target);
    const tx = new Transaction().add(
      createAssociatedTokenAccountIdempotentInstruction(state.wallet.publicKey, destination, target, mint),
      createTransferInstruction(source, destination, state.wallet.publicKey, 1n)
    );
    const signature = await signAndSend(connection, tx, state.wallet);
    toast(`\u5DF2\u6388\u6743\u65B0\u7BA1\u7406\u5458\uFF1A${shorten(signature)}`, "ok", 9e3);
    $("#new-admin").value = "";
    await refresh();
  } catch (error) {
    toast(error.message, "error", 9e3);
  }
}
function kv(label, value) {
  return el("div", { class: "kv__row" }, el("dt", { text: label }), el("dd", { text: value }));
}
//# sourceMappingURL=admins.js.map
