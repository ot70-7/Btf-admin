import {
  AuthorityType,
  createSetAuthorityInstruction
} from "./chunk-5V6NXUKG.js";
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
  createAdminGate
} from "./chunk-3LL4RXX2.js";
import {
  $,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  chooseWallet,
  connectWallet,
  detectProviders,
  el,
  formatTokens,
  getAssociatedTokenAddressSync,
  getConnection,
  getMinimumBalanceForRentExemptMint,
  parseTokens,
  readTokenAmountOrZero,
  reviewTransaction,
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

// src/issuance.js
var config = getConfig();
var connection = getConnection();
var state = {
  wallet: null,
  mintKeypair: null,
  mintAddress: null,
  step: 0,
  report: null
};
var gate = null;
init();
function init() {
  gate = createAdminGate({
    area: $("#admin-area"),
    gate: $("#gate"),
    status: $("#gate-status"),
    connection,
    onGranted: () => {
      if (state.wallet) refreshWalletStatus();
    }
  });
  $("#gate-connect").addEventListener("click", onConnect);
  $("#connect").addEventListener("click", onConnect);
  $("#step-mint").addEventListener("click", onCreateMint);
  $("#step-metadata").addEventListener("click", onSetMetadata);
  $("#step-distribute").addEventListener("click", onDistribute);
  $("#step-revoke").addEventListener("click", onRevoke);
  $("#step-verify").addEventListener("click", onVerify);
  $("#network-badge").textContent = config.network === "mainnet-beta" ? "\u4E3B\u7F51" : config.network;
  $("#token-summary").textContent = `${config.token.name} (${config.token.symbol}) \xB7 \u4F9B\u5E94\u91CF ${formatTokens(
    BigInt(config.token.supply) * 10n ** BigInt(config.token.decimals),
    config.token.decimals
  )} \xB7 ${config.token.decimals} \u4F4D\u5C0F\u6570${window.__AURA_BUILD__ ? ` \xB7 \u6784\u5EFA ${window.__AURA_BUILD__}` : ""}`;
  renderDistribution();
  try {
    const savedUri = localStorage.getItem("btf.metadataUri");
    if (savedUri && !$("#metadata-uri").value) $("#metadata-uri").value = savedUri;
  } catch {
  }
  $("#metadata-uri").addEventListener("input", (event) => {
    try {
      localStorage.setItem("btf.metadataUri", event.target.value.trim());
    } catch {
    }
  });
  try {
    const saved = localStorage.getItem("btf.mint") || config.token.mint;
    if (saved) {
      state.mintAddress = saved;
      showMintAddress(new PublicKey(saved));
    }
  } catch {
  }
  if (config.network === "mainnet-beta") {
    setStatus("\u5F53\u524D\u914D\u7F6E\u4E3A\u4E3B\u7F51\u3002\u53D1\u884C\u524D\u8BF7\u786E\u8BA4\u4EE3\u5E01\u540D\u79F0\u3001Ticker\u3001\u5143\u6570\u636E URI \u4E0E\u5206\u914D\u94B1\u5305\u90FD\u5DF2\u6838\u5BF9\u3002", "error");
  }
  if (detectProviders().length === 0) {
    $("#connect").textContent = "\u5728\u94B1\u5305\u4E2D\u6253\u5F00";
  }
}
function renderDistribution() {
  const decimals = config.token.decimals;
  const supply = BigInt(config.token.supply) * 10n ** BigInt(decimals);
  const host = $("#distribution");
  host.replaceChildren(
    ...(config.distribution ?? []).map((item) => {
      const amount = supply * BigInt(item.pct) / 100n;
      return el(
        "div",
        { class: "kv__row kv__row--stack" },
        el("dt", { text: `${item.label}\uFF08${item.pct}%\uFF09` }),
        el("dd", {
          text: item.wallet ? `${formatTokens(amount, decimals)} \u2192 ${shorten(item.wallet, 4, 4)}` : `${formatTokens(amount, decimals)} \xB7 \u672A\u914D\u7F6E\uFF08\u53D1\u884C\u540E\u7531\u4E3B\u94B1\u5305\u8F6C\u51FA\uFF09`
        })
      );
    })
  );
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
      toast("\u5F53\u524D\u94B1\u5305\u4E0D\u662F\u7BA1\u7406\u5458\uFF0C\u53D1\u884C\u529F\u80FD\u672A\u89E3\u9501", "error", 8e3);
      return;
    }
    await refreshWalletStatus();
  } catch (error) {
    toast(error.message, "error");
  }
}
async function refreshWalletStatus() {
  const host = $("#wallet-status");
  if (!state.wallet) {
    host.textContent = "";
    return;
  }
  const owner = state.wallet.publicKey.toBase58();
  const expected = config.token.projectWallet;
  let lamports = 0;
  try {
    lamports = await connection.getBalance(state.wallet.publicKey, "confirmed");
  } catch (error) {
    host.textContent = `\u65E0\u6CD5\u8BFB\u53D6\u94B1\u5305\u4F59\u989D\uFF1A${error.message}`;
    return;
  }
  const sol = lamports / 1e9;
  const lines = [`\u5F53\u524D\u94B1\u5305 ${shorten(owner, 6, 6)} \xB7 ${sol.toFixed(4)} SOL`];
  if (expected && expected !== owner) {
    lines.push(`\u914D\u7F6E\u7684\u4E3B\u94B1\u5305\u662F ${shorten(expected, 6, 6)}\uFF0C\u4E0E\u5F53\u524D\u8FDE\u63A5\u7684\u5730\u5740\u4E0D\u4E00\u81F4\uFF0C\u8BF7\u5207\u6362\u94B1\u5305\u540E\u518D\u53D1\u884C`);
  }
  if (lamports < 2e7) {
    lines.push("\u4F59\u989D\u4E0D\u8DB3 0.02 SOL\uFF1A\u65E0\u6CD5\u652F\u4ED8 Mint/\u4EE3\u5E01\u8D26\u6237/\u5143\u6570\u636E\u7684\u79DF\u91D1\u4E0E\u624B\u7EED\u8D39\uFF0C\u8BF7\u5148\u5411\u8BE5\u5730\u5740\u5145\u503C");
    $("#step-mint").disabled = true;
  } else {
    $("#step-mint").disabled = false;
  }
  host.textContent = lines.join(" \xB7 ");
}
function requireWallet() {
  if (!state.wallet) {
    toast("\u8BF7\u5148\u8FDE\u63A5\u9879\u76EE\u65B9\u94B1\u5305", "error");
    return false;
  }
  return true;
}
async function onCreateMint() {
  if (!requireWallet()) return;
  await refreshWalletStatus();
  if ($("#step-mint").disabled) {
    return toast("\u4E3B\u94B1\u5305\u4F59\u989D\u4E0D\u8DB3 0.02 SOL\uFF0C\u8BF7\u5148\u5145\u503C\u518D\u70B9\u51FB\uFF08\u5145\u503C\u540E\u5237\u65B0\u9875\u9762\u5373\u53EF\uFF09", "error");
  }
  if (!state.mintKeypair) state.mintKeypair = Keypair.generate();
  const mint = state.mintKeypair.publicKey;
  const decimals = config.token.decimals;
  const supply = BigInt(config.token.supply) * 10n ** BigInt(decimals);
  const confirmed = await reviewTransaction({
    title: "\u7B2C 1 \u6B65\uFF1A\u521B\u5EFA\u4EE3\u5E01 Mint",
    subtitle: "\u8FD9\u4E00\u6B65\u53EA\u521B\u5EFA Mint \u8D26\u6237\u5E76\u4E00\u6B21\u6027\u94F8\u9020\u5168\u90E8\u4F9B\u5E94\u91CF\u5230\u4F60\u7684\u94B1\u5305\uFF0C\u4E0D\u4F1A\u521B\u5EFA\u589E\u53D1\u6216\u51BB\u7ED3\u80FD\u529B\u4E4B\u5916\u7684\u4E1C\u897F\u3002",
    rows: [
      ["\u4EE3\u5E01\u540D\u79F0", `${config.token.name} (${config.token.symbol})`],
      ["\u5C0F\u6570\u4F4D", String(decimals)],
      ["\u603B\u4F9B\u5E94\u91CF", formatTokens(supply, decimals)],
      ["Mint \u5730\u5740\uFF08\u65B0\u751F\u6210\uFF09", mint.toBase58()],
      ["\u63A5\u6536\u94B1\u5305", shorten(state.wallet.publicKey.toBase58(), 6, 6)],
      ["Mint Authority", "\u4F60\u7684\u94B1\u5305\uFF08\u4E0B\u4E00\u6B65\u64A4\u9500\uFF09"],
      ["Freeze Authority", "\u4F60\u7684\u94B1\u5305\uFF08\u4E0B\u4E00\u6B65\u64A4\u9500\uFF09"]
    ],
    risks: [
      "Mint \u79C1\u94A5\u53EA\u5B58\u5728\u4E8E\u5F53\u524D\u9875\u9762\u5185\u5B58\u4E2D\uFF0C\u5237\u65B0\u5373\u4E22\u5931\uFF1B\u521B\u5EFA\u540E\u4E0D\u518D\u9700\u8981\u5B83\u3002",
      "\u4F9B\u5E94\u91CF\u4E00\u6B21\u6027\u94F8\u9020\uFF0C\u4E4B\u540E\u53EA\u80FD\u9500\u6BC1\u4E0D\u80FD\u589E\u53D1\u3002",
      "\u6B64\u4EA4\u6613\u4E0D\u53EF\u9006\uFF0C\u4F1A\u4EA7\u751F\u94FE\u4E0A\u8BB0\u5F55\u3002"
    ]
  });
  if (!confirmed) return;
  await withBusy($("#step-mint"), async () => {
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
        createInitializeMint2Instruction(mint, decimals, state.wallet.publicKey, state.wallet.publicKey),
        createAssociatedTokenAccountIdempotentInstruction(state.wallet.publicKey, ata, state.wallet.publicKey, mint),
        createMintToInstruction(mint, ata, state.wallet.publicKey, supply)
      );
      const signature = await signAndSend(connection, tx, state.wallet, {
        signers: [state.mintKeypair]
      });
      state.mintAddress = mint;
      showMintAddress(mint);
      try {
        localStorage.setItem("btf.mint", mint.toBase58());
      } catch {
      }
      toast(`Mint \u5DF2\u521B\u5EFA\uFF1A${shorten(signature)}`, "ok");
      setStatus("Mint \u5DF2\u521B\u5EFA\u3002\u4E0B\u4E00\u6B65\u53EF\u8BBE\u7F6E\u5143\u6570\u636E\uFF0C\u4E4B\u540E\u5206\u914D\u4EE3\u5E01\u5E76\u64A4\u9500\u6743\u9650\u3002", "ok");
    } catch (error) {
      toast(error.message, "error");
    }
  });
}
async function onSetMetadata() {
  if (!requireWallet()) return;
  const mint = currentMint();
  if (!mint) return toast("\u8BF7\u5148\u521B\u5EFA Mint", "error");
  const uri = $("#metadata-uri").value.trim();
  if (!uri) return toast("\u8BF7\u586B\u5199\u5143\u6570\u636E URI", "error");
  const confirmed = await reviewTransaction({
    title: "\u7B2C 2 \u6B65\uFF1A\u5199\u5165\u4EE3\u5E01\u5143\u6570\u636E",
    subtitle: "\u4F7F\u7528 Metaplex Token Metadata\uFF0C\u94B1\u5305\u3001\u6D4F\u89C8\u5668\u548C\u884C\u60C5\u7AD9\u70B9\u636E\u6B64\u663E\u793A\u540D\u79F0\u3001\u56FE\u6807\u4E0E\u7B80\u4ECB\u3002",
    rows: [
      ["Mint", mint],
      ["\u540D\u79F0", config.token.name],
      ["Ticker", config.token.symbol],
      ["\u5143\u6570\u636E URI", uri],
      ["\u66F4\u65B0\u6743\u9650", "\u4F60\u7684\u94B1\u5305\uFF08\u53EF\u540E\u7EED\u4FEE\u6539\u7B80\u4ECB\u4E0E\u56FE\u6807\uFF09"]
    ],
    risks: ["\u5143\u6570\u636E\u8D26\u6237\u9700\u8981\u5C11\u91CF\u79DF\u91D1\uFF08\u7EA6 0.005 SOL \u91CF\u7EA7\uFF09\u3002", "URI \u5FC5\u987B\u516C\u5F00\u53EF\u8BBF\u95EE\uFF0C\u5426\u5219\u94B1\u5305\u53EA\u663E\u793A\u5730\u5740\u3002"]
  });
  if (!confirmed) return;
  await withBusy($("#step-metadata"), async () => {
    try {
      const { buildMetadataInstructions } = await import("./metadata-4FBXGYKW.js");
      const instructions = buildMetadataInstructions({
        rpc: connection.rpcEndpoint,
        mint,
        authority: state.wallet.publicKey.toBase58(),
        name: config.token.name,
        symbol: config.token.symbol,
        uri
      });
      const tx = new Transaction().add(...instructions);
      tx.feePayer = state.wallet.publicKey;
      const signature = await signAndSend(connection, tx, state.wallet);
      toast(`\u5143\u6570\u636E\u5DF2\u5199\u5165\uFF1A${shorten(signature)}`, "ok");
    } catch (error) {
      if (await metadataExists(mint)) {
        toast("\u5143\u6570\u636E\u5DF2\u5728\u94FE\u4E0A\uFF08\u94B1\u5305\u62A5\u9519\u4F46\u4EA4\u6613\u5DF2\u751F\u6548\uFF09\uFF0C\u65E0\u9700\u91CD\u590D\u5199\u5165", "ok", 9e3);
        setStatus("\u5143\u6570\u636E\u5DF2\u5B58\u5728\u4E8E\u94FE\u4E0A\uFF0C\u53EF\u8FDB\u5165\u4E0B\u4E00\u6B65\u3002", "ok");
        return;
      }
      toast(error.message, "error", 9e3);
    }
  });
}
async function readMintAuthorities(mintAddress) {
  const info = await connection.getParsedAccountInfo(new PublicKey(mintAddress), "confirmed");
  const parsed = info.value?.data?.parsed?.info;
  return {
    mintAuthority: parsed?.mintAuthority ?? null,
    freezeAuthority: parsed?.freezeAuthority ?? null
  };
}
async function metadataExists(mintAddress) {
  const metaplex = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), metaplex.toBuffer(), new PublicKey(mintAddress).toBuffer()],
    metaplex
  );
  const info = await connection.getAccountInfo(pda, "confirmed");
  return Boolean(info);
}
async function onDistribute() {
  if (!requireWallet()) return;
  const mint = currentMint();
  if (!mint) return toast("\u8BF7\u5148\u521B\u5EFA Mint", "error");
  const recipients = (config.distribution ?? []).filter((item) => item.wallet);
  if (recipients.length === 0) {
    return toast("\u5206\u914D\u94B1\u5305\u5C1A\u672A\u914D\u7F6E\uFF1A\u672C\u6B21\u53D1\u884C\u53EA\u628A\u5168\u90E8\u4F9B\u5E94\u91CF\u7559\u5728\u4E3B\u94B1\u5305\uFF0C\u540E\u7EED\u7531\u4F60\u81EA\u4E3B\u8F6C\u51FA", "info", 8e3);
  }
  const decimals = config.token.decimals;
  const supply = BigInt(config.token.supply) * 10n ** BigInt(decimals);
  const source = getAssociatedTokenAddressSync(mint, state.wallet.publicKey);
  const confirmed = await reviewTransaction({
    title: "\u7B2C 3 \u6B65\uFF1A\u6309\u6BD4\u4F8B\u5206\u914D\u4EE3\u5E01",
    subtitle: "\u4ECE\u9879\u76EE\u65B9\u94B1\u5305\u8F6C\u51FA\uFF0C\u6BCF\u4E2A\u5206\u914D\u94B1\u5305\u90FD\u4F1A\u521B\u5EFA\u5173\u8054\u8D26\u6237\u3002\u8BF7\u9010\u4E2A\u6838\u5BF9\u5730\u5740\u3002",
    rows: recipients.map((item) => [
      `${item.label}\uFF08${item.pct}%\uFF09`,
      `${formatTokens(supply * BigInt(item.pct) / 100n, decimals)} \u2192 ${shorten(item.wallet, 6, 6)}`
    ]),
    risks: ["\u8F6C\u8D26\u4E0D\u53EF\u9006\u3002\u5730\u5740\u586B\u9519\u65E0\u6CD5\u627E\u56DE\u3002", "\u8D28\u62BC\u5956\u52B1\u50A8\u5907\u94B1\u5305\u5FC5\u987B\u4E0E\u9879\u76EE\u65B9\u65E5\u5E38\u94B1\u5305\u5206\u5F00\u3002"]
  });
  if (!confirmed) return;
  await withBusy($("#step-distribute"), async () => {
    try {
      const tx = new Transaction();
      for (const item of recipients) {
        const owner = new PublicKey(item.wallet);
        const ata = getAssociatedTokenAddressSync(mint, owner);
        const amount = supply * BigInt(item.pct) / 100n;
        tx.add(createAssociatedTokenAccountIdempotentInstruction(state.wallet.publicKey, ata, owner, mint));
        tx.add(createTransferInstruction(source, ata, state.wallet.publicKey, amount));
      }
      tx.feePayer = state.wallet.publicKey;
      const signature = await signAndSend(connection, tx, state.wallet);
      toast(`\u5206\u914D\u5B8C\u6210\uFF1A${shorten(signature)}`, "ok");
    } catch (error) {
      toast(error.message, "error");
    }
  });
}
async function onRevoke() {
  if (!requireWallet()) return;
  const mint = currentMint();
  if (!mint) return toast("\u8BF7\u5148\u521B\u5EFA Mint", "error");
  const confirmed = await reviewTransaction({
    title: "\u7B2C 4 \u6B65\uFF1A\u6C38\u4E45\u64A4\u9500\u6743\u9650\uFF08\u4E0D\u53EF\u9006\uFF09",
    subtitle: "\u64A4\u9500\u540E\u4EFB\u4F55\u4EBA\u90FD\u65E0\u6CD5\u518D\u589E\u53D1\u6216\u51BB\u7ED3\u4EE3\u5E01\uFF0C\u5305\u62EC\u4F60\u81EA\u5DF1\u3002",
    rows: [
      ["Mint", mint],
      ["Mint Authority", "\u4F60\u7684\u94B1\u5305 \u2192 \u65E0\uFF08null\uFF09"],
      ["Freeze Authority", "\u4F60\u7684\u94B1\u5305 \u2192 \u65E0\uFF08null\uFF09"]
    ],
    risks: [
      "\u6B64\u64CD\u4F5C\u4E0D\u53EF\u9006\u3002\u64A4\u9500\u540E\u4E0D\u80FD\u518D\u589E\u53D1\u4EFB\u4F55\u4EE3\u5E01\u3002",
      "\u64A4\u9500\u540E\u4E5F\u65E0\u6CD5\u51BB\u7ED3\u4EFB\u4F55\u8D26\u6237\uFF0C\u5305\u62EC\u88AB\u76D7\u8D26\u6237\u3002",
      "\u8BF7\u786E\u8BA4\u5206\u914D\u4E0E\u9500\u6BC1\u90FD\u5DF2\u5B8C\u6210\uFF0C\u518D\u6267\u884C\u672C\u6B65\u9AA4\u3002"
    ],
    confirmLabel: "\u786E\u8BA4\u6C38\u4E45\u64A4\u9500"
  });
  if (!confirmed) return;
  await withBusy($("#step-revoke"), async () => {
    try {
      const tx = new Transaction().add(
        createSetAuthorityInstruction(mint, state.wallet.publicKey, AuthorityType.MintTokens, null),
        createSetAuthorityInstruction(mint, state.wallet.publicKey, AuthorityType.FreezeAccount, null)
      );
      tx.feePayer = state.wallet.publicKey;
      const signature = await signAndSend(connection, tx, state.wallet);
      toast(`\u6743\u9650\u5DF2\u64A4\u9500\uFF1A${shorten(signature)}`, "ok");
      setStatus("Mint Authority \u4E0E Freeze Authority \u5DF2\u64A4\u9500\u3002\u8BF7\u6267\u884C\u9A8C\u8BC1\u3002", "ok");
    } catch (error) {
      const authorities = await readMintAuthorities(mint);
      if (!authorities.mintAuthority && !authorities.freezeAuthority) {
        toast("\u6743\u9650\u5DF2\u5728\u94FE\u4E0A\u64A4\u9500\uFF08\u94B1\u5305\u62A5\u9519\u4F46\u4EA4\u6613\u5DF2\u751F\u6548\uFF09", "ok", 9e3);
        setStatus("Mint Authority \u4E0E Freeze Authority \u5747\u5DF2\u64A4\u9500\u3002\u8BF7\u6267\u884C\u9A8C\u8BC1\u3002", "ok");
        return;
      }
      toast(error.message, "error", 9e3);
      setStatus(
        `\u64A4\u9500\u672A\u751F\u6548\uFF1AMint=${authorities.mintAuthority ? "\u4ECD\u5B58\u5728" : "\u65E0"}\uFF0CFreeze=${authorities.freezeAuthority ? "\u4ECD\u5B58\u5728" : "\u65E0"}`,
        "error"
      );
    }
  });
}
async function onVerify() {
  const mint = currentMint();
  if (!mint) return toast("\u8BF7\u5148\u521B\u5EFA Mint", "error");
  await withBusy($("#step-verify"), async () => {
    try {
      const info = await connection.getParsedAccountInfo(mint, "confirmed");
      const parsed = info.value?.data?.parsed?.info;
      if (!parsed) throw new Error("\u65E0\u6CD5\u89E3\u6790 Mint \u8D26\u6237");
      const supply = await connection.getTokenSupply(mint, "confirmed");
      const rows = [
        ["Mint \u5730\u5740", mint],
        ["\u5C0F\u6570\u4F4D", String(parsed.decimals)],
        ["\u94FE\u4E0A\u4F9B\u5E94\u91CF", formatTokens(BigInt(supply.value.amount), parsed.decimals)],
        ["Mint Authority", parsed.mintAuthority ?? "\u65E0\uFF08\u5DF2\u64A4\u9500\uFF09"],
        ["Freeze Authority", parsed.freezeAuthority ?? "\u65E0\uFF08\u5DF2\u64A4\u9500\uFF09"],
        ["\u662F\u5426\u5DF2\u64A4\u9500\u589E\u53D1", parsed.mintAuthority ? "\u5426 \u2014\u2014 \u4ECD\u53EF\u589E\u53D1" : "\u662F"],
        ["\u662F\u5426\u5DF2\u64A4\u9500\u51BB\u7ED3", parsed.freezeAuthority ? "\u5426 \u2014\u2014 \u4ECD\u53EF\u51BB\u7ED3" : "\u662F"]
      ];
      for (const item of config.distribution ?? []) {
        if (!item.wallet) continue;
        const ata = getAssociatedTokenAddressSync(mint, new PublicKey(item.wallet));
        const balance = await readTokenAmountOrZero(connection, ata);
        rows.push([`${item.label}\uFF08${item.pct}%\uFF09`, `${formatTokens(balance, parsed.decimals)} \u2192 ${item.wallet}`]);
      }
      const ok = !parsed.mintAuthority && !parsed.freezeAuthority;
      $("#report").replaceChildren(
        ...rows.map(([label, value]) => el("div", { class: "kv__row" }, el("dt", { text: label }), el("dd", { text: String(value) })))
      );
      setStatus(
        ok ? "\u9A8C\u8BC1\u901A\u8FC7\uFF1A\u4F9B\u5E94\u91CF\u56FA\u5B9A\u3001\u65E0\u589E\u53D1\u6743\u9650\u3001\u65E0\u51BB\u7ED3\u6743\u9650\u3002\u8BF7\u4FDD\u5B58\u672C\u9875\u622A\u56FE\u4F5C\u4E3A\u6743\u9650\u9A8C\u8BC1\u62A5\u544A\u3002" : "\u9A8C\u8BC1\u672A\u901A\u8FC7\uFF1A\u4ECD\u5B58\u5728\u589E\u53D1\u6216\u51BB\u7ED3\u6743\u9650\uFF0C\u8BF7\u5148\u6267\u884C\u7B2C 4 \u6B65\u3002",
        ok ? "ok" : "error"
      );
    } catch (error) {
      toast(error.message, "error");
    }
  });
}
function showMintAddress(mint) {
  const panel = $("#mint-panel");
  const code = $("#mint-address");
  if (!panel || !code) return;
  code.textContent = mint.toBase58();
  panel.classList.remove("hide");
  $("#copy-mint").onclick = async () => {
    try {
      await navigator.clipboard.writeText(mint.toBase58());
      toast("\u5DF2\u590D\u5236 Mint \u5730\u5740", "ok");
    } catch {
      toast("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u9009\u4E2D\u5730\u5740\u590D\u5236", "error");
    }
  };
}
function currentMint() {
  if (state.mintAddress) return state.mintAddress;
  const manual = $("#mint-manual").value.trim();
  if (manual) {
    try {
      state.mintAddress = new PublicKey(manual).toBase58();
      return state.mintAddress;
    } catch {
      toast("Mint \u5730\u5740\u683C\u5F0F\u4E0D\u6B63\u786E", "error");
    }
  }
  return null;
}
try {
  parseTokens(config.token.supply, config.token.decimals);
} catch (error) {
  setStatus(`\u914D\u7F6E\u9519\u8BEF\uFF1A${error.message}`, "error");
}
//# sourceMappingURL=issuance.js.map
