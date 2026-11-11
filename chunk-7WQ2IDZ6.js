import {
  Connection,
  getConfig
} from "./chunk-WXGNZ34X.js";

// src/lib/rpc.js
var FALLBACK_ENDPOINTS = {
  "mainnet-beta": ["https://public.rpc.solanavibestation.com"],
  devnet: ["https://api.devnet.solana.com"]
};
var UNAVAILABLE_PATTERN = /403|429|personal token|indexed requests|method not found|not available|not supported|disabled|too many|failed to fetch|networkerror|fetch failed|timed? ?out|502|503|504/i;
function savedRpc() {
  try {
    return localStorage.getItem("aura.rpc") || "";
  } catch {
    return "";
  }
}
function rpcLabel(endpoint) {
  try {
    return new URL(endpoint).host;
  } catch {
    return endpoint;
  }
}
function indexedEndpoints() {
  const config = getConfig();
  const configured = savedRpc() || config.rpc || "";
  const extra = Array.isArray(config.rpcFallbacks) ? config.rpcFallbacks : [];
  const defaults = FALLBACK_ENDPOINTS[config.network] ?? [];
  return [...new Set([configured, ...extra, ...defaults].filter(Boolean))];
}
function isEndpointUnavailable(error) {
  return UNAVAILABLE_PATTERN.test(String(error?.message ?? error ?? ""));
}
var IndexedRpcError = class extends Error {
  constructor(cause, endpoints) {
    super(cause?.message ?? "RPC \u8BFB\u53D6\u5931\u8D25");
    this.name = "IndexedRpcError";
    this.cause = cause;
    this.endpoints = endpoints;
  }
};
async function withIndexedRpc(operation) {
  const endpoints = indexedEndpoints();
  let lastError = null;
  const tried = [];
  for (const endpoint of endpoints) {
    tried.push(endpoint);
    try {
      const value = await operation(new Connection(endpoint, { commitment: "confirmed" }));
      return { value, endpoint };
    } catch (error) {
      if (!isEndpointUnavailable(error)) throw error;
      lastError = error;
    }
  }
  throw new IndexedRpcError(lastError, tried);
}
function indexedErrorText(error) {
  if (!(error instanceof IndexedRpcError)) return error.message;
  const tried = error.endpoints.map(rpcLabel).join("\u3001");
  return `${error.message}\uFF1B\u5DF2\u5C1D\u8BD5 ${tried}\uFF0C\u5747\u4E0D\u652F\u6301 getProgramAccounts\u3002\u53EF\u6539\u7528\u652F\u6301\u8BE5\u65B9\u6CD5\u7684 RPC\uFF08\u5730\u5740\u680F\u52A0 ?rpc=https://\u2026\uFF09\uFF0C\u6216\u5230 https://www.allnodes.com/publicnode \u7533\u8BF7\u4E2A\u4EBA token \u540E\u586B\u5165\u3002`;
}

export {
  rpcLabel,
  withIndexedRpc,
  indexedErrorText
};
//# sourceMappingURL=chunk-7WQ2IDZ6.js.map
