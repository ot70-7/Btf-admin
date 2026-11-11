import {
  indexedErrorText,
  rpcLabel,
  withIndexedRpc
} from "./chunk-7WQ2IDZ6.js";
import {
  $,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Reader,
  TOKEN_PROGRAM_ID,
  Writer,
  chooseWallet,
  connectWallet,
  detectProviders,
  discriminatorHex,
  el,
  encodeBase58,
  formatBps,
  formatDateTime,
  formatTokens,
  getAssociatedTokenAddressSync,
  getConnection,
  parseTokens,
  readMintSupply,
  readTokenAmountOrZero,
  restoreWallet,
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
  SystemProgram,
  Transaction,
  TransactionInstruction,
  getConfig,
  getTiers
} from "./chunk-WXGNZ34X.js";

// src/lib/discriminators.js
var IX = {
  initializePool: "5fb40aac54aee828",
  fundRewards: "7240a370afa71379",
  setApr: "1fc68fd4b218ce6f",
  setPaused: "5b3c7dc0b0e1a6da",
  stake: "ceb0ca12c8d1b36c",
  claim: "3ec6d6c1d59f6cd2",
  unstake: "5a5f6b2acd7c32e1"
};
var ACCOUNT = {
  pool: "f19a6d0411b16dbc",
  position: "aabc8fe47a40f7d0",
  userState: "48b155f94ca7ba7e"
};
var EVENT = {
  poolInitialized: "6476ad570cc6fee5",
  rewardFunded: "47216b3c92d107af",
  aprUpdated: "5038665b055ece07",
  pausedSet: "ab7d7f9ce9514442",
  staked: "0b922dcde63ad5f0",
  rewardClaimed: "311c57549e30e5af",
  unstaked: "1bb39cd72f47c307"
};

// src/lib/program.js
var POOL_SEED = "pool";
var AUTHORITY_SEED = "authority";
function programId() {
  return new PublicKey(getConfig().staking.programId);
}
function poolPda() {
  return PublicKey.findProgramAddressSync([Buffer.from(POOL_SEED)], programId())[0];
}
function authorityPda() {
  return PublicKey.findProgramAddressSync([Buffer.from(AUTHORITY_SEED)], programId())[0];
}
function discriminator(hex) {
  return Uint8Array.from(hex.match(/.{2}/g).map((byte) => parseInt(byte, 16)));
}
function instruction(hex, data, keys) {
  return new TransactionInstruction({
    programId: programId(),
    keys,
    data: Buffer.from(data)
  });
}
function base(hex) {
  return new Writer().raw(discriminator(hex));
}
function ixInitializePool({ admin, mint, principalVault, rewardVault, tiers, minStake }) {
  const writer = base(IX.initializePool);
  for (const tier of tiers) {
    writer.u64(tier.aprBps).u64(tier.lockSecs).u64(tier.capSecs);
  }
  writer.u64(minStake);
  return instruction(IX.initializePool, writer.bytes(), [
    { pubkey: admin, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true },
    { pubkey: mint, isSigner: false, isWritable: false },
    { pubkey: authorityPda(), isSigner: false, isWritable: false },
    { pubkey: principalVault, isSigner: false, isWritable: true },
    { pubkey: rewardVault, isSigner: false, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
  ]);
}
function ixFundRewards({ admin, adminAta, rewardVault, amount }) {
  const writer = base(IX.fundRewards).u64(amount).bytes();
  return instruction(IX.fundRewards, writer, [
    { pubkey: admin, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true },
    { pubkey: adminAta, isSigner: false, isWritable: true },
    { pubkey: rewardVault, isSigner: false, isWritable: true },
    { pubkey: authorityPda(), isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
  ]);
}
function ixSetApr({ admin, tier, aprBps }) {
  const writer = base(IX.setApr).u8(tier).u64(aprBps).bytes();
  return instruction(IX.setApr, writer, [
    { pubkey: admin, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true }
  ]);
}
function ixSetPaused({ admin, paused }) {
  const writer = base(IX.setPaused).bool(paused).bytes();
  return instruction(IX.setPaused, writer, [
    { pubkey: admin, isSigner: true, isWritable: true },
    { pubkey: poolPda(), isSigner: false, isWritable: true }
  ]);
}
function expectDiscriminator(reader, hex, name) {
  const actual = discriminatorHex(reader.bytes.slice(reader.offset, reader.offset + 8));
  reader.offset += 8;
  if (actual !== hex) {
    throw new Error(`${name} \u8D26\u6237\u7C7B\u578B\u4E0D\u5339\u914D\uFF08\u671F\u671B ${hex}\uFF0C\u5B9E\u9645 ${actual}\uFF09`);
  }
}
function decodePool(address, data) {
  const reader = new Reader(data);
  expectDiscriminator(reader, ACCOUNT.pool, "Pool");
  const pool = {
    address,
    mint: reader.pubkey(),
    admin: reader.pubkey(),
    bump: reader.u8(),
    authorityBump: reader.u8(),
    principalVault: reader.pubkey(),
    rewardVault: reader.pubkey(),
    paused: reader.bool(),
    minStake: reader.u64(),
    totalStaked: reader.u64(),
    totalCommitted: reader.u128(),
    totalPaid: reader.u128(),
    totalFunded: reader.u128(),
    stakerCount: reader.u64(),
    positionCount: reader.u64(),
    tiers: []
  };
  for (let i = 0; i < 5; i += 1) {
    pool.tiers.push({
      aprBps: reader.u64(),
      lockSecs: reader.u64(),
      capSecs: reader.u64(),
      enabled: reader.bool()
    });
  }
  return pool;
}
function decodePosition(address, data) {
  const reader = new Reader(data);
  expectDiscriminator(reader, ACCOUNT.position, "Position");
  return {
    address,
    pool: reader.pubkey(),
    owner: reader.pubkey(),
    nonce: reader.u64(),
    tier: reader.u8(),
    amount: reader.u64(),
    aprBps: reader.u64(),
    capSecs: reader.u64(),
    startTs: reader.i64(),
    unlockTs: reader.i64(),
    claimed: reader.u128(),
    committed: reader.u128(),
    bump: reader.u8()
  };
}
async function fetchPool(connection) {
  const info = await connection.getAccountInfo(poolPda(), "confirmed");
  return info ? decodePool(poolPda().toBase58(), info.data) : null;
}
async function fetchAllPositions(connection) {
  const accounts = await connection.getProgramAccounts(programId(), {
    commitment: "confirmed",
    filters: [
      { memcmp: { offset: 0, bytes: encodeBase58(discriminator(ACCOUNT.position)) } }
    ]
  });
  return accounts.map(({ pubkey, account }) => decodePosition(pubkey.toBase58(), account.data));
}
function parseEvents(logs) {
  const events = [];
  for (const line of logs ?? []) {
    const marker = "Program data: ";
    const index = line.indexOf(marker);
    if (index < 0) continue;
    let bytes;
    try {
      bytes = Buffer.from(line.slice(index + marker.length).trim(), "base64");
    } catch {
      continue;
    }
    if (bytes.length < 8) continue;
    const kind = discriminatorHex(bytes);
    const reader = new Reader(new Uint8Array(bytes), 8);
    try {
      switch (kind) {
        case EVENT.rewardFunded:
          events.push({
            kind: "rewardFunded",
            amount: reader.u64(),
            available: reader.u128(),
            totalFunded: reader.u128(),
            timestamp: reader.i64()
          });
          break;
        case EVENT.aprUpdated:
          events.push({
            kind: "aprUpdated",
            tier: reader.u8(),
            previousAprBps: reader.u64(),
            newAprBps: reader.u64(),
            timestamp: reader.i64()
          });
          break;
        case EVENT.pausedSet:
          events.push({ kind: "pausedSet", paused: reader.bool(), timestamp: reader.i64() });
          break;
        case EVENT.unstaked:
          events.push({
            kind: "unstaked",
            owner: reader.pubkey(),
            nonce: reader.u64(),
            principal: reader.u64(),
            rewards: reader.u128(),
            releasedCommitment: reader.u128(),
            timestamp: reader.i64()
          });
          break;
        case EVENT.rewardClaimed:
          events.push({
            kind: "rewardClaimed",
            owner: reader.pubkey(),
            nonce: reader.u64(),
            amount: reader.u128(),
            timestamp: reader.i64()
          });
          break;
        case EVENT.staked:
          events.push({
            kind: "staked",
            owner: reader.pubkey(),
            tier: reader.u8(),
            amount: reader.u64(),
            aprBps: reader.u64(),
            unlockTs: reader.i64(),
            committed: reader.u128(),
            timestamp: reader.i64()
          });
          break;
        default:
          break;
      }
    } catch {
    }
  }
  return events;
}

// src/lib/rewards.js
var BPS_DENOMINATOR = 10000n;
var YEAR_SECONDS = 31536000n;
function maxReward(amount, aprBps, capSecs) {
  return BigInt(amount) * BigInt(aprBps) * BigInt(capSecs) / (BPS_DENOMINATOR * YEAR_SECONDS);
}
function availableRewards(rewardVaultAmount, totalCommitted) {
  const vault = BigInt(rewardVaultAmount);
  const committed = BigInt(totalCommitted);
  return vault > committed ? vault - committed : 0n;
}
function rewardPoolUsageBps(totalCommitted, rewardVaultAmount) {
  const vault = BigInt(rewardVaultAmount);
  if (vault === 0n) return 0n;
  return BigInt(totalCommitted) * 10000n / vault;
}

// src/admin.js
var state = {
  connection: getConnection(),
  wallet: null,
  pool: null,
  positions: [],
  positionsEndpoint: null,
  positionsError: null,
  rewardBalance: 0n,
  principalBalance: 0n,
  supply: 0n,
  reserved: 0n,
  isAdmin: false
};
var config = getConfig();
init();
async function init() {
  $("#connect").addEventListener("click", onConnect);
  $("#refresh").addEventListener("click", () => refreshAll());
  $("#apr-form").addEventListener("submit", onSetApr);
  $("#fund-form").addEventListener("submit", onFund);
  $("#pause").addEventListener("click", onTogglePause);
  $("#rpc-save").addEventListener("click", () => {
    const value = $("#rpc-input").value.trim();
    if (!/^https?:\/\//.test(value)) return toast("RPC \u5FC5\u987B\u662F http(s) \u5730\u5740", "error");
    localStorage.setItem("aura.rpc", value);
    state.connection = getConnection();
    toast("RPC \u5DF2\u66F4\u65B0\uFF0C\u6B63\u5728\u5237\u65B0", "ok");
    refreshAll();
  });
  $("#rpc-input").value = localStorage.getItem("aura.rpc") || config.rpc;
  $("#init-pool").addEventListener("click", onInitializePool);
  $("#network-badge").textContent = config.network === "mainnet-beta" ? "\u4E3B\u7F51" : config.network;
  renderInitForm();
  await restoreSession();
  await refreshAll();
}
async function restoreSession() {
  const wallet = await restoreWallet();
  if (!wallet) return;
  state.wallet = wallet;
  $("#connect").textContent = shorten(wallet.publicKey.toBase58());
}
async function onConnect() {
  if (detectProviders().length === 0) {
    toast(walletHint(), "error", 8e3);
    return;
  }
  try {
    state.wallet = await connectWallet({ choose: chooseWallet });
    $("#connect").textContent = shorten(state.wallet.publicKey.toBase58());
    await refreshAll();
  } catch (error) {
    toast(error.message, "error");
  }
}
async function refreshAll() {
  try {
    const owner = state.wallet?.publicKey?.toBase58();
    state.isAdmin = Boolean(owner) && owner === (config.admin ?? "");
    $("#admin-entry").classList.toggle("hide", !state.isAdmin);
    const pool = await fetchPool(state.connection);
    state.pool = pool;
    if (!pool) {
      setStatus("\u8D28\u62BC\u6C60\u5C1A\u672A\u521B\u5EFA\u3002\u8FDE\u63A5\u9879\u76EE\u65B9\u94B1\u5305\u540E\u53EF\u5728\u4E0B\u65B9\u5B8C\u6210\u4E00\u6B21\u6027\u521D\u59CB\u5316\u3002", "error");
      $("#admin-only").classList.toggle("hide", !state.isAdmin);
      $("#init-card").classList.toggle("hide", !state.isAdmin);
      return;
    }
    $("#init-card").classList.add("hide");
    const [positions, rewardBalance, principalBalance, supply] = await Promise.all([
      loadAllPositions(),
      tokenBalance(pool.rewardVault),
      tokenBalance(pool.principalVault),
      readMintSupply(state.connection, new PublicKey(pool.mint)).then((supply2) => supply2 ?? 0n).catch(() => 0n)
    ]);
    state.positions = positions.value;
    state.positionsEndpoint = positions.endpoint;
    state.positionsError = positions.error;
    state.rewardBalance = rewardBalance;
    state.principalBalance = principalBalance;
    state.supply = supply;
    state.reserved = await reservedBalance();
    renderStats();
    renderTiersTable();
    renderPositionsTable();
    $("#admin-only").classList.toggle("hide", !state.isAdmin);
    if (state.wallet && !state.isAdmin) {
      setStatus("\u5F53\u524D\u94B1\u5305\u4E0D\u662F\u7BA1\u7406\u5458\u94B1\u5305\uFF0C\u7BA1\u7406\u64CD\u4F5C\u5DF2\u9690\u85CF\uFF08\u94FE\u4E0A\u540C\u6837\u4F1A\u62D2\u7EDD\uFF09\u3002", "error");
    } else if (state.isAdmin) {
      setStatus("\u5DF2\u8BC6\u522B\u7BA1\u7406\u5458\u94B1\u5305\u3002", "ok");
    }
    await loadActivity();
  } catch (error) {
    setStatus(`\u8BFB\u53D6\u5931\u8D25\uFF1A${error.message}`, "error");
  }
}
async function tokenBalance(address) {
  try {
    return await readTokenAmountOrZero(state.connection, new PublicKey(address));
  } catch {
    return 0n;
  }
}
async function loadAllPositions() {
  try {
    const { value, endpoint } = await withIndexedRpc((connection) => fetchAllPositions(connection));
    return { value, endpoint, error: null };
  } catch (error) {
    return { value: [], endpoint: null, error };
  }
}
function renderStats() {
  const pool = state.pool;
  const decimals = config.token.decimals;
  const available = availableRewards(state.rewardBalance, pool.totalCommitted);
  const usage = rewardPoolUsageBps(pool.totalCommitted, state.rewardBalance);
  const circulating = circulatingSupply();
  const host = $("#stats");
  host.replaceChildren(
    ...rows([
      ["\u4EE3\u5E01\u603B\u4F9B\u5E94\u91CF", `${formatTokens(state.supply, decimals)} ${config.token.symbol}`],
      ["\u6D41\u901A\u91CF\uFF08\u53E3\u5F84\u89C1\u4E0B\uFF09", circulating === null ? "\u5F85\u914D\u7F6E\u5206\u914D\u94B1\u5305" : `${formatTokens(circulating, decimals)} ${config.token.symbol}`],
      ["\u5F53\u524D\u8D28\u62BC\u603B\u91CF", `${formatTokens(pool.totalStaked, decimals)} ${config.token.symbol}`, "principal vault \u4F59\u989D\uFF1A" + formatTokens(state.principalBalance, decimals)],
      ["\u8D28\u62BC\u4EBA\u6570", String(pool.stakerCount), "\u7D2F\u8BA1\u5F00\u8FC7\u4ED3\u4F4D\u7684\u94B1\u5305\u6570"],
      ["\u53EF\u7528\u5956\u52B1", `${formatTokens(available, decimals)} ${config.token.symbol}`],
      ["\u5DF2\u627F\u8BFA\u5956\u52B1", `${formatTokens(pool.totalCommitted, decimals)} ${config.token.symbol}`],
      ["\u7D2F\u8BA1\u652F\u4ED8\u5956\u52B1", `${formatTokens(pool.totalPaid, decimals)} ${config.token.symbol}`],
      ["\u7D2F\u8BA1\u6CE8\u5165\u5956\u52B1", `${formatTokens(pool.totalFunded, decimals)} ${config.token.symbol}`],
      ["\u5956\u52B1\u6C60\u4F7F\u7528\u7387", `${(Number(usage) / 100).toFixed(2)}%`],
      ["\u5956\u52B1\u91D1\u5E93\u4F59\u989D", `${formatTokens(state.rewardBalance, decimals)} ${config.token.symbol}`],
      ["\u72B6\u6001", pool.paused ? "\u5DF2\u6682\u505C\u63A5\u53D7\u65B0\u8D28\u62BC" : "\u6B63\u5E38\u63A5\u53D7\u65B0\u8D28\u62BC"],
      ["\u7BA1\u7406\u5458", shorten(pool.admin, 6, 6)]
    ])
  );
  $("#supply-note").textContent = "\u6D41\u901A\u91CF = \u603B\u4F9B\u5E94\u91CF \u2212 \u5DF2\u914D\u7F6E\u7684\u50A8\u5907/\u6D41\u52A8\u6027/\u793E\u533A\u94B1\u5305\u4F59\u989D\uFF1B\u672A\u914D\u7F6E\u94B1\u5305\u5730\u5740\u65F6\u65E0\u6CD5\u8BA1\u7B97\uFF0C\u4E0D\u505A\u4F30\u7B97\u3002";
}
function circulatingSupply() {
  const wallets = (config.distribution ?? []).filter((item) => item.wallet);
  if (wallets.length === 0) return null;
  return state.supply > state.reserved ? state.supply - state.reserved : 0n;
}
async function reservedBalance() {
  const wallets = (config.distribution ?? []).filter((item) => item.wallet && item.wallet.length >= 32);
  if (wallets.length === 0) return null;
  const balances = await Promise.all(
    wallets.map((item) => {
      try {
        return tokenBalance(getAssociatedTokenAddressSync(new PublicKey(state.pool.mint), new PublicKey(item.wallet)).toBase58());
      } catch {
        return 0n;
      }
    })
  );
  return balances.reduce((sum, value) => sum + value, 0n);
}
function rows(items) {
  return items.map(
    ([label, value, hint]) => el(
      "div",
      { class: "kv__row" },
      el("dt", { text: label }),
      el("dd", { text: value + (hint ? `
${hint}` : "") })
    )
  );
}
function renderTiersTable() {
  const decimals = config.token.decimals;
  const pool = state.pool;
  const body = $("#tier-rows");
  body.replaceChildren(
    ...getTiers().map((tier, index) => {
      const onChain = pool.tiers[index];
      const staked = state.positions.filter((position) => position.tier === index).reduce((sum, position) => sum + position.amount, 0n);
      return el(
        "tr",
        {},
        el("td", { text: tier.label }),
        el("td", { text: formatBps(onChain.aprBps) }),
        el("td", { text: formatTokens(staked, decimals) }),
        el("td", { text: onChain.enabled ? "\u542F\u7528" : "\u505C\u7528" })
      );
    })
  );
  $("#apr-select").replaceChildren(
    ...getTiers().map((tier, index) => el("option", { value: String(index), text: `${tier.label}\uFF08\u5F53\u524D ${formatBps(pool.tiers[index].aprBps)}\uFF09` }))
  );
}
function renderPositionsTable() {
  const decimals = config.token.decimals;
  const body = $("#position-rows");
  const list = state.positions.slice(0, 100);
  body.replaceChildren(
    ...list.map(
      (position) => el(
        "tr",
        {},
        el("td", {}, el("a", { href: `https://solscan.io/account/${position.address}`, target: "_blank", rel: "noreferrer", text: shorten(position.owner, 4, 4) })),
        el("td", { text: getTiers()[position.tier]?.label ?? String(position.tier) }),
        el("td", { text: formatTokens(position.amount, decimals) }),
        el("td", { text: formatBps(position.aprBps) }),
        el("td", { text: position.unlockTs === 0n ? "\u7075\u6D3B" : formatDateTime(position.unlockTs) }),
        el("td", { text: formatTokens(position.claimed, decimals) })
      )
    )
  );
  $("#positions-note").textContent = state.positionsError ? `\u8BFB\u53D6\u4ED3\u4F4D\u5931\u8D25\uFF1A${indexedErrorText(state.positionsError)}\u3002\u53EF\u5728\u4E0A\u65B9\u300CRPC \u8BBE\u7F6E\u300D\u586B\u5165\u53EF\u7528\u7AEF\u70B9\u540E\u91CD\u8BD5\u3002` : list.length === 0 ? "\u6682\u65E0\u4ED3\u4F4D\u3002" : `\u663E\u793A ${list.length} / ${state.positions.length} \u4E2A\u4ED3\u4F4D\uFF08\u6309\u94FE\u4E0A\u8D26\u6237\u987A\u5E8F\uFF09${state.positionsEndpoint && state.positionsEndpoint !== state.connection.rpcEndpoint ? `\uFF0C\u6570\u636E\u6765\u81EA\u5907\u7528 RPC ${rpcLabel(state.positionsEndpoint)}` : ""}\u3002`;
}
async function loadActivity() {
  const host = $("#activity");
  try {
    const signatures = await state.connection.getSignaturesForAddress(new PublicKey(state.pool.address), { limit: 12 }, "confirmed");
    const events = [];
    for (const { signature, blockTime } of signatures) {
      const tx = await state.connection.getTransaction(signature, {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0
      });
      for (const event of parseEvents(tx?.meta?.logMessages)) {
        events.push({ ...event, signature, blockTime });
      }
      if (events.length >= 20) break;
    }
    if (events.length === 0) {
      host.replaceChildren(el("p", { class: "small muted", text: "\u6700\u8FD1\u6CA1\u6709\u53EF\u89E3\u6790\u7684\u7BA1\u7406\u4E8B\u4EF6\u3002" }));
      return;
    }
    host.replaceChildren(
      ...events.slice(0, 20).map((event) => el("div", { class: "position" }, el("div", { class: "position__meta" }, el("span", { text: describeEvent(event) }), el("span", {}, el("a", { href: `https://solscan.io/tx/${event.signature}`, target: "_blank", rel: "noreferrer", text: shorten(event.signature, 6, 6) })))))
    );
  } catch (error) {
    host.replaceChildren(el("p", { class: "small muted", text: `\u8BFB\u53D6\u4E8B\u4EF6\u5931\u8D25\uFF1A${error.message}` }));
  }
}
function describeEvent(event) {
  const decimals = config.token.decimals;
  switch (event.kind) {
    case "aprUpdated":
      return `${formatDateTime(event.timestamp)} \xB7 \u8C03\u6574 ${getTiers()[event.tier]?.label ?? event.tier} APR\uFF1A${formatBps(event.previousAprBps)} \u2192 ${formatBps(event.newAprBps)}`;
    case "rewardFunded":
      return `${formatDateTime(event.timestamp)} \xB7 \u8FFD\u52A0\u5956\u52B1 ${formatTokens(event.amount, decimals)} ${config.token.symbol}\uFF08\u53EF\u7528 ${formatTokens(event.available, decimals)}\uFF09`;
    case "pausedSet":
      return `${formatDateTime(event.timestamp)} \xB7 ${event.paused ? "\u6682\u505C" : "\u6062\u590D"}\u63A5\u53D7\u65B0\u8D28\u62BC`;
    case "staked":
      return `${formatDateTime(event.timestamp)} \xB7 ${shorten(event.owner, 4, 4)} \u8D28\u62BC ${formatTokens(event.amount, decimals)}\uFF08${formatBps(event.aprBps)}\uFF09`;
    case "rewardClaimed":
      return `${formatDateTime(event.timestamp)} \xB7 ${shorten(event.owner, 4, 4)} \u9886\u53D6\u5956\u52B1 ${formatTokens(event.amount, decimals)}`;
    case "unstaked":
      return `${formatDateTime(event.timestamp)} \xB7 ${shorten(event.owner, 4, 4)} \u89E3\u9664\u8D28\u62BC ${formatTokens(event.principal, decimals)}`;
    default:
      return `${formatDateTime(event.timestamp)} \xB7 ${event.kind}`;
  }
}
function renderInitForm() {
  $("#init-mint").value = config.token.mint || "";
  $("#init-tiers").replaceChildren(
    ...getTiers().map(
      (tier) => el(
        "tr",
        {},
        el("td", { text: tier.label }),
        el("td", { text: formatBps(tier.aprBps) }),
        el("td", { text: tier.lockSecs === 0 ? "\u65E0" : `${Math.round(tier.lockSecs / 86400)} \u5929` })
      )
    )
  );
}
async function onInitializePool() {
  if (!state.wallet) return toast("\u8BF7\u5148\u8FDE\u63A5\u9879\u76EE\u65B9\u94B1\u5305", "error");
  let mint;
  try {
    mint = new PublicKey($("#init-mint").value.trim());
  } catch {
    return toast("Mint \u5730\u5740\u65E0\u6548", "error");
  }
  let minStake;
  try {
    minStake = parseTokens($("#init-min").value || "0", config.token.decimals);
  } catch (error) {
    return toast(error.message, "error");
  }
  if (minStake <= 0n) return toast("\u6700\u5C0F\u8D28\u62BC\u91CF\u5FC5\u987B\u5927\u4E8E 0", "error");
  const tiers = getTiers().map((tier) => ({
    aprBps: BigInt(tier.aprBps),
    lockSecs: BigInt(tier.lockSecs),
    capSecs: BigInt(tier.capSecs)
  }));
  const authority = authorityPda();
  const principalVault = getAssociatedTokenAddressSync(mint, authority, true);
  const rewardVault = getAssociatedTokenAddressSync(mint, authority, true);
  const confirmed = await reviewTransaction({
    title: "\u521D\u59CB\u5316\u8D28\u62BC\u6C60",
    subtitle: "\u521B\u5EFA Pool \u8D26\u6237\u4E0E\u4E24\u4E2A\u4EE3\u5E01\u91D1\u5E93\u3002\u8FD9\u7EC4\u53C2\u6570\u5199\u5165\u540E\u4E0D\u53EF\u4FEE\u6539\u3002",
    rows: [
      ["Mint", mint.toBase58()],
      ["\u7BA1\u7406\u5458", shorten(state.wallet.publicKey.toBase58(), 6, 6)],
      ["\u6700\u5C0F\u8D28\u62BC\u91CF", formatTokens(minStake, config.token.decimals)],
      ...tiers.map((tier, index) => [getTiers()[index].label, formatBps(tier.aprBps)]),
      ["\u8D28\u62BC\u91D1\u5E93", principalVault.toBase58()],
      ["\u5956\u52B1\u91D1\u5E93", rewardVault.toBase58()]
    ],
    risks: [
      "\u7BA1\u7406\u5458\u5730\u5740\u5199\u5165\u540E\u4E0D\u53EF\u66F4\u6539\uFF0C\u8BF7\u4F7F\u7528\u957F\u671F\u53EF\u63A7\u7684\u94B1\u5305\u3002",
      "\u5956\u52B1\u91D1\u5E93\u4E0E\u7528\u6237\u672C\u91D1\u91D1\u5E93\u7531\u7A0B\u5E8F\u5F3A\u5236\u5206\u5F00\u3002",
      "\u521D\u59CB\u5316\u540E\u4ECD\u65E0\u4EBA\u80FD\u63D0\u53D6\u7528\u6237\u672C\u91D1\u6216\u5DF2\u627F\u8BFA\u5956\u52B1\u3002"
    ]
  });
  if (!confirmed) return;
  await withBusy($("#init-pool"), async () => {
    try {
      const ix = ixInitializePool({
        admin: state.wallet.publicKey,
        mint,
        principalVault,
        rewardVault,
        tiers,
        minStake
      });
      const tx = new Transaction().add(ix);
      tx.feePayer = state.wallet.publicKey;
      const signature = await signAndSend(state.connection, tx, state.wallet);
      toast(`\u8D28\u62BC\u6C60\u5DF2\u521D\u59CB\u5316\uFF1A${shorten(signature)}`, "ok");
      await refreshAll();
    } catch (error) {
      toast(error.message, "error");
    }
  });
}
async function onSetApr(event) {
  event.preventDefault();
  if (!state.isAdmin) return toast("\u53EA\u6709\u7BA1\u7406\u5458\u94B1\u5305\u53EF\u4EE5\u64CD\u4F5C", "error");
  const index = Number($("#apr-select").value);
  const percent = Number($("#apr-value").value);
  if (!Number.isFinite(percent) || percent <= 0 || percent > 30) {
    return toast("APR \u5FC5\u987B\u5728 0\u201330% \u4E4B\u95F4", "error");
  }
  const tier = getTiers()[index];
  const before = state.pool.tiers[index].aprBps;
  const after = BigInt(Math.round(percent * 100));
  if (BigInt(before) === after) return toast("APR \u672A\u53D8\u5316", "error");
  const confirmed = await reviewTransaction({
    title: "\u8C03\u6574\u672A\u6765 APR",
    subtitle: "\u53EA\u5F71\u54CD\u8C03\u6574\u4E4B\u540E\u65B0\u5F00\u7684\u4ED3\u4F4D\uFF0C\u5DF2\u5F00\u4ED3\u4F4D\u7EE7\u7EED\u6309\u539F APR \u7ED3\u7B97\u3002",
    rows: [
      ["\u6863\u4F4D", tier.label],
      ["\u5F53\u524D APR", formatBps(before)],
      ["\u65B0 APR", formatBps(after)],
      ["\u5F71\u54CD\u8303\u56F4", "\u4EC5\u8C03\u6574\u751F\u6548\u540E\u7684\u65B0\u8D28\u62BC"],
      ["\u5DF2\u627F\u8BFA\u5956\u52B1", "\u4E0D\u53D8"]
    ],
    risks: ["\u8C03\u6574\u4F1A\u6C38\u4E45\u5199\u5165\u94FE\u4E0A\u65E5\u5FD7\uFF0C\u53EF\u4F5C\u4E3A\u5386\u53F2\u8BB0\u5F55\u67E5\u8BE2\u3002", "\u5DF2\u5F00\u4ED3\u4F4D APR \u65E0\u6CD5\u88AB\u4FEE\u6539\u3002"]
  });
  if (!confirmed) return;
  await withBusy(event.submitter ?? $("#apr-submit"), async () => {
    try {
      const ix = ixSetApr({ admin: state.wallet.publicKey, tier: index, aprBps: after });
      const tx = new Transaction().add(ix);
      tx.feePayer = state.wallet.publicKey;
      const signature = await signAndSend(state.connection, tx, state.wallet);
      toast(`APR \u5DF2\u66F4\u65B0\uFF1A${shorten(signature)}`, "ok");
      await refreshAll();
    } catch (error) {
      toast(error.message, "error");
    }
  });
}
async function onFund(event) {
  event.preventDefault();
  if (!state.isAdmin) return toast("\u53EA\u6709\u7BA1\u7406\u5458\u94B1\u5305\u53EF\u4EE5\u64CD\u4F5C", "error");
  let amount;
  try {
    amount = parseTokens($("#fund-value").value, config.token.decimals);
  } catch (error) {
    return toast(error.message, "error");
  }
  if (amount <= 0n) return toast("\u8BF7\u8F93\u5165\u6570\u91CF", "error");
  const confirmed = await reviewTransaction({
    title: "\u8FFD\u52A0\u5956\u52B1",
    subtitle: "\u4EE3\u5E01\u4ECE\u7BA1\u7406\u5458\u94B1\u5305\u8F6C\u5165\u5956\u52B1\u91D1\u5E93\uFF0C\u53EA\u80FD\u589E\u52A0\uFF0C\u4E0D\u80FD\u53D6\u56DE\u3002",
    rows: [
      ["\u6570\u91CF", `${formatTokens(amount, config.token.decimals)} ${config.token.symbol}`],
      ["\u6765\u6E90", shorten(state.wallet.publicKey.toBase58(), 6, 6)],
      ["\u76EE\u6807\u91D1\u5E93", shorten(state.pool.rewardVault, 6, 6)]
    ],
    risks: ["\u8F6C\u5165\u5956\u52B1\u91D1\u5E93\u7684\u4EE3\u5E01\u5408\u7EA6\u5185\u6CA1\u6709\u53D6\u56DE\u6307\u4EE4\u3002", "\u8FFD\u52A0\u540E\u53EF\u7528\u5956\u52B1\u7ACB\u5373\u589E\u52A0\uFF0C\u53EF\u7528\u4E8E\u652F\u6491\u65B0\u4ED3\u4F4D\u7684\u627F\u8BFA\u3002"]
  });
  if (!confirmed) return;
  await withBusy(event.submitter ?? $("#fund-submit"), async () => {
    try {
      const adminAta = getAssociatedTokenAddressSync(new PublicKey(state.pool.mint), state.wallet.publicKey);
      const ix = ixFundRewards({
        admin: state.wallet.publicKey,
        adminAta,
        rewardVault: new PublicKey(state.pool.rewardVault),
        amount
      });
      const tx = new Transaction().add(ix);
      tx.feePayer = state.wallet.publicKey;
      const signature = await signAndSend(state.connection, tx, state.wallet);
      toast(`\u5956\u52B1\u5DF2\u8FFD\u52A0\uFF1A${shorten(signature)}`, "ok");
      $("#fund-value").value = "";
      await refreshAll();
    } catch (error) {
      toast(error.message, "error");
    }
  });
}
async function onTogglePause() {
  if (!state.isAdmin) return toast("\u53EA\u6709\u7BA1\u7406\u5458\u94B1\u5305\u53EF\u4EE5\u64CD\u4F5C", "error");
  const next = !state.pool.paused;
  const confirmed = await reviewTransaction({
    title: next ? "\u6682\u505C\u63A5\u53D7\u65B0\u8D28\u62BC" : "\u6062\u590D\u63A5\u53D7\u65B0\u8D28\u62BC",
    subtitle: "\u6682\u505C\u53EA\u963B\u6B62\u65B0\u5F00\u4ED3\u4F4D\uFF0C\u4E0D\u5F71\u54CD\u9886\u53D6\u5956\u52B1\u4E0E\u5230\u671F\u89E3\u9664\u3002",
    rows: [
      ["\u5F53\u524D\u72B6\u6001", state.pool.paused ? "\u5DF2\u6682\u505C" : "\u6B63\u5E38"],
      ["\u53D8\u66F4\u540E", next ? "\u6682\u505C" : "\u6B63\u5E38"]
    ],
    risks: ["\u73B0\u6709\u4ED3\u4F4D\u7684\u8BA1\u606F\u4E0E\u89E3\u9664\u4E0D\u53D7\u5F71\u54CD\u3002"]
  });
  if (!confirmed) return;
  await withBusy($("#pause"), async () => {
    try {
      const ix = ixSetPaused({ admin: state.wallet.publicKey, paused: next });
      const tx = new Transaction().add(ix);
      tx.feePayer = state.wallet.publicKey;
      const signature = await signAndSend(state.connection, tx, state.wallet);
      toast(`\u72B6\u6001\u5DF2\u66F4\u65B0\uFF1A${shorten(signature)}`, "ok");
      await refreshAll();
    } catch (error) {
      toast(error.message, "error");
    }
  });
}
window.auraAdminEstimate = (amountText, tierIndex) => {
  try {
    const amount = parseTokens(amountText, config.token.decimals);
    const tier = state.pool.tiers[tierIndex];
    return maxReward(amount, tier.aprBps, tier.capSecs);
  } catch {
    return 0n;
  }
};
//# sourceMappingURL=admin.js.map
