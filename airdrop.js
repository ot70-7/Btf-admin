import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferInstruction
} from "./chunk-2LXV3LTL.js";
import {
  createAdminGate
} from "./chunk-3LL4RXX2.js";
import {
  $,
  TOKEN_PROGRAM_ID,
  chooseWallet,
  connectWallet,
  detectProviders,
  el,
  encodeBase58,
  formatTokens,
  getAssociatedTokenAddressSync,
  getConnection,
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
  PublicKey,
  Transaction,
  getConfig
} from "./chunk-WXGNZ34X.js";

// src/lib/airdrop.js
var ATA_RENT_LAMPORTS = 2039280n;
var SIGNATURE_FEE_LAMPORTS = 5000n;
function aggregateHolders(accounts) {
  const totals = /* @__PURE__ */ new Map();
  for (const { owner, amount } of accounts) {
    if (!owner) continue;
    const value = BigInt(amount);
    if (value === 0n) continue;
    totals.set(owner, (totals.get(owner) ?? 0n) + value);
  }
  return totals;
}
function selectRecipients(totals, { threshold = 0n, exclude = [] } = {}) {
  const blocked = new Set(exclude.filter(Boolean));
  const rows = [];
  for (const [owner, amount] of totals.entries()) {
    if (blocked.has(owner)) continue;
    if (BigInt(amount) < BigInt(threshold)) continue;
    rows.push({ owner, amount: BigInt(amount) });
  }
  rows.sort((a, b) => b.amount > a.amount ? 1 : b.amount < a.amount ? -1 : 0);
  return rows;
}
function planEqual(recipients, total) {
  const totalAmount = BigInt(total);
  if (recipients.length === 0) return [];
  const each = totalAmount / BigInt(recipients.length);
  let remainder = totalAmount - each * BigInt(recipients.length);
  return recipients.map((recipient) => {
    let amount = each;
    if (remainder > 0n) {
      amount += 1n;
      remainder -= 1n;
    }
    return { ...recipient, payout: amount };
  });
}
function planProportional(recipients, total) {
  const totalAmount = BigInt(total);
  const sum = recipients.reduce((acc, item) => acc + BigInt(item.amount), 0n);
  if (sum === 0n) return [];
  const rows = recipients.map((recipient) => ({
    ...recipient,
    payout: totalAmount * BigInt(recipient.amount) / sum
  }));
  let assigned = rows.reduce((acc, item) => acc + item.payout, 0n);
  let index = 0;
  while (assigned < totalAmount && rows.length > 0) {
    rows[index % rows.length].payout += 1n;
    assigned += 1n;
    index += 1;
  }
  return rows;
}
function planFixed(recipients, perWallet, total) {
  const each = BigInt(perWallet);
  const totalAmount = BigInt(total);
  if (each <= 0n) return [];
  const maxCount = Number(totalAmount / each);
  const chosen = recipients.slice(0, Math.min(maxCount, recipients.length));
  return chosen.map((recipient) => ({ ...recipient, payout: each }));
}
function chunk(list, size) {
  const batches = [];
  for (let i = 0; i < list.length; i += size) batches.push(list.slice(i, i + size));
  return batches;
}
function estimateCost({ recipients, existingAtas, batchSize = 10, createMissingAtas = false }) {
  const existing = existingAtas instanceof Set ? existingAtas : new Set(existingAtas ?? []);
  const missing = recipients.filter((item) => !existing.has(item.owner)).length;
  const ataRent = createMissingAtas ? BigInt(missing) * ATA_RENT_LAMPORTS : 0n;
  const batches = Math.ceil(recipients.length / batchSize);
  const fees = BigInt(batches) * SIGNATURE_FEE_LAMPORTS;
  return {
    total: recipients.length,
    missingAtas: missing,
    batches,
    ataRentLamports: ataRent,
    feeLamports: fees,
    totalLamports: ataRent + fees
  };
}
function sumPayouts(rows) {
  return rows.reduce((acc, item) => acc + BigInt(item.payout), 0n);
}

// src/airdrop.js
var BATCH_SIZE = 10;
var config = getConfig();
var connection = getConnection();
var state = {
  wallet: null,
  mint: config.token.mint,
  holders: /* @__PURE__ */ new Map(),
  plan: [],
  batches: [],
  doneBatches: /* @__PURE__ */ new Set()
};
var gate = null;
init();
function init() {
  gate = createAdminGate({
    area: $("#admin-area"),
    gate: $("#gate"),
    status: $("#gate-status"),
    connection,
    onGranted: () => refreshSourceBalance()
  });
  $("#gate-connect").addEventListener("click", onConnect);
  $("#connect").addEventListener("click", onConnect);
  $("#load-holders").addEventListener("click", () => withBusy($("#load-holders"), loadHolders));
  $("#load-manual").addEventListener("click", loadManualList);
  $("#plan").addEventListener("click", () => withBusy($("#plan"), buildPlan));
  $("#export").addEventListener("click", exportCsv);
  $("#run").addEventListener("click", runAirdrop);
  $("#mode").addEventListener("change", () => {
    const fixed = $("#mode").value === "fixed";
    $("#budget-field").classList.toggle("hide", fixed);
    $("#per-wallet-field").classList.toggle("hide", !fixed);
  });
  if (!state.mint) setStatus("\u914D\u7F6E\u4E2D\u6CA1\u6709 Mint \u5730\u5740\uFF0C\u65E0\u6CD5\u53D1\u653E\u3002", "error");
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
      toast("\u5F53\u524D\u94B1\u5305\u4E0D\u662F\u7BA1\u7406\u5458\uFF0C\u6279\u91CF\u53D1\u653E\u672A\u89E3\u9501", "error", 8e3);
      return;
    }
    await refreshSourceBalance();
  } catch (error) {
    toast(error.message, "error", 9e3);
  }
}
async function refreshSourceBalance() {
  if (!state.wallet || !state.mint) return;
  try {
    const ata = getAssociatedTokenAddressSync(new PublicKey(state.mint), state.wallet.publicKey);
    const balance = await readTokenAmountOrZero(connection, ata);
    setStatus(
      `\u53D1\u653E\u94B1\u5305 ${shorten(state.wallet.publicKey.toBase58())} \xB7 \u53EF\u53D1\u653E ${formatTokens(
        balance,
        config.token.decimals
      )} BTF`,
      "ok"
    );
  } catch (error) {
    setStatus(`\u8BFB\u53D6\u53D1\u653E\u94B1\u5305\u4F59\u989D\u5931\u8D25\uFF1A${error.message}`, "error");
  }
}
async function loadHolders() {
  if (!state.mint) return;
  try {
    setStatus("\u6B63\u5728\u8BFB\u53D6\u94FE\u4E0A\u6301\u4ED3\uFF0C\u5730\u5740\u591A\u65F6\u53EF\u80FD\u9700\u8981\u51E0\u5341\u79D2\u2026", "info");
    const mint = new PublicKey(state.mint);
    const accounts = await connection.getProgramAccounts(TOKEN_PROGRAM_ID, {
      commitment: "confirmed",
      filters: [{ dataSize: 165 }, { memcmp: { offset: 0, bytes: mint.toBase58() } }],
      dataSlice: { offset: 32, length: 40 }
    });
    const rows = accounts.map(({ account }) => {
      const data = account.data;
      const owner = encodeBase58(data.subarray(0, 32));
      const view = new DataView(data.buffer, data.byteOffset + 32, 8);
      return { owner, amount: view.getBigUint64(0, true) };
    });
    state.holders = aggregateHolders(rows);
    const total = [...state.holders.values()].reduce((acc, value) => acc + value, 0n);
    $("#holders-summary").textContent = `\u4EE3\u5E01\u8D26\u6237 ${accounts.length} \u4E2A\uFF0C\u6301\u6709\u4EBA ${state.holders.size} \u4E2A\uFF0C\u5408\u8BA1 ${formatTokens(
      total,
      config.token.decimals
    )} BTF`;
    setStatus("\u6301\u4ED3\u5DF2\u8BFB\u53D6\uFF0C\u53EF\u8BBE\u7F6E\u7B5B\u9009\u6761\u4EF6\u3002", "ok");
  } catch (error) {
    setStatus(
      `\u8BFB\u53D6\u5931\u8D25\uFF1A${error.message}\u3002\u82E5\u63D0\u793A getProgramAccounts \u4E0D\u53EF\u7528\uFF0C\u8BF7\u6362\u652F\u6301\u8BE5\u65B9\u6CD5\u7684 RPC\uFF08\u7BA1\u7406\u9875\u53EF\u5207\u6362\uFF09\u3002`,
      "error"
    );
  }
}
function loadManualList() {
  const text = $("#manual-list").value.trim();
  if (!text) return toast("\u8BF7\u7C98\u8D34\u540D\u5355", "error");
  const rows = [];
  const problems = [];
  for (const line of text.split(/\n+/)) {
    const [address, value] = line.split(/[,，\s]+/).filter(Boolean);
    if (!address || !value) {
      problems.push(line);
      continue;
    }
    try {
      new PublicKey(address);
      rows.push({ owner: address, amount: parseTokens(value, config.token.decimals) });
    } catch {
      problems.push(line);
    }
  }
  if (rows.length === 0) return toast("\u6CA1\u6709\u89E3\u6790\u51FA\u6709\u6548\u5730\u5740", "error");
  state.holders = aggregateHolders(rows);
  const total = [...state.holders.values()].reduce((acc, value) => acc + value, 0n);
  $("#holders-summary").textContent = `\u624B\u52A8\u540D\u5355 ${state.holders.size} \u4E2A\u6301\u6709\u4EBA\uFF0C\u5408\u8BA1 ${formatTokens(
    total,
    config.token.decimals
  )} BTF`;
  setStatus(
    problems.length ? `\u5DF2\u5BFC\u5165 ${rows.length} \u6761\uFF0C${problems.length} \u884C\u683C\u5F0F\u65E0\u6548\u5DF2\u8DF3\u8FC7` : `\u5DF2\u5BFC\u5165 ${rows.length} \u6761`,
    problems.length ? "error" : "ok"
  );
}
async function buildPlan() {
  try {
    await buildPlanInner();
  } catch (error) {
    toast(error.message, "error", 9e3);
    setStatus(`\u751F\u6210\u65B9\u6848\u5931\u8D25\uFF1A${error.message}`, "error");
  }
}
function ataFor(owner) {
  try {
    return getAssociatedTokenAddressSync(new PublicKey(state.mint), new PublicKey(owner));
  } catch {
    return null;
  }
}
async function buildPlanInner() {
  if (state.holders.size === 0) {
    toast("\u8BF7\u5148\u8BFB\u53D6\u6301\u4ED3", "error");
    return;
  }
  const decimals = config.token.decimals;
  let threshold = 0n;
  try {
    threshold = $("#threshold").value.trim() ? parseTokens($("#threshold").value, decimals) : 0n;
  } catch (error) {
    return toast(`\u95E8\u69DB\u683C\u5F0F\u9519\u8BEF\uFF1A${error.message}`, "error");
  }
  const exclude = [$("#exclude").value, config.token.projectWallet, config.admin].filter(Boolean).join("\n").split(/[\s,]+/).filter(Boolean);
  const recipients = selectRecipients(state.holders, { threshold, exclude });
  if (recipients.length === 0) {
    return toast("\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u5730\u5740", "error");
  }
  const deliverable = recipients.filter((row) => ataFor(row.owner));
  const notDeliverable = recipients.length - deliverable.length;
  if (deliverable.length === 0) {
    throw new Error("\u540D\u5355\u4E2D\u6CA1\u6709\u53EF\u63A5\u6536\u4EE3\u5E01\u7684\u94B1\u5305\u5730\u5740\uFF08\u53EF\u80FD\u586B\u4E86\u4EE3\u5E01\u8D26\u6237\u6216\u7A0B\u5E8F\u5730\u5740\uFF09");
  }
  const existing = await checkAtas(deliverable.map((row) => row.owner));
  const createMissing = $("#create-atas").checked;
  const pool = createMissing ? deliverable : deliverable.filter((row) => existing.has(row.owner));
  const missingAtas = deliverable.length - existing.size;
  if (pool.length === 0) {
    throw new Error("\u540D\u5355\u4E2D\u7684\u5730\u5740\u90FD\u8FD8\u6CA1\u6709\u4EE3\u5E01\u8D26\u6237\uFF0C\u8BF7\u52FE\u9009\u201C\u4E3A\u7F3A\u5931\u8D26\u6237\u521B\u5EFA\u201D\u6216\u5148\u8BA9\u4ED6\u4EEC\u6301\u6709 BTF");
  }
  const mode = $("#mode").value;
  let rows = [];
  try {
    if (mode === "fixed") {
      const per = parseTokens($("#per-wallet").value || "0", decimals);
      rows = planFixed(pool, per, per * BigInt(pool.length));
    } else {
      const budget = parseTokens($("#budget").value || "0", decimals);
      if (budget <= 0n) return toast("\u8BF7\u586B\u5199\u53D1\u653E\u603B\u91CF", "error");
      rows = mode === "equal" ? planEqual(pool, budget) : planProportional(pool, budget);
    }
  } catch (error) {
    return toast(error.message, "error");
  }
  if (rows.length === 0) return toast("\u65B9\u6848\u4E3A\u7A7A", "error");
  const cost = estimateCost({
    recipients: rows,
    existingAtas: existing,
    batchSize: BATCH_SIZE,
    createMissingAtas: createMissing
  });
  state.plan = rows;
  state.batches = chunk(rows, BATCH_SIZE);
  state.doneBatches = /* @__PURE__ */ new Set();
  const total = sumPayouts(rows);
  $("#plan-summary").replaceChildren(
    kv("\u6536\u4EF6\u5730\u5740", String(rows.length)),
    kv("\u53D1\u653E\u603B\u91CF", `${formatTokens(total, decimals)} BTF`),
    kv("\u4EBA\u5747", `${formatTokens(rows[0].payout, decimals)} ~ ${formatTokens(rows[rows.length - 1].payout, decimals)} BTF`),
    kv("\u6279\u6B21", `${cost.batches} \u6279\uFF08\u6BCF\u6279 ${BATCH_SIZE} \u4E2A\uFF0C\u6BCF\u6279\u7B7E\u540D\u4E00\u6B21\uFF09`),
    kv("\u7F3A\u5C11\u4EE3\u5E01\u8D26\u6237", `${cost.missingAtas} \u4E2A${createMissing ? "\uFF08\u5C06\u521B\u5EFA\uFF09" : "\uFF08\u5DF2\u6392\u9664\uFF0C\u4E0D\u4F1A\u53D1\u653E\uFF09"}`),
    notDeliverable > 0 ? kv("\u8DF3\u8FC7\u5730\u5740", `${notDeliverable} \u4E2A\uFF08\u4EE3\u5E01\u8D26\u6237\u6216\u7A0B\u5E8F\u5730\u5740\uFF09`) : null,
    kv(
      "\u94FE\u4E0A\u6210\u672C",
      `\u2248 ${(Number(cost.totalLamports) / 1e9).toFixed(6)} SOL${cost.ataRentLamports > 0n ? "\uFF08\u542B\u8D26\u6237\u79DF\u91D1\uFF09" : "\uFF08\u4EC5\u624B\u7EED\u8D39\uFF09"}`
    )
  );
  $("#plan-rows").replaceChildren(
    ...rows.slice(0, 50).map(
      (row, index) => el(
        "tr",
        {},
        el("td", { text: String(index + 1) }),
        el("td", {}, el("a", { href: `https://solscan.io/account/${row.owner}`, target: "_blank", rel: "noreferrer", text: shorten(row.owner, 4, 4) })),
        el("td", { text: formatTokens(row.amount, decimals) }),
        el("td", { text: formatTokens(row.payout, decimals) })
      )
    )
  );
  $("#run").disabled = false;
  setStatus(`\u65B9\u6848\u5DF2\u751F\u6210\uFF1A${rows.length} \u4E2A\u5730\u5740\uFF0C${cost.batches} \u6279\u3002`, "ok");
}
async function checkAtas(owners) {
  const existing = /* @__PURE__ */ new Set();
  for (const group of chunk(owners, 100)) {
    const valid = group.filter((owner) => ataFor(owner));
    if (valid.length === 0) continue;
    const atas = valid.map((owner) => ataFor(owner));
    const infos = await connection.getMultipleAccountsInfo(atas, "confirmed");
    infos.forEach((info, index) => {
      if (info) existing.add(valid[index]);
    });
  }
  return existing;
}
async function runAirdrop() {
  if (!state.wallet || state.plan.length === 0) return toast("\u8BF7\u5148\u751F\u6210\u65B9\u6848", "error");
  const confirmed = await reviewTransaction({
    title: "\u786E\u8BA4\u6279\u91CF\u53D1\u653E",
    subtitle: "\u6BCF\u6279 10 \u4E2A\u5730\u5740\uFF0C\u9010\u6279\u5728\u94B1\u5305\u7B7E\u540D\u3002\u5DF2\u5B8C\u6210\u7684\u6279\u6B21\u4E0D\u4F1A\u91CD\u590D\u3002",
    rows: [
      ["\u6536\u4EF6\u5730\u5740", String(state.plan.length)],
      ["\u6279\u6B21", String(state.batches.length)],
      ["\u53D1\u653E\u603B\u91CF", `${formatTokens(sumPayouts(state.plan), config.token.decimals)} BTF`],
      ["\u6765\u6E90\u94B1\u5305", shorten(state.wallet.publicKey.toBase58(), 6, 6)]
    ],
    risks: [
      "\u94FE\u4E0A\u8F6C\u8D26\u4E0D\u53EF\u9006\uFF0C\u5730\u5740\u9519\u8BEF\u65E0\u6CD5\u627E\u56DE\u3002",
      "\u6BCF\u6279\u90FD\u9700\u8981\u4E00\u6B21\u94B1\u5305\u7B7E\u540D\uFF0C\u4E2D\u9014\u505C\u6B62\u53EF\u7A0D\u540E\u7EE7\u7EED\u3002",
      "\u82E5\u4E3A\u7F3A\u5931\u8D26\u6237\u521B\u5EFA\u4EE3\u5E01\u8D26\u6237\uFF0C\u4F1A\u989D\u5916\u6D88\u8017 SOL \u79DF\u91D1\u3002"
    ],
    confirmLabel: "\u5F00\u59CB\u7B2C 1 \u6279"
  });
  if (!confirmed) return;
  $("#progress").replaceChildren();
  for (let index = 0; index < state.batches.length; index += 1) {
    if (state.doneBatches.has(index)) continue;
    const batch = state.batches[index];
    const row = el("div", { class: "position" }, el("div", { class: "position__meta" }, el("span", { text: `\u7B2C ${index + 1} / ${state.batches.length} \u6279 \xB7 ${batch.length} \u4E2A\u5730\u5740` })));
    $("#progress").append(row);
    try {
      const signature = await sendBatch(batch);
      state.doneBatches.add(index);
      row.append(el("span", { class: "small muted", text: `\u5DF2\u786E\u8BA4 ${shorten(signature, 6, 6)}` }));
    } catch (error) {
      row.append(el("span", { class: "small", style: "color: var(--danger)", text: `\u5931\u8D25\uFF1A${error.message}` }));
      setStatus(`\u7B2C ${index + 1} \u6279\u5931\u8D25\uFF1A${error.message}\u3002\u4FEE\u590D\u540E\u53EF\u91CD\u65B0\u70B9\u51FB\u300C\u5F00\u59CB\u53D1\u653E\u300D\u7EE7\u7EED\u672A\u5B8C\u6210\u6279\u6B21\u3002`, "error");
      return;
    }
  }
  setStatus("\u5168\u90E8\u6279\u6B21\u5DF2\u5B8C\u6210\u3002", "ok");
  toast("\u53D1\u653E\u5B8C\u6210", "ok", 8e3);
}
async function sendBatch(batch) {
  const mint = new PublicKey(state.mint);
  const source = getAssociatedTokenAddressSync(mint, state.wallet.publicKey);
  const tx = new Transaction();
  for (const item of batch) {
    const owner = new PublicKey(item.owner);
    const destination = getAssociatedTokenAddressSync(mint, owner);
    if ($("#create-atas").checked) {
      tx.add(createAssociatedTokenAccountIdempotentInstruction(state.wallet.publicKey, destination, owner, mint));
    }
    tx.add(createTransferInstruction(source, destination, state.wallet.publicKey, item.payout));
  }
  return signAndSend(connection, tx, state.wallet);
}
function kv(label, value) {
  return el("div", { class: "kv__row" }, el("dt", { text: label }), el("dd", { text: value }));
}
function exportCsv() {
  if (state.plan.length === 0) return toast("\u8BF7\u5148\u751F\u6210\u65B9\u6848", "error");
  const decimals = config.token.decimals;
  const lines = ["owner,holding,payout"];
  for (const row of state.plan) {
    lines.push(`${row.owner},${formatTokens(row.amount, decimals)},${formatTokens(row.payout, decimals)}`);
  }
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = el("a", { href: url, download: "btf-airdrop.csv" });
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
//# sourceMappingURL=airdrop.js.map
