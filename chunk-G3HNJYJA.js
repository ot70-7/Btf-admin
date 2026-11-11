import {
  Connection,
  PublicKey,
  VersionedTransaction,
  __commonJS,
  __publicField,
  __toESM,
  getConfig,
  require_Layout,
  require_buffer
} from "./chunk-WXGNZ34X.js";

// node_modules/bigint-buffer/dist/browser.js
var require_browser = __commonJS({
  "node_modules/bigint-buffer/dist/browser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var converter;
    function toBigIntLE2(buf) {
      {
        const reversed = Buffer.from(buf);
        reversed.reverse();
        const hex = reversed.toString("hex");
        if (hex.length === 0) {
          return BigInt(0);
        }
        return BigInt(`0x${hex}`);
      }
      return converter.toBigInt(buf, false);
    }
    exports.toBigIntLE = toBigIntLE2;
    function toBigIntBE2(buf) {
      {
        const hex = buf.toString("hex");
        if (hex.length === 0) {
          return BigInt(0);
        }
        return BigInt(`0x${hex}`);
      }
      return converter.toBigInt(buf, true);
    }
    exports.toBigIntBE = toBigIntBE2;
    function toBufferLE2(num, width) {
      {
        const hex = num.toString(16);
        const buffer = Buffer.from(hex.padStart(width * 2, "0").slice(0, width * 2), "hex");
        buffer.reverse();
        return buffer;
      }
      return converter.fromBigInt(num, Buffer.allocUnsafe(width), false);
    }
    exports.toBufferLE = toBufferLE2;
    function toBufferBE2(num, width) {
      {
        const hex = num.toString(16);
        return Buffer.from(hex.padStart(width * 2, "0").slice(0, width * 2), "hex");
      }
      return converter.fromBigInt(num, Buffer.allocUnsafe(width), true);
    }
    exports.toBufferBE = toBufferBE2;
  }
});

// src/lib/polyfills.js
var import_buffer = __toESM(require_buffer(), 1);
if (!globalThis.Buffer) {
  globalThis.Buffer = import_buffer.Buffer;
}

// node_modules/@solana/spl-token/lib/esm/constants.js
var TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
var TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
var ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
var NATIVE_MINT = new PublicKey("So11111111111111111111111111111111111111112");
var NATIVE_MINT_2022 = new PublicKey("9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP");

// node_modules/@solana/spl-token/lib/esm/state/mint.js
var import_buffer_layout22 = __toESM(require_Layout(), 1);

// node_modules/@solana/buffer-layout-utils/lib/esm/base.mjs
var encodeDecode = (layout) => {
  const decode = layout.decode.bind(layout);
  const encode = layout.encode.bind(layout);
  return { decode, encode };
};

// node_modules/@solana/buffer-layout-utils/lib/esm/bigint.mjs
var import_buffer2 = __toESM(require_buffer(), 1);
var import_buffer_layout = __toESM(require_Layout(), 1);
var import_bigint_buffer = __toESM(require_browser(), 1);
function assertValidBigInteger(untrustedInput) {
  if (typeof untrustedInput !== "bigint") {
    throw new Error("Expected a `BigInt`");
  }
}
function bigInt_IMPL(littleEndian, length) {
  return (property) => {
    const layout = (0, import_buffer_layout.blob)(length, property);
    const { encode, decode } = encodeDecode(layout);
    const bigIntLayout = layout;
    bigIntLayout.decode = (buffer, offset) => {
      const src = decode(buffer, offset);
      return littleEndian ? (0, import_bigint_buffer.toBigIntLE)(import_buffer2.Buffer.from(src)) : (0, import_bigint_buffer.toBigIntBE)(import_buffer2.Buffer.from(src));
    };
    bigIntLayout.encode = (bigInt2, buffer, offset) => {
      assertValidBigInteger(bigInt2);
      let src;
      if (length === 0) {
        src = import_buffer2.Buffer.alloc(0);
      } else {
        src = littleEndian ? (0, import_bigint_buffer.toBufferLE)(bigInt2, length) : (0, import_bigint_buffer.toBufferBE)(bigInt2, length);
      }
      return encode(src, buffer, offset);
    };
    return bigIntLayout;
  };
}
var bigInt = /* @__PURE__ */ bigInt_IMPL.bind(
  null,
  /* littleEndian */
  true
);
var u64 = /* @__PURE__ */ bigInt(8);

// node_modules/bignumber.js/bignumber.mjs
var isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;
var mathceil = Math.ceil;
var mathfloor = Math.floor;
var bignumberError = "[BigNumber Error] ";
var tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ";
var BASE = 1e14;
var LOG_BASE = 14;
var MAX_SAFE_INTEGER = 9007199254740991;
var POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13];
var SQRT_BASE = 1e7;
var MAX = 1e9;
function clone(configObject) {
  var div, convertBase, parseNumeric, P = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: "\xA0",
    // non-breaking space
    suffix: ""
  }, ALPHABET2 = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
  function BigNumber2(v, b) {
    var alphabet, c, caseChanged, e, i, isNum, len, str, x = this;
    if (!(x instanceof BigNumber2)) return new BigNumber2(v, b);
    if (b == null) {
      if (v && v._isBigNumber === true) {
        x.s = v.s;
        if (!v.c || v.e > MAX_EXP) {
          x.c = x.e = null;
        } else if (v.e < MIN_EXP) {
          x.c = [x.e = 0];
        } else {
          x.e = v.e;
          x.c = v.c.slice();
        }
        return;
      }
      if ((isNum = typeof v == "number") && v * 0 == 0) {
        x.s = 1 / v < 0 ? (v = -v, -1) : 1;
        if (v === ~~v) {
          for (e = 0, i = v; i >= 10; i /= 10, e++) ;
          if (e > MAX_EXP) {
            x.c = x.e = null;
          } else {
            x.e = e;
            x.c = [v];
          }
          return;
        }
        str = String(v);
      } else {
        if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);
        x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
      }
      if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
      if ((i = str.search(/e/i)) > 0) {
        if (e < 0) e = i;
        e += +str.slice(i + 1);
        str = str.substring(0, i);
      } else if (e < 0) {
        e = str.length;
      }
    } else {
      intCheck(b, 2, ALPHABET2.length, "Base");
      if (b == 10 && alphabetHasNormalDecimalDigits) {
        x = new BigNumber2(v);
        return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
      }
      str = String(v);
      if (isNum = typeof v == "number") {
        if (v * 0 != 0) return parseNumeric(x, str, isNum, b);
        x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
        if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
          throw Error(tooManyDigits + v);
        }
      } else {
        x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
      }
      alphabet = ALPHABET2.slice(0, b);
      e = i = 0;
      for (len = str.length; i < len; i++) {
        if (alphabet.indexOf(c = str.charAt(i)) < 0) {
          if (c == ".") {
            if (i > e) {
              e = len;
              continue;
            }
          } else if (!caseChanged) {
            if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
              caseChanged = true;
              i = -1;
              e = 0;
              continue;
            }
          }
          return parseNumeric(x, String(v), isNum, b);
        }
      }
      isNum = false;
      str = convertBase(str, b, 10, x.s);
      if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
      else e = str.length;
    }
    for (i = 0; str.charCodeAt(i) === 48; i++) ;
    for (len = str.length; str.charCodeAt(--len) === 48; ) ;
    if (str = str.slice(i, ++len)) {
      len -= i;
      if (isNum && BigNumber2.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
        throw Error(tooManyDigits + x.s * v);
      }
      if ((e = e - i - 1) > MAX_EXP) {
        x.c = x.e = null;
      } else if (e < MIN_EXP) {
        x.c = [x.e = 0];
      } else {
        x.e = e;
        x.c = [];
        i = (e + 1) % LOG_BASE;
        if (e < 0) i += LOG_BASE;
        if (i < len) {
          if (i) x.c.push(+str.slice(0, i));
          for (len -= LOG_BASE; i < len; ) {
            x.c.push(+str.slice(i, i += LOG_BASE));
          }
          i = LOG_BASE - (str = str.slice(i)).length;
        } else {
          i -= len;
        }
        for (; i--; str += "0") ;
        x.c.push(+str);
      }
    } else {
      x.c = [x.e = 0];
    }
  }
  BigNumber2.clone = clone;
  BigNumber2.ROUND_UP = 0;
  BigNumber2.ROUND_DOWN = 1;
  BigNumber2.ROUND_CEIL = 2;
  BigNumber2.ROUND_FLOOR = 3;
  BigNumber2.ROUND_HALF_UP = 4;
  BigNumber2.ROUND_HALF_DOWN = 5;
  BigNumber2.ROUND_HALF_EVEN = 6;
  BigNumber2.ROUND_HALF_CEIL = 7;
  BigNumber2.ROUND_HALF_FLOOR = 8;
  BigNumber2.EUCLID = 9;
  BigNumber2.config = BigNumber2.set = function(obj) {
    var p, v;
    if (obj != null) {
      if (typeof obj == "object") {
        if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          DECIMAL_PLACES = v;
        }
        if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
          v = obj[p];
          intCheck(v, 0, 8, p);
          ROUNDING_MODE = v;
        }
        if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, 0, p);
            intCheck(v[1], 0, MAX, p);
            TO_EXP_NEG = v[0];
            TO_EXP_POS = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
          }
        }
        if (obj.hasOwnProperty(p = "RANGE")) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, -1, p);
            intCheck(v[1], 1, MAX, p);
            MIN_EXP = v[0];
            MAX_EXP = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            if (v) {
              MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
            } else {
              throw Error(bignumberError + p + " cannot be zero: " + v);
            }
          }
        }
        if (obj.hasOwnProperty(p = "CRYPTO")) {
          v = obj[p];
          if (v === !!v) {
            if (v) {
              if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                CRYPTO = v;
              } else {
                CRYPTO = !v;
                throw Error(bignumberError + "crypto unavailable");
              }
            } else {
              CRYPTO = v;
            }
          } else {
            throw Error(bignumberError + p + " not true or false: " + v);
          }
        }
        if (obj.hasOwnProperty(p = "MODULO_MODE")) {
          v = obj[p];
          intCheck(v, 0, 9, p);
          MODULO_MODE = v;
        }
        if (obj.hasOwnProperty(p = "POW_PRECISION")) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          POW_PRECISION = v;
        }
        if (obj.hasOwnProperty(p = "FORMAT")) {
          v = obj[p];
          if (typeof v == "object") FORMAT = v;
          else throw Error(bignumberError + p + " not an object: " + v);
        }
        if (obj.hasOwnProperty(p = "ALPHABET")) {
          v = obj[p];
          if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
            alphabetHasNormalDecimalDigits = v.slice(0, 10) == "0123456789";
            ALPHABET2 = v;
          } else {
            throw Error(bignumberError + p + " invalid: " + v);
          }
        }
      } else {
        throw Error(bignumberError + "Object expected: " + obj);
      }
    }
    return {
      DECIMAL_PLACES,
      ROUNDING_MODE,
      EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
      RANGE: [MIN_EXP, MAX_EXP],
      CRYPTO,
      MODULO_MODE,
      POW_PRECISION,
      FORMAT,
      ALPHABET: ALPHABET2
    };
  };
  BigNumber2.isBigNumber = function(v) {
    if (!v || v._isBigNumber !== true) return false;
    if (!BigNumber2.DEBUG) return true;
    var i, n, c = v.c, e = v.e, s = v.s;
    out: if ({}.toString.call(c) == "[object Array]") {
      if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
        if (c[0] === 0) {
          if (e === 0 && c.length === 1) return true;
          break out;
        }
        i = (e + 1) % LOG_BASE;
        if (i < 1) i += LOG_BASE;
        if (String(c[0]).length == i) {
          for (i = 0; i < c.length; i++) {
            n = c[i];
            if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
          }
          if (n !== 0) return true;
        }
      }
    } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
      return true;
    }
    throw Error(bignumberError + "Invalid BigNumber: " + v);
  };
  BigNumber2.maximum = BigNumber2.max = function() {
    return maxOrMin(arguments, -1);
  };
  BigNumber2.minimum = BigNumber2.min = function() {
    return maxOrMin(arguments, 1);
  };
  BigNumber2.random = function() {
    var pow2_53 = 9007199254740992;
    var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
      return mathfloor(Math.random() * pow2_53);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(dp) {
      var a, b, e, k, v, i = 0, c = [], rand = new BigNumber2(ONE);
      if (dp == null) dp = DECIMAL_PLACES;
      else intCheck(dp, 0, MAX);
      k = mathceil(dp / LOG_BASE);
      if (CRYPTO) {
        if (crypto.getRandomValues) {
          a = crypto.getRandomValues(new Uint32Array(k *= 2));
          for (; i < k; ) {
            v = a[i] * 131072 + (a[i + 1] >>> 11);
            if (v >= 9e15) {
              b = crypto.getRandomValues(new Uint32Array(2));
              a[i] = b[0];
              a[i + 1] = b[1];
            } else {
              c.push(v % 1e14);
              i += 2;
            }
          }
          i = k / 2;
        } else if (crypto.randomBytes) {
          a = crypto.randomBytes(k *= 7);
          for (; i < k; ) {
            v = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
            if (v >= 9e15) {
              crypto.randomBytes(7).copy(a, i);
            } else {
              c.push(v % 1e14);
              i += 7;
            }
          }
          i = k / 7;
        } else {
          CRYPTO = false;
          throw Error(bignumberError + "crypto unavailable");
        }
      }
      if (!CRYPTO) {
        for (; i < k; ) {
          v = random53bitInt();
          if (v < 9e15) c[i++] = v % 1e14;
        }
      }
      k = c[--i];
      dp %= LOG_BASE;
      if (k && dp) {
        v = POWS_TEN[LOG_BASE - dp];
        c[i] = mathfloor(k / v) * v;
      }
      for (; c[i] === 0; c.pop(), i--) ;
      if (i < 0) {
        c = [e = 0];
      } else {
        for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE) ;
        for (i = 1, v = c[0]; v >= 10; v /= 10, i++) ;
        if (i < LOG_BASE) e -= LOG_BASE - i;
      }
      rand.e = e;
      rand.c = c;
      return rand;
    };
  }();
  BigNumber2.sum = function() {
    var i = 1, args = arguments, sum = new BigNumber2(args[0]);
    for (; i < args.length; ) sum = sum.plus(args[i++]);
    return sum;
  };
  convertBase = /* @__PURE__ */ function() {
    var decimal = "0123456789";
    function toBaseOut(str, baseIn, baseOut, alphabet) {
      var j, arr = [0], arrL, i = 0, len = str.length;
      for (; i < len; ) {
        for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) ;
        arr[0] += alphabet.indexOf(str.charAt(i++));
        for (j = 0; j < arr.length; j++) {
          if (arr[j] > baseOut - 1) {
            if (arr[j + 1] == null) arr[j + 1] = 0;
            arr[j + 1] += arr[j] / baseOut | 0;
            arr[j] %= baseOut;
          }
        }
      }
      return arr.reverse();
    }
    return function(str, baseIn, baseOut, sign, callerIsToString) {
      var alphabet, d, e, k, r, x, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
      if (i >= 0) {
        k = POW_PRECISION;
        POW_PRECISION = 0;
        str = str.replace(".", "");
        y = new BigNumber2(baseIn);
        x = y.pow(str.length - i);
        POW_PRECISION = k;
        y.c = toBaseOut(
          toFixedPoint(coeffToString(x.c), x.e, "0"),
          10,
          baseOut,
          decimal
        );
        y.e = y.c.length;
      }
      xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET2, decimal) : (alphabet = decimal, ALPHABET2));
      e = k = xc.length;
      for (; xc[--k] == 0; xc.pop()) ;
      if (!xc[0]) return alphabet.charAt(0);
      if (i < 0) {
        --e;
      } else {
        x.c = xc;
        x.e = e;
        x.s = sign;
        x = div(x, y, dp, rm, baseOut);
        xc = x.c;
        r = x.r;
        e = x.e;
      }
      d = e + dp + 1;
      i = xc[d];
      k = baseOut / 2;
      r = r || d < 0 || xc[d + 1] != null;
      r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
      if (d < 1 || !xc[0]) {
        str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
      } else {
        xc.length = d;
        if (r) {
          for (--baseOut; ++xc[--d] > baseOut; ) {
            xc[d] = 0;
            if (!d) {
              ++e;
              xc = [1].concat(xc);
            }
          }
        }
        for (k = xc.length; !xc[--k]; ) ;
        for (i = 0, str = ""; i <= k; str += alphabet.charAt(xc[i++])) ;
        str = toFixedPoint(str, e, alphabet.charAt(0));
      }
      return str;
    };
  }();
  div = /* @__PURE__ */ function() {
    function multiply(x, k, base) {
      var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
      for (x = x.slice(); i--; ) {
        xlo = x[i] % SQRT_BASE;
        xhi = x[i] / SQRT_BASE | 0;
        m = khi * xlo + xhi * klo;
        temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
        carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
        x[i] = temp % base;
      }
      if (carry) x = [carry].concat(x);
      return x;
    }
    function compare2(a, b, aL, bL) {
      var i, cmp;
      if (aL != bL) {
        cmp = aL > bL ? 1 : -1;
      } else {
        for (i = cmp = 0; i < aL; i++) {
          if (a[i] != b[i]) {
            cmp = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }
      return cmp;
    }
    function subtract(a, b, aL, base) {
      var i = 0;
      for (; aL--; ) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
      }
      for (; !a[0] && a.length > 1; a.splice(0, 1)) ;
    }
    return function(x, y, dp, rm, base) {
      var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
      if (!xc || !xc[0] || !yc || !yc[0]) {
        return new BigNumber2(
          // Return NaN if either NaN, or both Infinity or 0.
          !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
          )
        );
      }
      q = new BigNumber2(s);
      qc = q.c = [];
      e = x.e - y.e;
      s = dp + e + 1;
      if (!base) {
        base = BASE;
        e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
        s = s / LOG_BASE | 0;
      }
      for (i = 0; yc[i] == (xc[i] || 0); i++) ;
      if (yc[i] > (xc[i] || 0)) e--;
      if (s < 0) {
        qc.push(1);
        more = true;
      } else {
        xL = xc.length;
        yL = yc.length;
        i = 0;
        s += 2;
        n = mathfloor(base / (yc[0] + 1));
        if (n > 1) {
          yc = multiply(yc, n, base);
          xc = multiply(xc, n, base);
          yL = yc.length;
          xL = xc.length;
        }
        xi = yL;
        rem = xc.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; rem[remL++] = 0) ;
        yz = yc.slice();
        yz = [0].concat(yz);
        yc0 = yc[0];
        if (yc[1] >= base / 2) yc0++;
        do {
          n = 0;
          cmp = compare2(yc, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
            n = mathfloor(rem0 / yc0);
            if (n > 1) {
              if (n >= base) n = base - 1;
              prod = multiply(yc, n, base);
              prodL = prod.length;
              remL = rem.length;
              while (compare2(prod, rem, prodL, remL) == 1) {
                n--;
                subtract(prod, yL < prodL ? yz : yc, prodL, base);
                prodL = prod.length;
                cmp = 1;
              }
            } else {
              if (n == 0) {
                cmp = n = 1;
              }
              prod = yc.slice();
              prodL = prod.length;
            }
            if (prodL < remL) prod = [0].concat(prod);
            subtract(rem, prod, remL, base);
            remL = rem.length;
            if (cmp == -1) {
              while (compare2(yc, rem, yL, remL) < 1) {
                n++;
                subtract(rem, yL < remL ? yz : yc, remL, base);
                remL = rem.length;
              }
            }
          } else if (cmp === 0) {
            n++;
            rem = [0];
          }
          qc[i++] = n;
          if (rem[0]) {
            rem[remL++] = xc[xi] || 0;
          } else {
            rem = [xc[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] != null) && s--);
        more = rem[0] != null;
        if (!qc[0]) qc.splice(0, 1);
      }
      if (base == BASE) {
        for (i = 1, s = qc[0]; s >= 10; s /= 10, i++) ;
        round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);
      } else {
        q.e = e;
        q.r = +more;
      }
      return q;
    };
  }();
  function format(n, i, rm, id) {
    var c0, e, ne, len, str;
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    if (!n.c) return n.toString();
    c0 = n.c[0];
    ne = n.e;
    if (i == null) {
      str = coeffToString(n.c);
      str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
    } else {
      n = round(new BigNumber2(n), i, rm);
      e = n.e;
      str = coeffToString(n.c);
      len = str.length;
      if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
        for (; len < i; str += "0", len++) ;
        str = toExponential(str, e);
      } else {
        i -= ne + (id === 2 && e > ne);
        str = toFixedPoint(str, e, "0");
        if (e + 1 > len) {
          if (--i > 0) for (str += "."; i--; str += "0") ;
        } else {
          i += e - len;
          if (i > 0) {
            if (e + 1 == len) str += ".";
            for (; i--; str += "0") ;
          }
        }
      }
    }
    return n.s < 0 && c0 ? "-" + str : str;
  }
  function maxOrMin(args, n) {
    var k, y, i = 1, x = new BigNumber2(args[0]);
    for (; i < args.length; i++) {
      y = new BigNumber2(args[i]);
      if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
        x = y;
      }
    }
    return x;
  }
  function normalise(n, c, e) {
    var i = 1, j = c.length;
    for (; !c[--j]; c.pop()) ;
    for (j = c[0]; j >= 10; j /= 10, i++) ;
    if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
      n.c = n.e = null;
    } else if (e < MIN_EXP) {
      n.c = [n.e = 0];
    } else {
      n.e = e;
      n.c = c;
    }
    return n;
  }
  parseNumeric = /* @__PURE__ */ function() {
    var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(x, str, isNum, b) {
      var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
      if (isInfinityOrNaN.test(s)) {
        x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
      } else {
        if (!isNum) {
          s = s.replace(basePrefix, function(m, p1, p2) {
            base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
            return !b || b == base ? p1 : m;
          });
          if (b) {
            base = b;
            s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
          }
          if (str != s) return new BigNumber2(s, base);
        }
        if (BigNumber2.DEBUG) {
          throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
        }
        x.s = null;
      }
      x.c = x.e = null;
    };
  }();
  function round(x, sd, rm, r) {
    var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
    if (xc) {
      out: {
        for (d = 1, k = xc[0]; k >= 10; k /= 10, d++) ;
        i = sd - d;
        if (i < 0) {
          i += LOG_BASE;
          j = sd;
          n = xc[ni = 0];
          rd = mathfloor(n / pows10[d - j - 1] % 10);
        } else {
          ni = mathceil((i + 1) / LOG_BASE);
          if (ni >= xc.length) {
            if (r) {
              for (; xc.length <= ni; xc.push(0)) ;
              n = rd = 0;
              d = 1;
              i %= LOG_BASE;
              j = i - LOG_BASE + 1;
            } else {
              break out;
            }
          } else {
            n = k = xc[ni];
            for (d = 1; k >= 10; k /= 10, d++) ;
            i %= LOG_BASE;
            j = i - LOG_BASE + d;
            rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
          }
        }
        r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
        r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
        if (sd < 1 || !xc[0]) {
          xc.length = 0;
          if (r) {
            sd -= x.e + 1;
            xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
            x.e = -sd || 0;
          } else {
            xc[0] = x.e = 0;
          }
          return x;
        }
        if (i == 0) {
          xc.length = ni;
          k = 1;
          ni--;
        } else {
          xc.length = ni + 1;
          k = pows10[LOG_BASE - i];
          xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
        }
        if (r) {
          for (; ; ) {
            if (ni == 0) {
              for (i = 1, j = xc[0]; j >= 10; j /= 10, i++) ;
              j = xc[0] += k;
              for (k = 1; j >= 10; j /= 10, k++) ;
              if (i != k) {
                x.e++;
                if (xc[0] == BASE) xc[0] = 1;
              }
              break;
            } else {
              xc[ni] += k;
              if (xc[ni] != BASE) break;
              xc[ni--] = 0;
              k = 1;
            }
          }
        }
        for (i = xc.length; xc[--i] === 0; xc.pop()) ;
      }
      if (x.e > MAX_EXP) {
        x.c = x.e = null;
      } else if (x.e < MIN_EXP) {
        x.c = [x.e = 0];
      }
    }
    return x;
  }
  function valueOf(n) {
    var str, e = n.e;
    if (e === null) return n.toString();
    str = coeffToString(n.c);
    str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
    return n.s < 0 ? "-" + str : str;
  }
  P.absoluteValue = P.abs = function() {
    var x = new BigNumber2(this);
    if (x.s < 0) x.s = 1;
    return x;
  };
  P.comparedTo = function(y, b) {
    return compare(this, new BigNumber2(y, b));
  };
  P.decimalPlaces = P.dp = function(dp, rm) {
    var c, n, v, x = this;
    if (dp != null) {
      intCheck(dp, 0, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(new BigNumber2(x), dp + x.e + 1, rm);
    }
    if (!(c = x.c)) return null;
    n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
    if (v = c[v]) for (; v % 10 == 0; v /= 10, n--) ;
    if (n < 0) n = 0;
    return n;
  };
  P.dividedBy = P.div = function(y, b) {
    return div(this, new BigNumber2(y, b), DECIMAL_PLACES, ROUNDING_MODE);
  };
  P.dividedToIntegerBy = P.idiv = function(y, b) {
    return div(this, new BigNumber2(y, b), 0, 1);
  };
  P.exponentiatedBy = P.pow = function(n, m) {
    var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
    n = new BigNumber2(n);
    if (n.c && !n.isInteger()) {
      throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
    }
    if (m != null) m = new BigNumber2(m);
    nIsBig = n.e > 14;
    if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
      y = new BigNumber2(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
      return m ? y.mod(m) : y;
    }
    nIsNeg = n.s < 0;
    if (m) {
      if (m.c ? !m.c[0] : !m.s) return new BigNumber2(NaN);
      isModExp = !nIsNeg && x.isInteger() && m.isInteger();
      if (isModExp) x = x.mod(m);
    } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
      k = x.s < 0 && isOdd(n) ? -0 : 0;
      if (x.e > -1) k = 1 / k;
      return new BigNumber2(nIsNeg ? 1 / k : k);
    } else if (POW_PRECISION) {
      k = mathceil(POW_PRECISION / LOG_BASE + 2);
    }
    if (nIsBig) {
      half = new BigNumber2(0.5);
      if (nIsNeg) n.s = 1;
      nIsOdd = isOdd(n);
    } else {
      i = Math.abs(+valueOf(n));
      nIsOdd = i % 2;
    }
    y = new BigNumber2(ONE);
    for (; ; ) {
      if (nIsOdd) {
        y = y.times(x);
        if (!y.c) break;
        if (k) {
          if (y.c.length > k) y.c.length = k;
        } else if (isModExp) {
          y = y.mod(m);
        }
      }
      if (i) {
        i = mathfloor(i / 2);
        if (i === 0) break;
        nIsOdd = i % 2;
      } else {
        n = n.times(half);
        round(n, n.e + 1, 1);
        if (n.e > 14) {
          nIsOdd = isOdd(n);
        } else {
          i = +valueOf(n);
          if (i === 0) break;
          nIsOdd = i % 2;
        }
      }
      x = x.times(x);
      if (k) {
        if (x.c && x.c.length > k) x.c.length = k;
      } else if (isModExp) {
        x = x.mod(m);
      }
    }
    if (isModExp) return y;
    if (nIsNeg) y = ONE.div(y);
    return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
  };
  P.integerValue = function(rm) {
    var n = new BigNumber2(this);
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    return round(n, n.e + 1, rm);
  };
  P.isEqualTo = P.eq = function(y, b) {
    return compare(this, new BigNumber2(y, b)) === 0;
  };
  P.isFinite = function() {
    return !!this.c;
  };
  P.isGreaterThan = P.gt = function(y, b) {
    return compare(this, new BigNumber2(y, b)) > 0;
  };
  P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
    return (b = compare(this, new BigNumber2(y, b))) === 1 || b === 0;
  };
  P.isInteger = function() {
    return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
  };
  P.isLessThan = P.lt = function(y, b) {
    return compare(this, new BigNumber2(y, b)) < 0;
  };
  P.isLessThanOrEqualTo = P.lte = function(y, b) {
    return (b = compare(this, new BigNumber2(y, b))) === -1 || b === 0;
  };
  P.isNaN = function() {
    return !this.s;
  };
  P.isNegative = function() {
    return this.s < 0;
  };
  P.isPositive = function() {
    return this.s > 0;
  };
  P.isZero = function() {
    return !!this.c && this.c[0] == 0;
  };
  P.minus = function(y, b) {
    var i, j, t, xLTy, x = this, a = x.s;
    y = new BigNumber2(y, b);
    b = y.s;
    if (!a || !b) return new BigNumber2(NaN);
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }
    var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
    if (!xe || !ye) {
      if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber2(yc ? x : NaN);
      if (!xc[0] || !yc[0]) {
        return yc[0] ? (y.s = -b, y) : new BigNumber2(xc[0] ? x : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          ROUNDING_MODE == 3 ? -0 : 0
        ));
      }
    }
    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();
    if (a = xe - ye) {
      if (xLTy = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }
      t.reverse();
      for (b = a; b--; t.push(0)) ;
      t.reverse();
    } else {
      j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
      for (a = b = 0; b < j; b++) {
        if (xc[b] != yc[b]) {
          xLTy = xc[b] < yc[b];
          break;
        }
      }
    }
    if (xLTy) {
      t = xc;
      xc = yc;
      yc = t;
      y.s = -y.s;
    }
    b = (j = yc.length) - (i = xc.length);
    if (b > 0) for (; b--; xc[i++] = 0) ;
    b = BASE - 1;
    for (; j > a; ) {
      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i]; xc[i] = b) ;
        --xc[i];
        xc[j] += BASE;
      }
      xc[j] -= yc[j];
    }
    for (; xc[0] == 0; xc.splice(0, 1), --ye) ;
    if (!xc[0]) {
      y.s = ROUNDING_MODE == 3 ? -1 : 1;
      y.c = [y.e = 0];
      return y;
    }
    return normalise(y, xc, ye);
  };
  P.modulo = P.mod = function(y, b) {
    var q, s, x = this;
    y = new BigNumber2(y, b);
    if (!x.c || !y.s || y.c && !y.c[0]) {
      return new BigNumber2(NaN);
    } else if (!y.c || x.c && !x.c[0]) {
      return new BigNumber2(x);
    }
    if (MODULO_MODE == 9) {
      s = y.s;
      y.s = 1;
      q = div(x, y, 0, 3);
      y.s = s;
      q.s *= s;
    } else {
      q = div(x, y, 0, MODULO_MODE);
    }
    y = x.minus(q.times(y));
    if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;
    return y;
  };
  P.multipliedBy = P.times = function(y, b) {
    var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber2(y, b)).c;
    if (!xc || !yc || !xc[0] || !yc[0]) {
      if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
        y.c = y.e = y.s = null;
      } else {
        y.s *= x.s;
        if (!xc || !yc) {
          y.c = y.e = null;
        } else {
          y.c = [0];
          y.e = 0;
        }
      }
      return y;
    }
    e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
    y.s *= x.s;
    xcL = xc.length;
    ycL = yc.length;
    if (xcL < ycL) {
      zc = xc;
      xc = yc;
      yc = zc;
      i = xcL;
      xcL = ycL;
      ycL = i;
    }
    for (i = xcL + ycL, zc = []; i--; zc.push(0)) ;
    base = BASE;
    sqrtBase = SQRT_BASE;
    for (i = ycL; --i >= 0; ) {
      c = 0;
      ylo = yc[i] % sqrtBase;
      yhi = yc[i] / sqrtBase | 0;
      for (k = xcL, j = i + k; j > i; ) {
        xlo = xc[--k] % sqrtBase;
        xhi = xc[k] / sqrtBase | 0;
        m = yhi * xlo + xhi * ylo;
        xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
        c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
        zc[j--] = xlo % base;
      }
      zc[j] = c;
    }
    if (c) {
      ++e;
    } else {
      zc.splice(0, 1);
    }
    return normalise(y, zc, e);
  };
  P.negated = function() {
    var x = new BigNumber2(this);
    x.s = -x.s || null;
    return x;
  };
  P.plus = function(y, b) {
    var t, x = this, a = x.s;
    y = new BigNumber2(y, b);
    b = y.s;
    if (!a || !b) return new BigNumber2(NaN);
    if (a != b) {
      y.s = -b;
      return x.minus(y);
    }
    var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
    if (!xe || !ye) {
      if (!xc || !yc) return new BigNumber2(a / 0);
      if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber2(xc[0] ? x : a * 0);
    }
    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();
    if (a = xe - ye) {
      if (a > 0) {
        ye = xe;
        t = yc;
      } else {
        a = -a;
        t = xc;
      }
      t.reverse();
      for (; a--; t.push(0)) ;
      t.reverse();
    }
    a = xc.length;
    b = yc.length;
    if (a - b < 0) {
      t = yc;
      yc = xc;
      xc = t;
      b = a;
    }
    for (a = 0; b; ) {
      a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
      xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
    }
    if (a) {
      xc = [a].concat(xc);
      ++ye;
    }
    return normalise(y, xc, ye);
  };
  P.precision = P.sd = function(sd, rm) {
    var c, n, v, x = this;
    if (sd != null && sd !== !!sd) {
      intCheck(sd, 1, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(new BigNumber2(x), sd, rm);
    }
    if (!(c = x.c)) return null;
    v = c.length - 1;
    n = v * LOG_BASE + 1;
    if (v = c[v]) {
      for (; v % 10 == 0; v /= 10, n--) ;
      for (v = c[0]; v >= 10; v /= 10, n++) ;
    }
    if (sd && x.e + 1 > n) n = x.e + 1;
    return n;
  };
  P.shiftedBy = function(k) {
    intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
    return this.times("1e" + k);
  };
  P.squareRoot = P.sqrt = function() {
    var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
    if (s !== 1 || !c || !c[0]) {
      return new BigNumber2(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
    }
    s = Math.sqrt(+valueOf(x));
    if (s == 0 || s == 1 / 0) {
      n = coeffToString(c);
      if ((n.length + e) % 2 == 0) n += "0";
      s = Math.sqrt(+n);
      e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
      if (s == 1 / 0) {
        n = "5e" + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf("e") + 1) + e;
      }
      r = new BigNumber2(n);
    } else {
      r = new BigNumber2(s + "");
    }
    if (r.c[0]) {
      e = r.e;
      s = e + dp;
      if (s < 3) s = 0;
      for (; ; ) {
        t = r;
        r = half.times(t.plus(div(x, t, dp, 1)));
        if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
          if (r.e < e) --s;
          n = n.slice(s - 3, s + 1);
          if (n == "9999" || !rep && n == "4999") {
            if (!rep) {
              round(t, t.e + DECIMAL_PLACES + 2, 0);
              if (t.times(t).eq(x)) {
                r = t;
                break;
              }
            }
            dp += 4;
            s += 4;
            rep = 1;
          } else {
            if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
              round(r, r.e + DECIMAL_PLACES + 2, 1);
              m = !r.times(r).eq(x);
            }
            break;
          }
        }
      }
    }
    return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
  };
  P.toExponential = function(dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp++;
    }
    return format(this, dp, rm, 1);
  };
  P.toFixed = function(dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp = dp + this.e + 1;
    }
    return format(this, dp, rm);
  };
  P.toFormat = function(dp, rm, format2) {
    var str, x = this;
    if (format2 == null) {
      if (dp != null && rm && typeof rm == "object") {
        format2 = rm;
        rm = null;
      } else if (dp && typeof dp == "object") {
        format2 = dp;
        dp = rm = null;
      } else {
        format2 = FORMAT;
      }
    } else if (typeof format2 != "object") {
      throw Error(bignumberError + "Argument not an object: " + format2);
    }
    str = x.toFixed(dp, rm);
    if (x.c) {
      var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
      if (g2) {
        i = g1;
        g1 = g2;
        g2 = i;
        len -= i;
      }
      if (g1 > 0 && len > 0) {
        i = len % g1 || g1;
        intPart = intDigits.substr(0, i);
        for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
        if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
        if (isNeg) intPart = "-" + intPart;
      }
      str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
        new RegExp("\\d{" + g2 + "}\\B", "g"),
        "$&" + (format2.fractionGroupSeparator || "")
      ) : fractionPart) : intPart;
    }
    return (format2.prefix || "") + str + (format2.suffix || "");
  };
  P.toFraction = function(md) {
    var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
    if (md != null) {
      n = new BigNumber2(md);
      if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
        throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
      }
    }
    if (!xc) return new BigNumber2(x);
    d = new BigNumber2(ONE);
    n1 = d0 = new BigNumber2(ONE);
    d1 = n0 = new BigNumber2(ONE);
    s = coeffToString(xc);
    e = d.e = s.length - x.e - 1;
    d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
    md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
    exp = MAX_EXP;
    MAX_EXP = 1 / 0;
    n = new BigNumber2(s);
    n0.c[0] = 0;
    for (; ; ) {
      q = div(n, d, 0, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.comparedTo(md) == 1) break;
      d0 = d1;
      d1 = d2;
      n1 = n0.plus(q.times(d2 = n1));
      n0 = d2;
      d = n.minus(q.times(d2 = d));
      n = d2;
    }
    d2 = div(md.minus(d0), d1, 0, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s;
    e = e * 2;
    r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
      div(n0, d0, e, ROUNDING_MODE).minus(x).abs()
    ) < 1 ? [n1, d1] : [n0, d0];
    MAX_EXP = exp;
    return r;
  };
  P.toNumber = function() {
    return +valueOf(this);
  };
  P.toPrecision = function(sd, rm) {
    if (sd != null) intCheck(sd, 1, MAX);
    return format(this, sd, rm, 2);
  };
  P.toString = function(b) {
    var str, n = this, s = n.s, e = n.e;
    if (e === null) {
      if (s) {
        str = "Infinity";
        if (s < 0) str = "-" + str;
      } else {
        str = "NaN";
      }
    } else {
      if (b == null) {
        str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
      } else if (b === 10 && alphabetHasNormalDecimalDigits) {
        n = round(new BigNumber2(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
        str = toFixedPoint(coeffToString(n.c), n.e, "0");
      } else {
        intCheck(b, 2, ALPHABET2.length, "Base");
        str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
      }
      if (s < 0 && n.c[0]) str = "-" + str;
    }
    return str;
  };
  P.valueOf = P.toJSON = function() {
    return valueOf(this);
  };
  P._isBigNumber = true;
  P[Symbol.toStringTag] = "BigNumber";
  P[Symbol.for("nodejs.util.inspect.custom")] = P.valueOf;
  if (configObject != null) BigNumber2.set(configObject);
  return BigNumber2;
}
function bitFloor(n) {
  var i = n | 0;
  return n > 0 || n === i ? i : i - 1;
}
function coeffToString(a) {
  var s, z, i = 1, j = a.length, r = a[0] + "";
  for (; i < j; ) {
    s = a[i++] + "";
    z = LOG_BASE - s.length;
    for (; z--; s = "0" + s) ;
    r += s;
  }
  for (j = r.length; r.charCodeAt(--j) === 48; ) ;
  return r.slice(0, j + 1 || 1);
}
function compare(x, y) {
  var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
  if (!i || !j) return null;
  a = xc && !xc[0];
  b = yc && !yc[0];
  if (a || b) return a ? b ? 0 : -j : i;
  if (i != j) return i;
  a = i < 0;
  b = k == l;
  if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;
  if (!b) return k > l ^ a ? 1 : -1;
  j = (k = xc.length) < (l = yc.length) ? k : l;
  for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
  return k == l ? 0 : k > l ^ a ? 1 : -1;
}
function intCheck(n, min, max, name) {
  if (n < min || n > max || n !== mathfloor(n)) {
    throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
  }
}
function isOdd(n) {
  var k = n.c.length - 1;
  return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
}
function toExponential(str, e) {
  return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
}
function toFixedPoint(str, e, z) {
  var len, zs;
  if (e < 0) {
    for (zs = z + "."; ++e; zs += z) ;
    str = zs + str;
  } else {
    len = str.length;
    if (++e > len) {
      for (zs = z, e -= len; --e; zs += z) ;
      str += zs;
    } else if (e < len) {
      str = str.slice(0, e) + "." + str.slice(e);
    }
  }
  return str;
}
var BigNumber = clone();
var bignumber_default = BigNumber;

// node_modules/@solana/buffer-layout-utils/lib/esm/decimal.mjs
var WAD = new bignumber_default("1e+18");

// node_modules/@solana/buffer-layout-utils/lib/esm/native.mjs
var import_buffer_layout2 = __toESM(require_Layout(), 1);
var bool = (property) => {
  const layout = (0, import_buffer_layout2.u8)(property);
  const { encode, decode } = encodeDecode(layout);
  const boolLayout = layout;
  boolLayout.decode = (buffer, offset) => {
    const src = decode(buffer, offset);
    return !!src;
  };
  boolLayout.encode = (bool2, buffer, offset) => {
    const src = Number(bool2);
    return encode(src, buffer, offset);
  };
  return boolLayout;
};

// node_modules/@solana/buffer-layout-utils/lib/esm/web3.mjs
var import_buffer_layout3 = __toESM(require_Layout(), 1);
var publicKey = (property) => {
  const layout = (0, import_buffer_layout3.blob)(32, property);
  const { encode, decode } = encodeDecode(layout);
  const publicKeyLayout = layout;
  publicKeyLayout.decode = (buffer, offset) => {
    const src = decode(buffer, offset);
    return new PublicKey(src);
  };
  publicKeyLayout.encode = (publicKey2, buffer, offset) => {
    const src = publicKey2.toBuffer();
    return encode(src, buffer, offset);
  };
  return publicKeyLayout;
};

// node_modules/@solana/spl-token/lib/esm/errors.js
var TokenError = class extends Error {
  constructor(message) {
    super(message);
  }
};
var TokenOwnerOffCurveError = class extends TokenError {
  constructor() {
    super(...arguments);
    this.name = "TokenOwnerOffCurveError";
  }
};

// node_modules/@solana/spl-token/lib/esm/extensions/accountType.js
var AccountType;
(function(AccountType2) {
  AccountType2[AccountType2["Uninitialized"] = 0] = "Uninitialized";
  AccountType2[AccountType2["Mint"] = 1] = "Mint";
  AccountType2[AccountType2["Account"] = 2] = "Account";
})(AccountType || (AccountType = {}));
var ACCOUNT_TYPE_SIZE = 1;

// node_modules/@solana/spl-token/lib/esm/state/account.js
var import_buffer_layout5 = __toESM(require_Layout(), 1);

// node_modules/@solana/spl-token/lib/esm/state/multisig.js
var import_buffer_layout4 = __toESM(require_Layout(), 1);
var MultisigLayout = (0, import_buffer_layout4.struct)([
  (0, import_buffer_layout4.u8)("m"),
  (0, import_buffer_layout4.u8)("n"),
  bool("isInitialized"),
  publicKey("signer1"),
  publicKey("signer2"),
  publicKey("signer3"),
  publicKey("signer4"),
  publicKey("signer5"),
  publicKey("signer6"),
  publicKey("signer7"),
  publicKey("signer8"),
  publicKey("signer9"),
  publicKey("signer10"),
  publicKey("signer11")
]);
var MULTISIG_SIZE = MultisigLayout.span;

// node_modules/@solana/spl-token/lib/esm/state/account.js
var AccountState;
(function(AccountState2) {
  AccountState2[AccountState2["Uninitialized"] = 0] = "Uninitialized";
  AccountState2[AccountState2["Initialized"] = 1] = "Initialized";
  AccountState2[AccountState2["Frozen"] = 2] = "Frozen";
})(AccountState || (AccountState = {}));
var AccountLayout = (0, import_buffer_layout5.struct)([
  publicKey("mint"),
  publicKey("owner"),
  u64("amount"),
  (0, import_buffer_layout5.u32)("delegateOption"),
  publicKey("delegate"),
  (0, import_buffer_layout5.u8)("state"),
  (0, import_buffer_layout5.u32)("isNativeOption"),
  u64("isNative"),
  u64("delegatedAmount"),
  (0, import_buffer_layout5.u32)("closeAuthorityOption"),
  publicKey("closeAuthority")
]);
var ACCOUNT_SIZE = AccountLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/cpiGuard/state.js
var import_buffer_layout6 = __toESM(require_Layout(), 1);
var CpiGuardLayout = (0, import_buffer_layout6.struct)([bool("lockCpi")]);
var CPI_GUARD_SIZE = CpiGuardLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/defaultAccountState/state.js
var import_buffer_layout7 = __toESM(require_Layout(), 1);
var DefaultAccountStateLayout = (0, import_buffer_layout7.struct)([(0, import_buffer_layout7.u8)("state")]);
var DEFAULT_ACCOUNT_STATE_SIZE = DefaultAccountStateLayout.span;

// node_modules/@solana/errors/dist/index.browser.mjs
var SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED = 1;
var SOLANA_ERROR__INVALID_NONCE = 2;
var SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND = 3;
var SOLANA_ERROR__BLOCKHASH_STRING_LENGTH_OUT_OF_RANGE = 4;
var SOLANA_ERROR__INVALID_BLOCKHASH_BYTE_LENGTH = 5;
var SOLANA_ERROR__LAMPORTS_OUT_OF_RANGE = 6;
var SOLANA_ERROR__MALFORMED_BIGINT_STRING = 7;
var SOLANA_ERROR__MALFORMED_NUMBER_STRING = 8;
var SOLANA_ERROR__TIMESTAMP_OUT_OF_RANGE = 9;
var SOLANA_ERROR__JSON_RPC__PARSE_ERROR = -32700;
var SOLANA_ERROR__JSON_RPC__INTERNAL_ERROR = -32603;
var SOLANA_ERROR__JSON_RPC__INVALID_PARAMS = -32602;
var SOLANA_ERROR__JSON_RPC__METHOD_NOT_FOUND = -32601;
var SOLANA_ERROR__JSON_RPC__INVALID_REQUEST = -32600;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED = -32016;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION = -32015;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET = -32014;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH = -32013;
var SOLANA_ERROR__JSON_RPC__SCAN_ERROR = -32012;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE = -32011;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX = -32010;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED = -32009;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SNAPSHOT = -32008;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED = -32007;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE = -32006;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY = -32005;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE = -32004;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE = -32003;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE = -32002;
var SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP = -32001;
var SOLANA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH = 28e5;
var SOLANA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE = 2800001;
var SOLANA_ERROR__ADDRESSES__INVALID_BASE58_ENCODED_ADDRESS = 2800002;
var SOLANA_ERROR__ADDRESSES__INVALID_ED25519_PUBLIC_KEY = 2800003;
var SOLANA_ERROR__ADDRESSES__MALFORMED_PDA = 2800004;
var SOLANA_ERROR__ADDRESSES__PDA_BUMP_SEED_OUT_OF_RANGE = 2800005;
var SOLANA_ERROR__ADDRESSES__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED = 2800006;
var SOLANA_ERROR__ADDRESSES__MAX_PDA_SEED_LENGTH_EXCEEDED = 2800007;
var SOLANA_ERROR__ADDRESSES__INVALID_SEEDS_POINT_ON_CURVE = 2800008;
var SOLANA_ERROR__ADDRESSES__FAILED_TO_FIND_VIABLE_PDA_BUMP_SEED = 2800009;
var SOLANA_ERROR__ADDRESSES__PDA_ENDS_WITH_PDA_MARKER = 2800010;
var SOLANA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND = 323e4;
var SOLANA_ERROR__ACCOUNTS__ONE_OR_MORE_ACCOUNTS_NOT_FOUND = 32300001;
var SOLANA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT = 3230002;
var SOLANA_ERROR__ACCOUNTS__EXPECTED_DECODED_ACCOUNT = 3230003;
var SOLANA_ERROR__ACCOUNTS__EXPECTED_ALL_ACCOUNTS_TO_BE_DECODED = 3230004;
var SOLANA_ERROR__SUBTLE_CRYPTO__DISALLOWED_IN_INSECURE_CONTEXT = 361e4;
var SOLANA_ERROR__SUBTLE_CRYPTO__DIGEST_UNIMPLEMENTED = 3610001;
var SOLANA_ERROR__SUBTLE_CRYPTO__ED25519_ALGORITHM_UNIMPLEMENTED = 3610002;
var SOLANA_ERROR__SUBTLE_CRYPTO__EXPORT_FUNCTION_UNIMPLEMENTED = 3610003;
var SOLANA_ERROR__SUBTLE_CRYPTO__GENERATE_FUNCTION_UNIMPLEMENTED = 3610004;
var SOLANA_ERROR__SUBTLE_CRYPTO__SIGN_FUNCTION_UNIMPLEMENTED = 3610005;
var SOLANA_ERROR__SUBTLE_CRYPTO__VERIFY_FUNCTION_UNIMPLEMENTED = 3610006;
var SOLANA_ERROR__SUBTLE_CRYPTO__CANNOT_EXPORT_NON_EXTRACTABLE_KEY = 3610007;
var SOLANA_ERROR__CRYPTO__RANDOM_VALUES_FUNCTION_UNIMPLEMENTED = 3611e3;
var SOLANA_ERROR__KEYS__INVALID_KEY_PAIR_BYTE_LENGTH = 3704e3;
var SOLANA_ERROR__KEYS__INVALID_PRIVATE_KEY_BYTE_LENGTH = 3704001;
var SOLANA_ERROR__KEYS__INVALID_SIGNATURE_BYTE_LENGTH = 3704002;
var SOLANA_ERROR__KEYS__SIGNATURE_STRING_LENGTH_OUT_OF_RANGE = 3704003;
var SOLANA_ERROR__KEYS__PUBLIC_KEY_MUST_MATCH_PRIVATE_KEY = 3704004;
var SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_ACCOUNTS = 4128e3;
var SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_DATA = 4128001;
var SOLANA_ERROR__INSTRUCTION__PROGRAM_ID_MISMATCH = 4128002;
var SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN = 4615e3;
var SOLANA_ERROR__INSTRUCTION_ERROR__GENERIC_ERROR = 4615001;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ARGUMENT = 4615002;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_INSTRUCTION_DATA = 4615003;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_DATA = 4615004;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_TOO_SMALL = 4615005;
var SOLANA_ERROR__INSTRUCTION_ERROR__INSUFFICIENT_FUNDS = 4615006;
var SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_PROGRAM_ID = 4615007;
var SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_REQUIRED_SIGNATURE = 4615008;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_ALREADY_INITIALIZED = 4615009;
var SOLANA_ERROR__INSTRUCTION_ERROR__UNINITIALIZED_ACCOUNT = 4615010;
var SOLANA_ERROR__INSTRUCTION_ERROR__UNBALANCED_INSTRUCTION = 4615011;
var SOLANA_ERROR__INSTRUCTION_ERROR__MODIFIED_PROGRAM_ID = 4615012;
var SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_LAMPORT_SPEND = 4615013;
var SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_DATA_MODIFIED = 4615014;
var SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_LAMPORT_CHANGE = 4615015;
var SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_DATA_MODIFIED = 4615016;
var SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_INDEX = 4615017;
var SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_MODIFIED = 4615018;
var SOLANA_ERROR__INSTRUCTION_ERROR__RENT_EPOCH_MODIFIED = 4615019;
var SOLANA_ERROR__INSTRUCTION_ERROR__NOT_ENOUGH_ACCOUNT_KEYS = 4615020;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_SIZE_CHANGED = 4615021;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_EXECUTABLE = 4615022;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_FAILED = 4615023;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_OUTSTANDING = 4615024;
var SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_OUT_OF_SYNC = 4615025;
var SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM = 4615026;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ERROR = 4615027;
var SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_DATA_MODIFIED = 4615028;
var SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_LAMPORT_CHANGE = 4615029;
var SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT = 4615030;
var SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_PROGRAM_ID = 4615031;
var SOLANA_ERROR__INSTRUCTION_ERROR__CALL_DEPTH = 4615032;
var SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_ACCOUNT = 4615033;
var SOLANA_ERROR__INSTRUCTION_ERROR__REENTRANCY_NOT_ALLOWED = 4615034;
var SOLANA_ERROR__INSTRUCTION_ERROR__MAX_SEED_LENGTH_EXCEEDED = 4615035;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_SEEDS = 4615036;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_REALLOC = 4615037;
var SOLANA_ERROR__INSTRUCTION_ERROR__COMPUTATIONAL_BUDGET_EXCEEDED = 4615038;
var SOLANA_ERROR__INSTRUCTION_ERROR__PRIVILEGE_ESCALATION = 4615039;
var SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_ENVIRONMENT_SETUP_FAILURE = 4615040;
var SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPLETE = 4615041;
var SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPILE = 4615042;
var SOLANA_ERROR__INSTRUCTION_ERROR__IMMUTABLE = 4615043;
var SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_AUTHORITY = 4615044;
var SOLANA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR = 4615045;
var SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_RENT_EXEMPT = 4615046;
var SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_OWNER = 4615047;
var SOLANA_ERROR__INSTRUCTION_ERROR__ARITHMETIC_OVERFLOW = 4615048;
var SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_SYSVAR = 4615049;
var SOLANA_ERROR__INSTRUCTION_ERROR__ILLEGAL_OWNER = 4615050;
var SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED = 4615051;
var SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_EXCEEDED = 4615052;
var SOLANA_ERROR__INSTRUCTION_ERROR__MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED = 4615053;
var SOLANA_ERROR__INSTRUCTION_ERROR__BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS = 4615054;
var SOLANA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS = 5508e3;
var SOLANA_ERROR__SIGNER__EXPECTED_KEY_PAIR_SIGNER = 5508001;
var SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_SIGNER = 5508002;
var SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_MODIFYING_SIGNER = 5508003;
var SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER = 5508004;
var SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SIGNER = 5508005;
var SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_MODIFYING_SIGNER = 5508006;
var SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_PARTIAL_SIGNER = 5508007;
var SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SENDING_SIGNER = 5508008;
var SOLANA_ERROR__SIGNER__TRANSACTION_CANNOT_HAVE_MULTIPLE_SENDING_SIGNERS = 5508009;
var SOLANA_ERROR__SIGNER__TRANSACTION_SENDING_SIGNER_MISSING = 5508010;
var SOLANA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED = 5508011;
var SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES = 5663e3;
var SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE = 5663001;
var SOLANA_ERROR__TRANSACTION__EXPECTED_BLOCKHASH_LIFETIME = 5663002;
var SOLANA_ERROR__TRANSACTION__EXPECTED_NONCE_LIFETIME = 5663003;
var SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE = 5663004;
var SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING = 5663005;
var SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE = 5663006;
var SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND = 5663007;
var SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_FEE_PAYER_MISSING = 5663008;
var SOLANA_ERROR__TRANSACTION__SIGNATURES_MISSING = 5663009;
var SOLANA_ERROR__TRANSACTION__ADDRESS_MISSING = 5663010;
var SOLANA_ERROR__TRANSACTION__FEE_PAYER_MISSING = 5663011;
var SOLANA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING = 5663012;
var SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_INSTRUCTIONS_MISSING = 5663013;
var SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_FIRST_INSTRUCTION_MUST_BE_ADVANCE_NONCE = 5663014;
var SOLANA_ERROR__TRANSACTION__ADDRESSES_CANNOT_SIGN_TRANSACTION = 5663015;
var SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES = 5663016;
var SOLANA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH = 5663017;
var SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_COMPUTE_LIMIT = 5663018;
var SOLANA_ERROR__TRANSACTION_ERROR__UNKNOWN = 705e4;
var SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_IN_USE = 7050001;
var SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_LOADED_TWICE = 7050002;
var SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_NOT_FOUND = 7050003;
var SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_ACCOUNT_NOT_FOUND = 7050004;
var SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_FEE = 7050005;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_FOR_FEE = 7050006;
var SOLANA_ERROR__TRANSACTION_ERROR__ALREADY_PROCESSED = 7050007;
var SOLANA_ERROR__TRANSACTION_ERROR__BLOCKHASH_NOT_FOUND = 7050008;
var SOLANA_ERROR__TRANSACTION_ERROR__CALL_CHAIN_TOO_DEEP = 7050009;
var SOLANA_ERROR__TRANSACTION_ERROR__MISSING_SIGNATURE_FOR_FEE = 7050010;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_INDEX = 7050011;
var SOLANA_ERROR__TRANSACTION_ERROR__SIGNATURE_FAILURE = 7050012;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_PROGRAM_FOR_EXECUTION = 7050013;
var SOLANA_ERROR__TRANSACTION_ERROR__SANITIZE_FAILURE = 7050014;
var SOLANA_ERROR__TRANSACTION_ERROR__CLUSTER_MAINTENANCE = 7050015;
var SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_BORROW_OUTSTANDING = 7050016;
var SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_BLOCK_COST_LIMIT = 7050017;
var SOLANA_ERROR__TRANSACTION_ERROR__UNSUPPORTED_VERSION = 7050018;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_WRITABLE_ACCOUNT = 7050019;
var SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_ACCOUNT_COST_LIMIT = 7050020;
var SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_BLOCK_LIMIT = 7050021;
var SOLANA_ERROR__TRANSACTION_ERROR__TOO_MANY_ACCOUNT_LOCKS = 7050022;
var SOLANA_ERROR__TRANSACTION_ERROR__ADDRESS_LOOKUP_TABLE_NOT_FOUND = 7050023;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_OWNER = 7050024;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_DATA = 7050025;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_INDEX = 7050026;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_RENT_PAYING_ACCOUNT = 7050027;
var SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_VOTE_COST_LIMIT = 7050028;
var SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_TOTAL_LIMIT = 7050029;
var SOLANA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION = 7050030;
var SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT = 7050031;
var SOLANA_ERROR__TRANSACTION_ERROR__MAX_LOADED_ACCOUNTS_DATA_SIZE_EXCEEDED = 7050032;
var SOLANA_ERROR__TRANSACTION_ERROR__INVALID_LOADED_ACCOUNTS_DATA_SIZE_LIMIT = 7050033;
var SOLANA_ERROR__TRANSACTION_ERROR__RESANITIZATION_NEEDED = 7050034;
var SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED = 7050035;
var SOLANA_ERROR__TRANSACTION_ERROR__UNBALANCED_TRANSACTION = 7050036;
var SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY = 8078e3;
var SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH = 8078001;
var SOLANA_ERROR__CODECS__EXPECTED_FIXED_LENGTH = 8078002;
var SOLANA_ERROR__CODECS__EXPECTED_VARIABLE_LENGTH = 8078003;
var SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH = 8078004;
var SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH = 8078005;
var SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH = 8078006;
var SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS = 8078007;
var SOLANA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE = 8078008;
var SOLANA_ERROR__CODECS__INVALID_DISCRIMINATED_UNION_VARIANT = 8078009;
var SOLANA_ERROR__CODECS__INVALID_ENUM_VARIANT = 8078010;
var SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE = 8078011;
var SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE = 8078012;
var SOLANA_ERROR__CODECS__EXPECTED_POSITIVE_BYTE_LENGTH = 8078013;
var SOLANA_ERROR__CODECS__OFFSET_OUT_OF_RANGE = 8078014;
var SOLANA_ERROR__CODECS__INVALID_LITERAL_UNION_VARIANT = 8078015;
var SOLANA_ERROR__CODECS__LITERAL_UNION_DISCRIMINATOR_OUT_OF_RANGE = 8078016;
var SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE = 8078017;
var SOLANA_ERROR__CODECS__INVALID_CONSTANT = 8078018;
var SOLANA_ERROR__CODECS__EXPECTED_ZERO_VALUE_TO_MATCH_ITEM_FIXED_SIZE = 8078019;
var SOLANA_ERROR__CODECS__ENCODED_BYTES_MUST_NOT_INCLUDE_SENTINEL = 8078020;
var SOLANA_ERROR__CODECS__SENTINEL_MISSING_IN_DECODED_BYTES = 8078021;
var SOLANA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS = 8078022;
var SOLANA_ERROR__RPC__INTEGER_OVERFLOW = 81e5;
var SOLANA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN = 8100001;
var SOLANA_ERROR__RPC__TRANSPORT_HTTP_ERROR = 8100002;
var SOLANA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_REQUEST = 819e4;
var SOLANA_ERROR__RPC_SUBSCRIPTIONS__EXPECTED_SERVER_SUBSCRIPTION_ID = 8190001;
var SOLANA_ERROR__RPC_SUBSCRIPTIONS__TRANSPORT_CLOSED_BEFORE_MESSAGE_BUFFERED = 8190002;
var SOLANA_ERROR__RPC_SUBSCRIPTIONS__TRANSPORT_CONNECTION_CLOSED = 8190003;
var SOLANA_ERROR__RPC_SUBSCRIPTIONS__TRANSPORT_FAILED_TO_CONNECT = 8190004;
var SOLANA_ERROR__INVARIANT_VIOLATION__WEBSOCKET_MESSAGE_ITERATOR_STATE_MISSING = 99e5;
var SOLANA_ERROR__INVARIANT_VIOLATION__WEBSOCKET_MESSAGE_ITERATOR_MUST_NOT_POLL_BEFORE_RESOLVING_EXISTING_MESSAGE_PROMISE = 9900001;
var SOLANA_ERROR__INVARIANT_VIOLATION__CACHED_ABORTABLE_ITERABLE_CACHE_ENTRY_MISSING = 9900002;
var SOLANA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE = 9900003;
function encodeValue(value) {
  if (Array.isArray(value)) {
    const commaSeparatedValues = value.map(encodeValue).join(
      "%2C%20"
      /* ", " */
    );
    return "%5B" + commaSeparatedValues + /* "]" */
    "%5D";
  } else if (typeof value === "bigint") {
    return `${value}n`;
  } else {
    return encodeURIComponent(
      String(
        value != null && Object.getPrototypeOf(value) === null ? (
          // Plain objects with no prototype don't have a `toString` method.
          // Convert them before stringifying them.
          { ...value }
        ) : value
      )
    );
  }
}
function encodeObjectContextEntry([key, value]) {
  return `${key}=${encodeValue(value)}`;
}
function encodeContextObject(context) {
  const searchParamsString = Object.entries(context).map(encodeObjectContextEntry).join("&");
  return btoa(searchParamsString);
}
var SolanaErrorMessages = {
  [SOLANA_ERROR__ACCOUNTS__ACCOUNT_NOT_FOUND]: "Account not found at address: $address",
  [SOLANA_ERROR__ACCOUNTS__EXPECTED_ALL_ACCOUNTS_TO_BE_DECODED]: "Not all accounts were decoded. Encoded accounts found at addresses: $addresses.",
  [SOLANA_ERROR__ACCOUNTS__EXPECTED_DECODED_ACCOUNT]: "Expected decoded account at address: $address",
  [SOLANA_ERROR__ACCOUNTS__FAILED_TO_DECODE_ACCOUNT]: "Failed to decode account data at address: $address",
  [SOLANA_ERROR__ACCOUNTS__ONE_OR_MORE_ACCOUNTS_NOT_FOUND]: "Accounts not found at addresses: $addresses",
  [SOLANA_ERROR__ADDRESSES__FAILED_TO_FIND_VIABLE_PDA_BUMP_SEED]: "Unable to find a viable program address bump seed.",
  [SOLANA_ERROR__ADDRESSES__INVALID_BASE58_ENCODED_ADDRESS]: "$putativeAddress is not a base58-encoded address.",
  [SOLANA_ERROR__ADDRESSES__INVALID_BYTE_LENGTH]: "Expected base58 encoded address to decode to a byte array of length 32. Actual length: $actualLength.",
  [SOLANA_ERROR__ADDRESSES__INVALID_ED25519_PUBLIC_KEY]: "The `CryptoKey` must be an `Ed25519` public key.",
  [SOLANA_ERROR__ADDRESSES__INVALID_SEEDS_POINT_ON_CURVE]: "Invalid seeds; point must fall off the Ed25519 curve.",
  [SOLANA_ERROR__ADDRESSES__MALFORMED_PDA]: "Expected given program derived address to have the following format: [Address, ProgramDerivedAddressBump].",
  [SOLANA_ERROR__ADDRESSES__MAX_NUMBER_OF_PDA_SEEDS_EXCEEDED]: "A maximum of $maxSeeds seeds, including the bump seed, may be supplied when creating an address. Received: $actual.",
  [SOLANA_ERROR__ADDRESSES__MAX_PDA_SEED_LENGTH_EXCEEDED]: "The seed at index $index with length $actual exceeds the maximum length of $maxSeedLength bytes.",
  [SOLANA_ERROR__ADDRESSES__PDA_BUMP_SEED_OUT_OF_RANGE]: "Expected program derived address bump to be in the range [0, 255], got: $bump.",
  [SOLANA_ERROR__ADDRESSES__PDA_ENDS_WITH_PDA_MARKER]: "Program address cannot end with PDA marker.",
  [SOLANA_ERROR__ADDRESSES__STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded address string of length in the range [32, 44]. Actual length: $actualLength.",
  [SOLANA_ERROR__BLOCKHASH_STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded blockash string of length in the range [32, 44]. Actual length: $actualLength.",
  [SOLANA_ERROR__BLOCK_HEIGHT_EXCEEDED]: "The network has progressed past the last block for which this transaction could have been committed.",
  [SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY]: "Codec [$codecDescription] cannot decode empty byte arrays.",
  [SOLANA_ERROR__CODECS__CANNOT_USE_LEXICAL_VALUES_AS_ENUM_DISCRIMINATORS]: "Enum codec cannot use lexical values [$stringValues] as discriminators. Either remove all lexical values or set `useValuesAsDiscriminators` to `false`.",
  [SOLANA_ERROR__CODECS__ENCODED_BYTES_MUST_NOT_INCLUDE_SENTINEL]: "Sentinel [$hexSentinel] must not be present in encoded bytes [$hexEncodedBytes].",
  [SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH]: "Encoder and decoder must have the same fixed size, got [$encoderFixedSize] and [$decoderFixedSize].",
  [SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH]: "Encoder and decoder must have the same max size, got [$encoderMaxSize] and [$decoderMaxSize].",
  [SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH]: "Encoder and decoder must either both be fixed-size or variable-size.",
  [SOLANA_ERROR__CODECS__ENUM_DISCRIMINATOR_OUT_OF_RANGE]: "Enum discriminator out of range. Expected a number in [$formattedValidDiscriminators], got $discriminator.",
  [SOLANA_ERROR__CODECS__EXPECTED_FIXED_LENGTH]: "Expected a fixed-size codec, got a variable-size one.",
  [SOLANA_ERROR__CODECS__EXPECTED_POSITIVE_BYTE_LENGTH]: "Codec [$codecDescription] expected a positive byte length, got $bytesLength.",
  [SOLANA_ERROR__CODECS__EXPECTED_VARIABLE_LENGTH]: "Expected a variable-size codec, got a fixed-size one.",
  [SOLANA_ERROR__CODECS__EXPECTED_ZERO_VALUE_TO_MATCH_ITEM_FIXED_SIZE]: "Codec [$codecDescription] expected zero-value [$hexZeroValue] to have the same size as the provided fixed-size item [$expectedSize bytes].",
  [SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH]: "Codec [$codecDescription] expected $expected bytes, got $bytesLength.",
  [SOLANA_ERROR__CODECS__INVALID_CONSTANT]: "Expected byte array constant [$hexConstant] to be present in data [$hexData] at offset [$offset].",
  [SOLANA_ERROR__CODECS__INVALID_DISCRIMINATED_UNION_VARIANT]: "Invalid discriminated union variant. Expected one of [$variants], got $value.",
  [SOLANA_ERROR__CODECS__INVALID_ENUM_VARIANT]: "Invalid enum variant. Expected one of [$stringValues] or a number in [$formattedNumericalValues], got $variant.",
  [SOLANA_ERROR__CODECS__INVALID_LITERAL_UNION_VARIANT]: "Invalid literal union variant. Expected one of [$variants], got $value.",
  [SOLANA_ERROR__CODECS__INVALID_NUMBER_OF_ITEMS]: "Expected [$codecDescription] to have $expected items, got $actual.",
  [SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE]: "Invalid value $value for base $base with alphabet $alphabet.",
  [SOLANA_ERROR__CODECS__LITERAL_UNION_DISCRIMINATOR_OUT_OF_RANGE]: "Literal union discriminator out of range. Expected a number between $minRange and $maxRange, got $discriminator.",
  [SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE]: "Codec [$codecDescription] expected number to be in the range [$min, $max], got $value.",
  [SOLANA_ERROR__CODECS__OFFSET_OUT_OF_RANGE]: "Codec [$codecDescription] expected offset to be in the range [0, $bytesLength], got $offset.",
  [SOLANA_ERROR__CODECS__SENTINEL_MISSING_IN_DECODED_BYTES]: "Expected sentinel [$hexSentinel] to be present in decoded bytes [$hexDecodedBytes].",
  [SOLANA_ERROR__CODECS__UNION_VARIANT_OUT_OF_RANGE]: "Union variant out of range. Expected an index between $minRange and $maxRange, got $variant.",
  [SOLANA_ERROR__CRYPTO__RANDOM_VALUES_FUNCTION_UNIMPLEMENTED]: "No random values implementation could be found.",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_ALREADY_INITIALIZED]: "instruction requires an uninitialized account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_FAILED]: "instruction tries to borrow reference for an account which is already borrowed",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_BORROW_OUTSTANDING]: "instruction left account with an outstanding borrowed reference",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_SIZE_CHANGED]: "program other than the account's owner changed the size of the account data",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_DATA_TOO_SMALL]: "account data too small for instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_EXECUTABLE]: "instruction expected an executable account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ACCOUNT_NOT_RENT_EXEMPT]: "An account does not have enough lamports to be rent-exempt",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ARITHMETIC_OVERFLOW]: "Program arithmetic overflowed",
  [SOLANA_ERROR__INSTRUCTION_ERROR__BORSH_IO_ERROR]: "Failed to serialize or deserialize account data: $encodedData",
  [SOLANA_ERROR__INSTRUCTION_ERROR__BUILTIN_PROGRAMS_MUST_CONSUME_COMPUTE_UNITS]: "Builtin programs must consume compute units",
  [SOLANA_ERROR__INSTRUCTION_ERROR__CALL_DEPTH]: "Cross-program invocation call depth too deep",
  [SOLANA_ERROR__INSTRUCTION_ERROR__COMPUTATIONAL_BUDGET_EXCEEDED]: "Computational budget exceeded",
  [SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM]: "custom program error: #$code",
  [SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_INDEX]: "instruction contains duplicate accounts",
  [SOLANA_ERROR__INSTRUCTION_ERROR__DUPLICATE_ACCOUNT_OUT_OF_SYNC]: "instruction modifications of multiply-passed account differ",
  [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_ACCOUNT_NOT_RENT_EXEMPT]: "executable accounts must be rent exempt",
  [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_DATA_MODIFIED]: "instruction changed executable accounts data",
  [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_LAMPORT_CHANGE]: "instruction changed the balance of an executable account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__EXECUTABLE_MODIFIED]: "instruction changed executable bit of an account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_DATA_MODIFIED]: "instruction modified data of an account it does not own",
  [SOLANA_ERROR__INSTRUCTION_ERROR__EXTERNAL_ACCOUNT_LAMPORT_SPEND]: "instruction spent from the balance of an account it does not own",
  [SOLANA_ERROR__INSTRUCTION_ERROR__GENERIC_ERROR]: "generic instruction error",
  [SOLANA_ERROR__INSTRUCTION_ERROR__ILLEGAL_OWNER]: "Provided owner is not allowed",
  [SOLANA_ERROR__INSTRUCTION_ERROR__IMMUTABLE]: "Account is immutable",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_AUTHORITY]: "Incorrect authority provided",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INCORRECT_PROGRAM_ID]: "incorrect program id for instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INSUFFICIENT_FUNDS]: "insufficient funds for instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_DATA]: "invalid account data for instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ACCOUNT_OWNER]: "Invalid account owner",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ARGUMENT]: "invalid program argument",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_ERROR]: "program returned invalid error code",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_INSTRUCTION_DATA]: "invalid instruction data",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_REALLOC]: "Failed to reallocate account data",
  [SOLANA_ERROR__INSTRUCTION_ERROR__INVALID_SEEDS]: "Provided seeds do not result in a valid address",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_DATA_ALLOCATIONS_EXCEEDED]: "Accounts data allocations exceeded the maximum allowed per transaction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_ACCOUNTS_EXCEEDED]: "Max accounts exceeded",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_INSTRUCTION_TRACE_LENGTH_EXCEEDED]: "Max instruction trace length exceeded",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MAX_SEED_LENGTH_EXCEEDED]: "Length of the seed is too long for address generation",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_ACCOUNT]: "An account required by the instruction is missing",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MISSING_REQUIRED_SIGNATURE]: "missing required signature for instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__MODIFIED_PROGRAM_ID]: "instruction illegally modified the program id of an account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__NOT_ENOUGH_ACCOUNT_KEYS]: "insufficient account keys for instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__PRIVILEGE_ESCALATION]: "Cross-program invocation with unauthorized signer or writable account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_ENVIRONMENT_SETUP_FAILURE]: "Failed to create program execution environment",
  [SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPILE]: "Program failed to compile",
  [SOLANA_ERROR__INSTRUCTION_ERROR__PROGRAM_FAILED_TO_COMPLETE]: "Program failed to complete",
  [SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_DATA_MODIFIED]: "instruction modified data of a read-only account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__READONLY_LAMPORT_CHANGE]: "instruction changed the balance of a read-only account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__REENTRANCY_NOT_ALLOWED]: "Cross-program invocation reentrancy not allowed for this instruction",
  [SOLANA_ERROR__INSTRUCTION_ERROR__RENT_EPOCH_MODIFIED]: "instruction modified rent epoch of an account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__UNBALANCED_INSTRUCTION]: "sum of account balances before and after instruction do not match",
  [SOLANA_ERROR__INSTRUCTION_ERROR__UNINITIALIZED_ACCOUNT]: "instruction requires an initialized account",
  [SOLANA_ERROR__INSTRUCTION_ERROR__UNKNOWN]: "",
  [SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_PROGRAM_ID]: "Unsupported program id",
  [SOLANA_ERROR__INSTRUCTION_ERROR__UNSUPPORTED_SYSVAR]: "Unsupported sysvar",
  [SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_ACCOUNTS]: "The instruction does not have any accounts.",
  [SOLANA_ERROR__INSTRUCTION__EXPECTED_TO_HAVE_DATA]: "The instruction does not have any data.",
  [SOLANA_ERROR__INSTRUCTION__PROGRAM_ID_MISMATCH]: "Expected instruction to have progress address $expectedProgramAddress, got $actualProgramAddress.",
  [SOLANA_ERROR__INVALID_BLOCKHASH_BYTE_LENGTH]: "Expected base58 encoded blockhash to decode to a byte array of length 32. Actual length: $actualLength.",
  [SOLANA_ERROR__INVALID_NONCE]: "The nonce `$expectedNonceValue` is no longer valid. It has advanced to `$actualNonceValue`",
  [SOLANA_ERROR__INVARIANT_VIOLATION__CACHED_ABORTABLE_ITERABLE_CACHE_ENTRY_MISSING]: "Invariant violation: Found no abortable iterable cache entry for key `$cacheKey`. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
  [SOLANA_ERROR__INVARIANT_VIOLATION__SWITCH_MUST_BE_EXHAUSTIVE]: "Invariant violation: Switch statement non-exhaustive. Received unexpected value `$unexpectedValue`. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
  [SOLANA_ERROR__INVARIANT_VIOLATION__WEBSOCKET_MESSAGE_ITERATOR_MUST_NOT_POLL_BEFORE_RESOLVING_EXISTING_MESSAGE_PROMISE]: "Invariant violation: WebSocket message iterator state is corrupt; iterated without first resolving existing message promise. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
  [SOLANA_ERROR__INVARIANT_VIOLATION__WEBSOCKET_MESSAGE_ITERATOR_STATE_MISSING]: "Invariant violation: WebSocket message iterator is missing state storage. It should be impossible to hit this error; please file an issue at https://sola.na/web3invariant",
  [SOLANA_ERROR__JSON_RPC__INTERNAL_ERROR]: "JSON-RPC error: Internal JSON-RPC error ($__serverMessage)",
  [SOLANA_ERROR__JSON_RPC__INVALID_PARAMS]: "JSON-RPC error: Invalid method parameter(s) ($__serverMessage)",
  [SOLANA_ERROR__JSON_RPC__INVALID_REQUEST]: "JSON-RPC error: The JSON sent is not a valid `Request` object ($__serverMessage)",
  [SOLANA_ERROR__JSON_RPC__METHOD_NOT_FOUND]: "JSON-RPC error: The method does not exist / is not available ($__serverMessage)",
  [SOLANA_ERROR__JSON_RPC__PARSE_ERROR]: "JSON-RPC error: An error occurred on the server while parsing the JSON text ($__serverMessage)",
  [SOLANA_ERROR__JSON_RPC__SCAN_ERROR]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_CLEANED_UP]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_NOT_AVAILABLE]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED]: "Minimum context slot has not been reached",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NODE_UNHEALTHY]: "Node is unhealthy; behind by $numSlotsBehind slots",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_NO_SNAPSHOT]: "No snapshot",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE]: "Transaction simulation failed",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_SLOT_SKIPPED]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE]: "Transaction history is not available from this node",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE]: "$__serverMessage",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH]: "Transaction signature length mismatch",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE]: "Transaction signature verification failure",
  [SOLANA_ERROR__JSON_RPC__SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION]: "$__serverMessage",
  [SOLANA_ERROR__KEYS__INVALID_KEY_PAIR_BYTE_LENGTH]: "Key pair bytes must be of length 64, got $byteLength.",
  [SOLANA_ERROR__KEYS__INVALID_PRIVATE_KEY_BYTE_LENGTH]: "Expected private key bytes with length 32. Actual length: $actualLength.",
  [SOLANA_ERROR__KEYS__INVALID_SIGNATURE_BYTE_LENGTH]: "Expected base58-encoded signature to decode to a byte array of length 64. Actual length: $actualLength.",
  [SOLANA_ERROR__KEYS__PUBLIC_KEY_MUST_MATCH_PRIVATE_KEY]: "The provided private key does not match the provided public key.",
  [SOLANA_ERROR__KEYS__SIGNATURE_STRING_LENGTH_OUT_OF_RANGE]: "Expected base58-encoded signature string of length in the range [64, 88]. Actual length: $actualLength.",
  [SOLANA_ERROR__LAMPORTS_OUT_OF_RANGE]: "Lamports value must be in the range [0, 2e64-1]",
  [SOLANA_ERROR__MALFORMED_BIGINT_STRING]: "`$value` cannot be parsed as a `BigInt`",
  [SOLANA_ERROR__MALFORMED_NUMBER_STRING]: "`$value` cannot be parsed as a `Number`",
  [SOLANA_ERROR__NONCE_ACCOUNT_NOT_FOUND]: "No nonce account could be found at address `$nonceAccountAddress`",
  [SOLANA_ERROR__RPC_SUBSCRIPTIONS__CANNOT_CREATE_SUBSCRIPTION_REQUEST]: "Either the notification name must end in 'Notifications' or the API must supply a subscription creator function for the notification '$notificationName' to map between the notification name and the subscribe/unsubscribe method names.",
  [SOLANA_ERROR__RPC_SUBSCRIPTIONS__EXPECTED_SERVER_SUBSCRIPTION_ID]: "Failed to obtain a subscription id from the server",
  [SOLANA_ERROR__RPC_SUBSCRIPTIONS__TRANSPORT_CLOSED_BEFORE_MESSAGE_BUFFERED]: "WebSocket was closed before payload could be added to the send buffer",
  [SOLANA_ERROR__RPC_SUBSCRIPTIONS__TRANSPORT_CONNECTION_CLOSED]: "WebSocket connection closed",
  [SOLANA_ERROR__RPC_SUBSCRIPTIONS__TRANSPORT_FAILED_TO_CONNECT]: "WebSocket failed to connect",
  [SOLANA_ERROR__RPC__INTEGER_OVERFLOW]: "The $argumentLabel argument to the `$methodName` RPC method$optionalPathLabel was `$value`. This number is unsafe for use with the Solana JSON-RPC because it exceeds `Number.MAX_SAFE_INTEGER`.",
  [SOLANA_ERROR__RPC__TRANSPORT_HTTP_ERROR]: "HTTP error ($statusCode): $message",
  [SOLANA_ERROR__RPC__TRANSPORT_HTTP_HEADER_FORBIDDEN]: "HTTP header(s) forbidden: $headers. Learn more at https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name.",
  [SOLANA_ERROR__SIGNER__ADDRESS_CANNOT_HAVE_MULTIPLE_SIGNERS]: "Multiple distinct signers were identified for address `$address`. Please ensure that you are using the same signer instance for each address.",
  [SOLANA_ERROR__SIGNER__EXPECTED_KEY_PAIR_SIGNER]: "The provided value does not implement the `KeyPairSigner` interface",
  [SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_MODIFYING_SIGNER]: "The provided value does not implement the `MessageModifyingSigner` interface",
  [SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_PARTIAL_SIGNER]: "The provided value does not implement the `MessagePartialSigner` interface",
  [SOLANA_ERROR__SIGNER__EXPECTED_MESSAGE_SIGNER]: "The provided value does not implement any of the `MessageSigner` interfaces",
  [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_MODIFYING_SIGNER]: "The provided value does not implement the `TransactionModifyingSigner` interface",
  [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_PARTIAL_SIGNER]: "The provided value does not implement the `TransactionPartialSigner` interface",
  [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SENDING_SIGNER]: "The provided value does not implement the `TransactionSendingSigner` interface",
  [SOLANA_ERROR__SIGNER__EXPECTED_TRANSACTION_SIGNER]: "The provided value does not implement any of the `TransactionSigner` interfaces",
  [SOLANA_ERROR__SIGNER__TRANSACTION_CANNOT_HAVE_MULTIPLE_SENDING_SIGNERS]: "More than one `TransactionSendingSigner` was identified.",
  [SOLANA_ERROR__SIGNER__TRANSACTION_SENDING_SIGNER_MISSING]: "No `TransactionSendingSigner` was identified. Please provide a valid `ITransactionWithSingleSendingSigner` transaction.",
  [SOLANA_ERROR__SIGNER__WALLET_MULTISIGN_UNIMPLEMENTED]: "Wallet account signers do not support signing multiple messages/transactions in a single operation",
  [SOLANA_ERROR__SUBTLE_CRYPTO__CANNOT_EXPORT_NON_EXTRACTABLE_KEY]: "Cannot export a non-extractable key.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__DIGEST_UNIMPLEMENTED]: "No digest implementation could be found.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__DISALLOWED_IN_INSECURE_CONTEXT]: "Cryptographic operations are only allowed in secure browser contexts. Read more here: https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__ED25519_ALGORITHM_UNIMPLEMENTED]: "This runtime does not support the generation of Ed25519 key pairs.\n\nInstall @solana/webcrypto-ed25519-polyfill and call its `install` function before generating keys in environments that do not support Ed25519.\n\nFor a list of runtimes that currently support Ed25519 operations, visit https://github.com/WICG/webcrypto-secure-curves/issues/20.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__EXPORT_FUNCTION_UNIMPLEMENTED]: "No signature verification implementation could be found.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__GENERATE_FUNCTION_UNIMPLEMENTED]: "No key generation implementation could be found.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__SIGN_FUNCTION_UNIMPLEMENTED]: "No signing implementation could be found.",
  [SOLANA_ERROR__SUBTLE_CRYPTO__VERIFY_FUNCTION_UNIMPLEMENTED]: "No key export implementation could be found.",
  [SOLANA_ERROR__TIMESTAMP_OUT_OF_RANGE]: "Timestamp value must be in the range [-8.64e15, 8.64e15]. `$value` given",
  [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_BORROW_OUTSTANDING]: "Transaction processing left an account with an outstanding borrowed reference",
  [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_IN_USE]: "Account in use",
  [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_LOADED_TWICE]: "Account loaded twice",
  [SOLANA_ERROR__TRANSACTION_ERROR__ACCOUNT_NOT_FOUND]: "Attempt to debit an account but found no record of a prior credit.",
  [SOLANA_ERROR__TRANSACTION_ERROR__ADDRESS_LOOKUP_TABLE_NOT_FOUND]: "Transaction loads an address table account that doesn't exist",
  [SOLANA_ERROR__TRANSACTION_ERROR__ALREADY_PROCESSED]: "This transaction has already been processed",
  [SOLANA_ERROR__TRANSACTION_ERROR__BLOCKHASH_NOT_FOUND]: "Blockhash not found",
  [SOLANA_ERROR__TRANSACTION_ERROR__CALL_CHAIN_TOO_DEEP]: "Loader call chain is too deep",
  [SOLANA_ERROR__TRANSACTION_ERROR__CLUSTER_MAINTENANCE]: "Transactions are currently disabled due to cluster maintenance",
  [SOLANA_ERROR__TRANSACTION_ERROR__DUPLICATE_INSTRUCTION]: "Transaction contains a duplicate instruction ($index) that is not allowed",
  [SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_FEE]: "Insufficient funds for fee",
  [SOLANA_ERROR__TRANSACTION_ERROR__INSUFFICIENT_FUNDS_FOR_RENT]: "Transaction results in an account ($accountIndex) with insufficient funds for rent",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_FOR_FEE]: "This account may not be used to pay transaction fees",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ACCOUNT_INDEX]: "Transaction contains an invalid account reference",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_DATA]: "Transaction loads an address table account with invalid data",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_INDEX]: "Transaction address table lookup uses an invalid index",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_ADDRESS_LOOKUP_TABLE_OWNER]: "Transaction loads an address table account with an invalid owner",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_LOADED_ACCOUNTS_DATA_SIZE_LIMIT]: "LoadedAccountsDataSizeLimit set for transaction must be greater than 0.",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_PROGRAM_FOR_EXECUTION]: "This program may not be used for executing instructions",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_RENT_PAYING_ACCOUNT]: "Transaction leaves an account with a lower balance than rent-exempt minimum",
  [SOLANA_ERROR__TRANSACTION_ERROR__INVALID_WRITABLE_ACCOUNT]: "Transaction loads a writable account that cannot be written",
  [SOLANA_ERROR__TRANSACTION_ERROR__MAX_LOADED_ACCOUNTS_DATA_SIZE_EXCEEDED]: "Transaction exceeded max loaded accounts data size cap",
  [SOLANA_ERROR__TRANSACTION_ERROR__MISSING_SIGNATURE_FOR_FEE]: "Transaction requires a fee but has no signature present",
  [SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_ACCOUNT_NOT_FOUND]: "Attempt to load a program that does not exist",
  [SOLANA_ERROR__TRANSACTION_ERROR__PROGRAM_EXECUTION_TEMPORARILY_RESTRICTED]: "Execution of the program referenced by account at index $accountIndex is temporarily restricted.",
  [SOLANA_ERROR__TRANSACTION_ERROR__RESANITIZATION_NEEDED]: "ResanitizationNeeded",
  [SOLANA_ERROR__TRANSACTION_ERROR__SANITIZE_FAILURE]: "Transaction failed to sanitize accounts offsets correctly",
  [SOLANA_ERROR__TRANSACTION_ERROR__SIGNATURE_FAILURE]: "Transaction did not pass signature verification",
  [SOLANA_ERROR__TRANSACTION_ERROR__TOO_MANY_ACCOUNT_LOCKS]: "Transaction locked too many accounts",
  [SOLANA_ERROR__TRANSACTION_ERROR__UNBALANCED_TRANSACTION]: "Sum of account balances before and after transaction do not match",
  [SOLANA_ERROR__TRANSACTION_ERROR__UNKNOWN]: "The transaction failed with the error `$errorName`",
  [SOLANA_ERROR__TRANSACTION_ERROR__UNSUPPORTED_VERSION]: "Transaction version is unsupported",
  [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_BLOCK_LIMIT]: "Transaction would exceed account data limit within the block",
  [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_ACCOUNT_DATA_TOTAL_LIMIT]: "Transaction would exceed total account data limit",
  [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_ACCOUNT_COST_LIMIT]: "Transaction would exceed max account limit within the block",
  [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_BLOCK_COST_LIMIT]: "Transaction would exceed max Block Cost Limit",
  [SOLANA_ERROR__TRANSACTION_ERROR__WOULD_EXCEED_MAX_VOTE_COST_LIMIT]: "Transaction would exceed max Vote Cost Limit",
  [SOLANA_ERROR__TRANSACTION__ADDRESSES_CANNOT_SIGN_TRANSACTION]: "Attempted to sign a transaction with an address that is not a signer for it",
  [SOLANA_ERROR__TRANSACTION__ADDRESS_MISSING]: "Transaction is missing an address at index: $index.",
  [SOLANA_ERROR__TRANSACTION__CANNOT_ENCODE_WITH_EMPTY_SIGNATURES]: "Transaction has no expected signers therefore it cannot be encoded",
  [SOLANA_ERROR__TRANSACTION__EXPECTED_BLOCKHASH_LIFETIME]: "Transaction does not have a blockhash lifetime",
  [SOLANA_ERROR__TRANSACTION__EXPECTED_NONCE_LIFETIME]: "Transaction is not a durable nonce transaction",
  [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_CONTENTS_MISSING]: "Contents of these address lookup tables unknown: $lookupTableAddresses",
  [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_ADDRESS_LOOKUP_TABLE_INDEX_OUT_OF_RANGE]: "Lookup of address at index $highestRequestedIndex failed for lookup table `$lookupTableAddress`. Highest known index is $highestKnownIndex. The lookup table may have been extended since its contents were retrieved",
  [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_FEE_PAYER_MISSING]: "No fee payer set in CompiledTransaction",
  [SOLANA_ERROR__TRANSACTION__FAILED_TO_DECOMPILE_INSTRUCTION_PROGRAM_ADDRESS_NOT_FOUND]: "Could not find program address at index $index",
  [SOLANA_ERROR__TRANSACTION__FAILED_TO_ESTIMATE_COMPUTE_LIMIT]: "Failed to estimate the compute unit consumption for this transaction message. This is likely because simulating the transaction failed. Inspect the `cause` property of this error to learn more",
  [SOLANA_ERROR__TRANSACTION__FEE_PAYER_MISSING]: "Transaction is missing a fee payer.",
  [SOLANA_ERROR__TRANSACTION__FEE_PAYER_SIGNATURE_MISSING]: "Could not determine this transaction's signature. Make sure that the transaction has been signed by its fee payer.",
  [SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_FIRST_INSTRUCTION_MUST_BE_ADVANCE_NONCE]: "Transaction first instruction is not advance nonce account instruction.",
  [SOLANA_ERROR__TRANSACTION__INVALID_NONCE_TRANSACTION_INSTRUCTIONS_MISSING]: "Transaction with no instructions cannot be durable nonce transaction.",
  [SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_CANNOT_PAY_FEES]: "This transaction includes an address (`$programAddress`) which is both invoked and set as the fee payer. Program addresses may not pay fees",
  [SOLANA_ERROR__TRANSACTION__INVOKED_PROGRAMS_MUST_NOT_BE_WRITABLE]: "This transaction includes an address (`$programAddress`) which is both invoked and marked writable. Program addresses may not be writable",
  [SOLANA_ERROR__TRANSACTION__MESSAGE_SIGNATURES_MISMATCH]: "The transaction message expected the transaction to have $signerAddressesLength signatures, got $signaturesLength.",
  [SOLANA_ERROR__TRANSACTION__SIGNATURES_MISSING]: "Transaction is missing signatures for addresses: $addresses.",
  [SOLANA_ERROR__TRANSACTION__VERSION_NUMBER_OUT_OF_RANGE]: "Transaction version must be in the range [0, 127]. `$actualVersion` given"
};
function getErrorMessage(code, context = {}) {
  if (false) {
    return getHumanReadableErrorMessage(code, context);
  } else {
    let decodingAdviceMessage = `Solana error #${code}; Decode this error by running \`npx @solana/errors decode -- ${code}`;
    if (Object.keys(context).length) {
      decodingAdviceMessage += ` '${encodeContextObject(context)}'`;
    }
    return `${decodingAdviceMessage}\``;
  }
}
var SolanaError = class extends Error {
  constructor(...[code, contextAndErrorOptions]) {
    let context;
    let errorOptions;
    if (contextAndErrorOptions) {
      const { cause, ...contextRest } = contextAndErrorOptions;
      if (cause) {
        errorOptions = { cause };
      }
      if (Object.keys(contextRest).length > 0) {
        context = contextRest;
      }
    }
    const message = getErrorMessage(code, context);
    super(message, errorOptions);
    __publicField(this, "cause", this.cause);
    __publicField(this, "context");
    this.context = {
      __code: code,
      ...context
    };
    this.name = "SolanaError";
  }
};

// node_modules/@solana/codecs-core/dist/index.browser.mjs
var padBytes = (bytes, length) => {
  if (bytes.length >= length) return bytes;
  const paddedBytes = new Uint8Array(length).fill(0);
  paddedBytes.set(bytes);
  return paddedBytes;
};
var fixBytes = (bytes, length) => padBytes(bytes.length <= length ? bytes : bytes.slice(0, length), length);
function getEncodedSize(value, encoder) {
  return "fixedSize" in encoder ? encoder.fixedSize : encoder.getSizeFromValue(value);
}
function createEncoder(encoder) {
  return Object.freeze({
    ...encoder,
    encode: (value) => {
      const bytes = new Uint8Array(getEncodedSize(value, encoder));
      encoder.write(value, bytes, 0);
      return bytes;
    }
  });
}
function createDecoder(decoder) {
  return Object.freeze({
    ...decoder,
    decode: (bytes, offset = 0) => decoder.read(bytes, offset)[0]
  });
}
function isFixedSize(codec) {
  return "fixedSize" in codec && typeof codec.fixedSize === "number";
}
function combineCodec(encoder, decoder) {
  if (isFixedSize(encoder) !== isFixedSize(decoder)) {
    throw new SolanaError(SOLANA_ERROR__CODECS__ENCODER_DECODER_SIZE_COMPATIBILITY_MISMATCH);
  }
  if (isFixedSize(encoder) && isFixedSize(decoder) && encoder.fixedSize !== decoder.fixedSize) {
    throw new SolanaError(SOLANA_ERROR__CODECS__ENCODER_DECODER_FIXED_SIZE_MISMATCH, {
      decoderFixedSize: decoder.fixedSize,
      encoderFixedSize: encoder.fixedSize
    });
  }
  if (!isFixedSize(encoder) && !isFixedSize(decoder) && encoder.maxSize !== decoder.maxSize) {
    throw new SolanaError(SOLANA_ERROR__CODECS__ENCODER_DECODER_MAX_SIZE_MISMATCH, {
      decoderMaxSize: decoder.maxSize,
      encoderMaxSize: encoder.maxSize
    });
  }
  return {
    ...decoder,
    ...encoder,
    decode: decoder.decode,
    encode: encoder.encode,
    read: decoder.read,
    write: encoder.write
  };
}
function assertByteArrayIsNotEmptyForCodec(codecDescription, bytes, offset = 0) {
  if (bytes.length - offset <= 0) {
    throw new SolanaError(SOLANA_ERROR__CODECS__CANNOT_DECODE_EMPTY_BYTE_ARRAY, {
      codecDescription
    });
  }
}
function assertByteArrayHasEnoughBytesForCodec(codecDescription, expected, bytes, offset = 0) {
  const bytesLength = bytes.length - offset;
  if (bytesLength < expected) {
    throw new SolanaError(SOLANA_ERROR__CODECS__INVALID_BYTE_LENGTH, {
      bytesLength,
      codecDescription,
      expected
    });
  }
}
function fixEncoderSize(encoder, fixedBytes) {
  return createEncoder({
    fixedSize: fixedBytes,
    write: (value, bytes, offset) => {
      const variableByteArray = encoder.encode(value);
      const fixedByteArray = variableByteArray.length > fixedBytes ? variableByteArray.slice(0, fixedBytes) : variableByteArray;
      bytes.set(fixedByteArray, offset);
      return offset + fixedBytes;
    }
  });
}
function fixDecoderSize(decoder, fixedBytes) {
  return createDecoder({
    fixedSize: fixedBytes,
    read: (bytes, offset) => {
      assertByteArrayHasEnoughBytesForCodec("fixCodecSize", fixedBytes, bytes, offset);
      if (offset > 0 || bytes.length > fixedBytes) {
        bytes = bytes.slice(offset, offset + fixedBytes);
      }
      if (isFixedSize(decoder)) {
        bytes = fixBytes(bytes, decoder.fixedSize);
      }
      const [value] = decoder.read(bytes, 0);
      return [value, offset + fixedBytes];
    }
  });
}
function fixCodecSize(codec, fixedBytes) {
  return combineCodec(fixEncoderSize(codec, fixedBytes), fixDecoderSize(codec, fixedBytes));
}

// node_modules/@solana/codecs-numbers/dist/index.browser.mjs
function assertNumberIsBetweenForCodec(codecDescription, min, max, value) {
  if (value < min || value > max) {
    throw new SolanaError(SOLANA_ERROR__CODECS__NUMBER_OUT_OF_RANGE, {
      codecDescription,
      max,
      min,
      value
    });
  }
}
function isLittleEndian(config) {
  return config?.endian === 1 ? false : true;
}
function numberEncoderFactory(input) {
  return createEncoder({
    fixedSize: input.size,
    write(value, bytes, offset) {
      if (input.range) {
        assertNumberIsBetweenForCodec(input.name, input.range[0], input.range[1], value);
      }
      const arrayBuffer = new ArrayBuffer(input.size);
      input.set(new DataView(arrayBuffer), value, isLittleEndian(input.config));
      bytes.set(new Uint8Array(arrayBuffer), offset);
      return offset + input.size;
    }
  });
}
function numberDecoderFactory(input) {
  return createDecoder({
    fixedSize: input.size,
    read(bytes, offset = 0) {
      assertByteArrayIsNotEmptyForCodec(input.name, bytes, offset);
      assertByteArrayHasEnoughBytesForCodec(input.name, input.size, bytes, offset);
      const view = new DataView(toArrayBuffer(bytes, offset, input.size));
      return [input.get(view, isLittleEndian(input.config)), offset + input.size];
    }
  });
}
function toArrayBuffer(bytes, offset, length) {
  const bytesOffset = bytes.byteOffset + (offset ?? 0);
  const bytesLength = length ?? bytes.byteLength;
  return bytes.buffer.slice(bytesOffset, bytesOffset + bytesLength);
}
var getU64Encoder = (config = {}) => numberEncoderFactory({
  config,
  name: "u64",
  range: [0n, BigInt("0xffffffffffffffff")],
  set: (view, value, le) => view.setBigUint64(0, BigInt(value), le),
  size: 8
});
var getU64Decoder = (config = {}) => numberDecoderFactory({
  config,
  get: (view, le) => view.getBigUint64(0, le),
  name: "u64",
  size: 8
});
var getU64Codec = (config = {}) => combineCodec(getU64Encoder(config), getU64Decoder(config));

// node_modules/@solana/codecs-data-structures/dist/index.browser.mjs
function sumCodecSizes(sizes) {
  return sizes.reduce((all, size) => all === null || size === null ? null : all + size, 0);
}
function getFixedSize(codec) {
  return isFixedSize(codec) ? codec.fixedSize : null;
}
function getMaxSize(codec) {
  return isFixedSize(codec) ? codec.fixedSize : codec.maxSize ?? null;
}
function getBytesEncoder() {
  return createEncoder({
    getSizeFromValue: (value) => value.length,
    write: (value, bytes, offset) => {
      bytes.set(value, offset);
      return offset + value.length;
    }
  });
}
function getBytesDecoder() {
  return createDecoder({
    read: (bytes, offset) => {
      const slice = bytes.slice(offset);
      return [slice, offset + slice.length];
    }
  });
}
function getBytesCodec() {
  return combineCodec(getBytesEncoder(), getBytesDecoder());
}
function getStructEncoder(fields) {
  const fieldCodecs = fields.map(([, codec]) => codec);
  const fixedSize = sumCodecSizes(fieldCodecs.map(getFixedSize));
  const maxSize = sumCodecSizes(fieldCodecs.map(getMaxSize)) ?? void 0;
  return createEncoder({
    ...fixedSize === null ? {
      getSizeFromValue: (value) => fields.map(([key, codec]) => getEncodedSize(value[key], codec)).reduce((all, one) => all + one, 0),
      maxSize
    } : { fixedSize },
    write: (struct20, bytes, offset) => {
      fields.forEach(([key, codec]) => {
        offset = codec.write(struct20[key], bytes, offset);
      });
      return offset;
    }
  });
}
function getStructDecoder(fields) {
  const fieldCodecs = fields.map(([, codec]) => codec);
  const fixedSize = sumCodecSizes(fieldCodecs.map(getFixedSize));
  const maxSize = sumCodecSizes(fieldCodecs.map(getMaxSize)) ?? void 0;
  return createDecoder({
    ...fixedSize === null ? { maxSize } : { fixedSize },
    read: (bytes, offset) => {
      const struct20 = {};
      fields.forEach(([key, codec]) => {
        const [value, newOffset] = codec.read(bytes, offset);
        offset = newOffset;
        struct20[key] = value;
      });
      return [struct20, offset];
    }
  });
}
function getStructCodec(fields) {
  return combineCodec(
    getStructEncoder(fields),
    getStructDecoder(fields)
  );
}

// node_modules/@solana/spl-token-group/lib/esm/state/tokenGroup.js
var tokenGroupCodec = getStructCodec([
  ["updateAuthority", fixCodecSize(getBytesCodec(), 32)],
  ["mint", fixCodecSize(getBytesCodec(), 32)],
  ["size", getU64Codec()],
  ["maxSize", getU64Codec()]
]);
var TOKEN_GROUP_SIZE = tokenGroupCodec.fixedSize;

// node_modules/@solana/spl-token-group/lib/esm/state/tokenGroupMember.js
var tokenGroupMemberCodec = getStructCodec([
  ["mint", fixCodecSize(getBytesCodec(), 32)],
  ["group", fixCodecSize(getBytesCodec(), 32)],
  ["memberNumber", getU64Codec()]
]);
var TOKEN_GROUP_MEMBER_SIZE = tokenGroupMemberCodec.fixedSize;

// node_modules/@solana/spl-token/lib/esm/extensions/groupMemberPointer/state.js
var import_buffer_layout8 = __toESM(require_Layout(), 1);
var GroupMemberPointerLayout = (0, import_buffer_layout8.struct)([
  publicKey("authority"),
  publicKey("memberAddress")
]);
var GROUP_MEMBER_POINTER_SIZE = GroupMemberPointerLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/groupPointer/state.js
var import_buffer_layout9 = __toESM(require_Layout(), 1);
var GroupPointerLayout = (0, import_buffer_layout9.struct)([
  publicKey("authority"),
  publicKey("groupAddress")
]);
var GROUP_POINTER_SIZE = GroupPointerLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/immutableOwner.js
var import_buffer_layout10 = __toESM(require_Layout(), 1);
var ImmutableOwnerLayout = (0, import_buffer_layout10.struct)([]);
var IMMUTABLE_OWNER_SIZE = ImmutableOwnerLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/interestBearingMint/state.js
var import_buffer_layout11 = __toESM(require_Layout(), 1);
var InterestBearingMintConfigStateLayout = (0, import_buffer_layout11.struct)([
  publicKey("rateAuthority"),
  (0, import_buffer_layout11.ns64)("initializationTimestamp"),
  (0, import_buffer_layout11.s16)("preUpdateAverageRate"),
  (0, import_buffer_layout11.ns64)("lastUpdateTimestamp"),
  (0, import_buffer_layout11.s16)("currentRate")
]);
var INTEREST_BEARING_MINT_CONFIG_STATE_SIZE = InterestBearingMintConfigStateLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/memoTransfer/state.js
var import_buffer_layout12 = __toESM(require_Layout(), 1);
var MemoTransferLayout = (0, import_buffer_layout12.struct)([bool("requireIncomingTransferMemos")]);
var MEMO_TRANSFER_SIZE = MemoTransferLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/metadataPointer/state.js
var import_buffer_layout13 = __toESM(require_Layout(), 1);
var MetadataPointerLayout = (0, import_buffer_layout13.struct)([
  publicKey("authority"),
  publicKey("metadataAddress")
]);
var METADATA_POINTER_SIZE = MetadataPointerLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/mintCloseAuthority.js
var import_buffer_layout14 = __toESM(require_Layout(), 1);
var MintCloseAuthorityLayout = (0, import_buffer_layout14.struct)([publicKey("closeAuthority")]);
var MINT_CLOSE_AUTHORITY_SIZE = MintCloseAuthorityLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/nonTransferable.js
var import_buffer_layout15 = __toESM(require_Layout(), 1);
var NonTransferableLayout = (0, import_buffer_layout15.struct)([]);
var NON_TRANSFERABLE_SIZE = NonTransferableLayout.span;
var NON_TRANSFERABLE_ACCOUNT_SIZE = NonTransferableLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/pausable/state.js
var import_buffer_layout16 = __toESM(require_Layout(), 1);
var PausableConfigLayout = (0, import_buffer_layout16.struct)([publicKey("authority"), bool("paused")]);
var PAUSABLE_CONFIG_SIZE = PausableConfigLayout.span;
var PausableAccountLayout = (0, import_buffer_layout16.struct)([]);
var PAUSABLE_ACCOUNT_SIZE = PausableAccountLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/permanentDelegate.js
var import_buffer_layout17 = __toESM(require_Layout(), 1);
var PermanentDelegateLayout = (0, import_buffer_layout17.struct)([publicKey("delegate")]);
var PERMANENT_DELEGATE_SIZE = PermanentDelegateLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/permissionedBurn/state.js
var import_buffer_layout18 = __toESM(require_Layout(), 1);
var PermissionedBurnLayout = (0, import_buffer_layout18.struct)([publicKey("authority")]);
var PERMISSIONED_BURN_SIZE = PermissionedBurnLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/scaledUiAmount/state.js
var import_buffer_layout19 = __toESM(require_Layout(), 1);
var ScaledUiAmountConfigLayout = (0, import_buffer_layout19.struct)([
  publicKey("authority"),
  (0, import_buffer_layout19.f64)("multiplier"),
  u64("newMultiplierEffectiveTimestamp"),
  (0, import_buffer_layout19.f64)("newMultiplier")
]);
var SCALED_UI_AMOUNT_CONFIG_SIZE = ScaledUiAmountConfigLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/transferFee/state.js
var import_buffer_layout20 = __toESM(require_Layout(), 1);
var MAX_FEE_BASIS_POINTS = 1e4;
var ONE_IN_BASIS_POINTS = BigInt(MAX_FEE_BASIS_POINTS);
function transferFeeLayout(property) {
  return (0, import_buffer_layout20.struct)([u64("epoch"), u64("maximumFee"), (0, import_buffer_layout20.u16)("transferFeeBasisPoints")], property);
}
var TransferFeeConfigLayout = (0, import_buffer_layout20.struct)([
  publicKey("transferFeeConfigAuthority"),
  publicKey("withdrawWithheldAuthority"),
  u64("withheldAmount"),
  transferFeeLayout("olderTransferFee"),
  transferFeeLayout("newerTransferFee")
]);
var TRANSFER_FEE_CONFIG_SIZE = TransferFeeConfigLayout.span;
var TransferFeeAmountLayout = (0, import_buffer_layout20.struct)([u64("withheldAmount")]);
var TRANSFER_FEE_AMOUNT_SIZE = TransferFeeAmountLayout.span;

// node_modules/@solana/spl-token/lib/esm/extensions/transferHook/state.js
var import_buffer_layout21 = __toESM(require_Layout(), 1);
var TransferHookLayout = (0, import_buffer_layout21.struct)([publicKey("authority"), publicKey("programId")]);
var TRANSFER_HOOK_SIZE = TransferHookLayout.span;
var TransferHookAccountLayout = (0, import_buffer_layout21.struct)([bool("transferring")]);
var TRANSFER_HOOK_ACCOUNT_SIZE = TransferHookAccountLayout.span;
var ExtraAccountMetaLayout = (0, import_buffer_layout21.struct)([
  (0, import_buffer_layout21.u8)("discriminator"),
  (0, import_buffer_layout21.blob)(32, "addressConfig"),
  bool("isSigner"),
  bool("isWritable")
]);
var ExtraAccountMetaListLayout = (0, import_buffer_layout21.struct)([
  (0, import_buffer_layout21.u32)("count"),
  (0, import_buffer_layout21.seq)(ExtraAccountMetaLayout, (0, import_buffer_layout21.greedy)(ExtraAccountMetaLayout.span), "extraAccounts")
]);
var ExtraAccountMetaAccountDataLayout = (0, import_buffer_layout21.struct)([
  u64("instructionDiscriminator"),
  (0, import_buffer_layout21.u32)("length"),
  ExtraAccountMetaListLayout.replicate("extraAccountsList")
]);

// node_modules/@solana/spl-token/lib/esm/extensions/extensionType.js
var ExtensionType;
(function(ExtensionType2) {
  ExtensionType2[ExtensionType2["Uninitialized"] = 0] = "Uninitialized";
  ExtensionType2[ExtensionType2["TransferFeeConfig"] = 1] = "TransferFeeConfig";
  ExtensionType2[ExtensionType2["TransferFeeAmount"] = 2] = "TransferFeeAmount";
  ExtensionType2[ExtensionType2["MintCloseAuthority"] = 3] = "MintCloseAuthority";
  ExtensionType2[ExtensionType2["ConfidentialTransferMint"] = 4] = "ConfidentialTransferMint";
  ExtensionType2[ExtensionType2["ConfidentialTransferAccount"] = 5] = "ConfidentialTransferAccount";
  ExtensionType2[ExtensionType2["DefaultAccountState"] = 6] = "DefaultAccountState";
  ExtensionType2[ExtensionType2["ImmutableOwner"] = 7] = "ImmutableOwner";
  ExtensionType2[ExtensionType2["MemoTransfer"] = 8] = "MemoTransfer";
  ExtensionType2[ExtensionType2["NonTransferable"] = 9] = "NonTransferable";
  ExtensionType2[ExtensionType2["InterestBearingConfig"] = 10] = "InterestBearingConfig";
  ExtensionType2[ExtensionType2["CpiGuard"] = 11] = "CpiGuard";
  ExtensionType2[ExtensionType2["PermanentDelegate"] = 12] = "PermanentDelegate";
  ExtensionType2[ExtensionType2["NonTransferableAccount"] = 13] = "NonTransferableAccount";
  ExtensionType2[ExtensionType2["TransferHook"] = 14] = "TransferHook";
  ExtensionType2[ExtensionType2["TransferHookAccount"] = 15] = "TransferHookAccount";
  ExtensionType2[ExtensionType2["MetadataPointer"] = 18] = "MetadataPointer";
  ExtensionType2[ExtensionType2["TokenMetadata"] = 19] = "TokenMetadata";
  ExtensionType2[ExtensionType2["GroupPointer"] = 20] = "GroupPointer";
  ExtensionType2[ExtensionType2["TokenGroup"] = 21] = "TokenGroup";
  ExtensionType2[ExtensionType2["GroupMemberPointer"] = 22] = "GroupMemberPointer";
  ExtensionType2[ExtensionType2["TokenGroupMember"] = 23] = "TokenGroupMember";
  ExtensionType2[ExtensionType2["ScaledUiAmountConfig"] = 25] = "ScaledUiAmountConfig";
  ExtensionType2[ExtensionType2["PausableConfig"] = 26] = "PausableConfig";
  ExtensionType2[ExtensionType2["PausableAccount"] = 27] = "PausableAccount";
  ExtensionType2[ExtensionType2["PermissionedBurn"] = 28] = "PermissionedBurn";
})(ExtensionType || (ExtensionType = {}));
var TYPE_SIZE = 2;
var LENGTH_SIZE = 2;
function addTypeAndLengthToLen(len) {
  return len + TYPE_SIZE + LENGTH_SIZE;
}
function isVariableLengthExtension(e) {
  switch (e) {
    case ExtensionType.TokenMetadata:
      return true;
    default:
      return false;
  }
}
function getTypeLen(e) {
  switch (e) {
    case ExtensionType.Uninitialized:
      return 0;
    case ExtensionType.TransferFeeConfig:
      return TRANSFER_FEE_CONFIG_SIZE;
    case ExtensionType.TransferFeeAmount:
      return TRANSFER_FEE_AMOUNT_SIZE;
    case ExtensionType.MintCloseAuthority:
      return MINT_CLOSE_AUTHORITY_SIZE;
    case ExtensionType.ConfidentialTransferMint:
      return 65;
    case ExtensionType.ConfidentialTransferAccount:
      return 295;
    case ExtensionType.CpiGuard:
      return CPI_GUARD_SIZE;
    case ExtensionType.DefaultAccountState:
      return DEFAULT_ACCOUNT_STATE_SIZE;
    case ExtensionType.ImmutableOwner:
      return IMMUTABLE_OWNER_SIZE;
    case ExtensionType.MemoTransfer:
      return MEMO_TRANSFER_SIZE;
    case ExtensionType.MetadataPointer:
      return METADATA_POINTER_SIZE;
    case ExtensionType.NonTransferable:
      return NON_TRANSFERABLE_SIZE;
    case ExtensionType.InterestBearingConfig:
      return INTEREST_BEARING_MINT_CONFIG_STATE_SIZE;
    case ExtensionType.PermanentDelegate:
      return PERMANENT_DELEGATE_SIZE;
    case ExtensionType.NonTransferableAccount:
      return NON_TRANSFERABLE_ACCOUNT_SIZE;
    case ExtensionType.TransferHook:
      return TRANSFER_HOOK_SIZE;
    case ExtensionType.TransferHookAccount:
      return TRANSFER_HOOK_ACCOUNT_SIZE;
    case ExtensionType.GroupPointer:
      return GROUP_POINTER_SIZE;
    case ExtensionType.GroupMemberPointer:
      return GROUP_MEMBER_POINTER_SIZE;
    case ExtensionType.TokenGroup:
      return TOKEN_GROUP_SIZE;
    case ExtensionType.TokenGroupMember:
      return TOKEN_GROUP_MEMBER_SIZE;
    case ExtensionType.ScaledUiAmountConfig:
      return SCALED_UI_AMOUNT_CONFIG_SIZE;
    case ExtensionType.PausableConfig:
      return PAUSABLE_CONFIG_SIZE;
    case ExtensionType.PausableAccount:
      return PAUSABLE_ACCOUNT_SIZE;
    case ExtensionType.PermissionedBurn:
      return PERMISSIONED_BURN_SIZE;
    case ExtensionType.TokenMetadata:
      throw Error(`Cannot get type length for variable extension type: ${e}`);
    default:
      throw Error(`Unknown extension type: ${e}`);
  }
}
function getLen(extensionTypes, baseSize, variableLengthExtensions = {}) {
  if (extensionTypes.length === 0 && Object.keys(variableLengthExtensions).length === 0) {
    return baseSize;
  } else {
    const accountLength = ACCOUNT_SIZE + ACCOUNT_TYPE_SIZE + extensionTypes.filter((element, i) => i === extensionTypes.indexOf(element)).map((element) => addTypeAndLengthToLen(getTypeLen(element))).reduce((a, b) => a + b, 0) + Object.entries(variableLengthExtensions).map(([extension, len]) => {
      if (!isVariableLengthExtension(Number(extension))) {
        throw Error(`Extension ${extension} is not variable length`);
      }
      return addTypeAndLengthToLen(len);
    }).reduce((a, b) => a + b, 0);
    if (accountLength === MULTISIG_SIZE) {
      return accountLength + TYPE_SIZE;
    } else {
      return accountLength;
    }
  }
}
function getMintLen(extensionTypes, variableLengthExtensions = {}) {
  return getLen(extensionTypes, MINT_SIZE, variableLengthExtensions);
}

// node_modules/@solana/spl-token/lib/esm/state/mint.js
var MintLayout = (0, import_buffer_layout22.struct)([
  (0, import_buffer_layout22.u32)("mintAuthorityOption"),
  publicKey("mintAuthority"),
  u64("supply"),
  (0, import_buffer_layout22.u8)("decimals"),
  bool("isInitialized"),
  (0, import_buffer_layout22.u32)("freezeAuthorityOption"),
  publicKey("freezeAuthority")
]);
var MINT_SIZE = MintLayout.span;
async function getMinimumBalanceForRentExemptMint(connection, commitment) {
  return await getMinimumBalanceForRentExemptMintWithExtensions(connection, [], commitment);
}
async function getMinimumBalanceForRentExemptMintWithExtensions(connection, extensions, commitment) {
  const mintLen = getMintLen(extensions);
  return await connection.getMinimumBalanceForRentExemption(mintLen, commitment);
}
function getAssociatedTokenAddressSync(mint, owner, allowOwnerOffCurve = false, programId = TOKEN_PROGRAM_ID, associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID) {
  if (!allowOwnerOffCurve && !PublicKey.isOnCurve(owner.toBuffer()))
    throw new TokenOwnerOffCurveError();
  const [address] = PublicKey.findProgramAddressSync([owner.toBuffer(), programId.toBuffer(), mint.toBuffer()], associatedTokenProgramId);
  return address;
}

// src/lib/borsh.js
var Writer = class {
  constructor() {
    this.parts = [];
  }
  raw(bytes) {
    this.parts.push(Uint8Array.from(bytes));
    return this;
  }
  u8(value) {
    this.parts.push(Uint8Array.of(value & 255));
    return this;
  }
  bool(value) {
    return this.u8(value ? 1 : 0);
  }
  u16(value) {
    const b = new Uint8Array(2);
    new DataView(b.buffer).setUint16(0, Number(value), true);
    this.parts.push(b);
    return this;
  }
  u32(value) {
    const b = new Uint8Array(4);
    new DataView(b.buffer).setUint32(0, Number(value), true);
    this.parts.push(b);
    return this;
  }
  u64(value) {
    return this.big(value, 8, false);
  }
  u128(value) {
    return this.big(value, 16, false);
  }
  i64(value) {
    return this.big(value, 8, true);
  }
  big(value, size, signed) {
    const b = new Uint8Array(size);
    const view = new DataView(b.buffer);
    const v = BigInt(value);
    if (signed) {
      view.setBigInt64(0, v, true);
    } else if (size === 16) {
      view.setBigUint64(0, v & 0xffffffffffffffffn, true);
      view.setBigUint64(8, v >> 64n, true);
    } else {
      view.setBigUint64(0, v, true);
    }
    this.parts.push(b);
    return this;
  }
  pubkey(base58) {
    return this.raw(decodeBase58(base58));
  }
  bytes() {
    const total = this.parts.reduce((n, p) => n + p.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const part of this.parts) {
      out.set(part, offset);
      offset += part.length;
    }
    return out;
  }
};
var Reader = class {
  constructor(bytes, offset = 0) {
    this.bytes = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    this.offset = offset;
  }
  u8() {
    return this.bytes[this.offset++];
  }
  bool() {
    return this.u8() !== 0;
  }
  u16() {
    const v = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return v;
  }
  u32() {
    const v = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return v;
  }
  u64() {
    const v = this.view.getBigUint64(this.offset, true);
    this.offset += 8;
    return v;
  }
  u128() {
    const lo = this.view.getBigUint64(this.offset, true);
    const hi = this.view.getBigUint64(this.offset + 8, true);
    this.offset += 16;
    return hi << 64n | lo;
  }
  i64() {
    const v = this.view.getBigInt64(this.offset, true);
    this.offset += 8;
    return v;
  }
  pubkey() {
    const slice = this.bytes.slice(this.offset, this.offset + 32);
    this.offset += 32;
    return encodeBase58(slice);
  }
  rest() {
    return this.bytes.slice(this.offset);
  }
};
function discriminatorHex(bytes) {
  return Array.from(bytes.slice(0, 8)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function encodeBase58(bytes) {
  let value = 0n;
  for (const byte of bytes) {
    value = value << 8n | BigInt(byte);
  }
  let out = "";
  while (value > 0n) {
    const mod = value % 58n;
    out = ALPHABET[Number(mod)] + out;
    value /= 58n;
  }
  for (const byte of bytes) {
    if (byte !== 0) break;
    out = "1" + out;
  }
  return out === "" ? "1" : out;
}
function decodeBase58(text) {
  let value = 0n;
  for (const char of text) {
    const index = ALPHABET.indexOf(char);
    if (index < 0) throw new Error(`invalid base58 character: ${char}`);
    value = value * 58n + BigInt(index);
  }
  const out = [];
  while (value > 0n) {
    out.unshift(Number(value % 256n));
    value /= 256n;
  }
  for (const char of text) {
    if (char !== "1") break;
    out.unshift(0);
  }
  const bytes = Uint8Array.from(out);
  if (bytes.length !== 32) {
    throw new Error(`expected a 32-byte address, got ${bytes.length} bytes`);
  }
  return bytes;
}

// src/lib/wallet.js
function getConnection() {
  const config = getConfig();
  const override = new URLSearchParams(window.location.search).get("rpc");
  if (override) {
    try {
      localStorage.setItem("aura.rpc", override);
    } catch {
    }
  }
  const rpc = localStorage.getItem("aura.rpc") || config.rpc;
  return new Connection(rpc, { commitment: "confirmed" });
}
var CANDIDATES = [
  { label: "Bitget Wallet", path: "bitgetWallet.solana", get: () => window.bitgetWallet?.solana },
  { label: "Bitget Wallet", path: "bitgetWallet.providers.solana", get: () => window.bitgetWallet?.providers?.solana },
  { label: "Bitget Wallet", path: "bitgetWallet.provider.solana", get: () => window.bitgetWallet?.provider?.solana },
  { label: "Bitget Wallet", path: "bitkeep.solana", get: () => window.bitkeep?.solana },
  { label: "Bitget Wallet", path: "bitgetWallet", get: () => window.bitgetWallet },
  { label: "Bitget Wallet", path: "bitkeep", get: () => window.bitkeep },
  { label: "Phantom", path: "phantom.solana", get: () => window.phantom?.solana },
  { label: "Solflare", path: "solflare", get: () => window.solflare },
  { label: "Backpack", path: "backpack", get: () => window.backpack },
  { label: "Solana \u94B1\u5305", path: "solana", get: () => window.solana }
];
function capabilities(object) {
  const has = (key) => typeof object?.[key] === "function";
  const connectable = has("connect") || has("request");
  return {
    connect: has("connect"),
    request: has("request"),
    signAndSendTransaction: has("signAndSendTransaction"),
    signTransaction: has("signTransaction"),
    connectable
  };
}
function describeEnvironment() {
  const found = [];
  for (const candidate of CANDIDATES) {
    let object;
    try {
      object = candidate.get();
    } catch (error) {
      found.push({ label: candidate.label, path: candidate.path, error: String(error) });
      continue;
    }
    if (!object) continue;
    let keys = [];
    try {
      keys = Object.keys(object).slice(0, 24);
    } catch {
      keys = [];
    }
    found.push({
      label: candidate.label,
      path: candidate.path,
      type: typeof object,
      capabilities: capabilities(object),
      keys
    });
  }
  const standard = [];
  try {
    for (const wallet of window?.navigator?.wallets?.get?.() ?? []) {
      standard.push({
        name: wallet.name,
        chains: wallet.chains,
        features: Object.keys(wallet.features ?? {})
      });
    }
  } catch (error) {
    standard.push({ name: "\u8BFB\u53D6\u5931\u8D25", error: String(error) });
  }
  return {
    url: window?.location?.href ?? "",
    userAgent: window?.navigator?.userAgent ?? "",
    candidates: found,
    standard,
    legacySolana: window.solana ? { present: true, isPhantom: Boolean(window.solana.isPhantom), isSolflare: Boolean(window.solana.isSolflare) } : { present: false }
  };
}
function detectProviders() {
  const options = [];
  const seen = /* @__PURE__ */ new Set();
  const add = (option) => {
    const key = option.label.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    options.push(option);
  };
  for (const candidate of CANDIDATES) {
    let object;
    try {
      object = candidate.get();
    } catch {
      continue;
    }
    if (!object) continue;
    const caps = capabilities(object);
    if (!caps.connectable) continue;
    add({ kind: "legacy", label: candidate.label, provider: object, path: candidate.path });
  }
  for (const wallet of standardWallets()) {
    add({ kind: "standard", label: wallet.name || "Wallet Standard", wallet });
  }
  return options;
}
function standardWallets() {
  const registry = window?.navigator?.wallets;
  if (!registry || typeof registry.get !== "function") return [];
  return registry.get().filter((wallet) => {
    const features = wallet.features ?? {};
    return features["standard:connect"] && (features["solana:signAndSendTransaction"] || features["solana:signTransaction"]);
  });
}
function isMobileBrowser() {
  return /android|iphone|ipad|mobile/i.test(window?.navigator?.userAgent ?? "");
}
function walletHint() {
  const base = isMobileBrowser() ? "\u8BF7\u5728 Bitget Wallet \u7684\u300CDApp \u6D4F\u89C8\u5668\u300D\u4E2D\u6253\u5F00\u672C\u9875\u5730\u5740\uFF0C\u9875\u9762\u624D\u80FD\u5524\u8D77\u94B1\u5305\u7B7E\u540D\u3002" : "\u672A\u68C0\u6D4B\u5230\u94B1\u5305\u6269\u5C55\uFF0C\u8BF7\u5B89\u88C5 Bitget Wallet \u6216 Phantom \u6269\u5C55\u540E\u5237\u65B0\u672C\u9875\u3002";
  return `${base} \u4ECD\u8FDE\u4E0D\u4E0A\u53EF\u6253\u5F00 diagnose.html \u67E5\u770B\u94B1\u5305\u5B9E\u9645\u66B4\u9732\u7684\u63A5\u53E3\u3002`;
}
async function connectWallet({ choose } = {}) {
  const options = detectProviders();
  if (options.length === 0) {
    const env = describeEnvironment();
    const injected = env.candidates.map((item) => item.path).join("\u3001");
    throw new Error(
      injected ? `\u68C0\u6D4B\u5230\u6CE8\u5165\u5BF9\u8C61\uFF08${injected}\uFF09\uFF0C\u4F46\u90FD\u6CA1\u6709\u53EF\u7528\u7684 connect/request \u65B9\u6CD5\u3002\u8BF7\u6253\u5F00 diagnose.html \u67E5\u770B\u8BE6\u7EC6\u63A5\u53E3\uFF0C\u6216\u6539\u7528 Wallet Standard \u94B1\u5305\u3002` : walletHint()
    );
  }
  let option = options[0];
  if (options.length > 1) {
    option = choose ? await choose(options) : options[0];
    if (!option) throw new Error("\u672A\u9009\u62E9\u94B1\u5305");
  }
  if (option.kind === "standard") {
    const wallet = option.wallet;
    const connected = await wallet.features["standard:connect"].connect();
    const account = connected?.accounts?.[0] ?? wallet.accounts?.[0];
    if (!account?.address) throw new Error(`${option.label} \u672A\u8FD4\u56DE\u8D26\u6237`);
    const session2 = { kind: "standard", label: option.label, wallet, account, publicKey: new PublicKey(account.address) };
    rememberWallet(session2);
    return session2;
  }
  const provider = option.provider;
  let response;
  if (typeof provider.connect === "function") {
    response = await provider.connect();
  } else if (typeof provider.request === "function") {
    response = await provider.request({ method: "connect" });
  } else {
    throw new Error(`${option.label} \u4E0D\u652F\u6301\u8FDE\u63A5`);
  }
  const raw = response?.publicKey ?? provider.publicKey ?? response;
  if (!raw) throw new Error(`${option.label} \u8FDE\u63A5\u5931\u8D25`);
  const address = raw.toBase58 ? raw.toBase58() : String(raw);
  const session = { kind: "legacy", label: option.label, path: option.path, provider, publicKey: new PublicKey(address) };
  rememberWallet(session);
  return session;
}
var SESSION_KEY = "btf.wallet";
function readSavedWallet() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    return saved?.address ? saved : null;
  } catch {
    return null;
  }
}
function rememberWallet(wallet) {
  try {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        kind: wallet.kind,
        label: wallet.label,
        path: wallet.path ?? "",
        address: wallet.publicKey.toBase58()
      })
    );
  } catch {
  }
}
async function silentConnect(option, address) {
  if (option.kind === "standard") {
    const wallet = option.wallet;
    const known = (wallet.accounts ?? []).find((account) => account.address === address);
    if (known) {
      return { kind: "standard", label: option.label, wallet, account: known, publicKey: new PublicKey(address) };
    }
    try {
      const connected = await wallet.features?.["standard:connect"]?.connect?.({ silent: true });
      const account = (connected?.accounts ?? wallet.accounts ?? []).find((item) => item.address === address);
      return account ? { kind: "standard", label: option.label, wallet, account, publicKey: new PublicKey(address) } : null;
    } catch {
      return null;
    }
  }
  const provider = option.provider;
  const current = provider.publicKey;
  const currentAddress = current?.toBase58 ? current.toBase58() : current ? String(current) : "";
  if (currentAddress) {
    return currentAddress === address ? { kind: "legacy", label: option.label, path: option.path, provider, publicKey: new PublicKey(address) } : null;
  }
  try {
    const response = typeof provider.connect === "function" ? await provider.connect({ onlyIfTrusted: true }) : typeof provider.request === "function" ? await provider.request({ method: "connect", params: { onlyIfTrusted: true } }) : null;
    const raw = response?.publicKey ?? provider.publicKey ?? response;
    const resolved = raw?.toBase58 ? raw.toBase58() : raw ? String(raw) : "";
    return resolved === address ? { kind: "legacy", label: option.label, path: option.path, provider, publicKey: new PublicKey(address) } : null;
  } catch {
    return null;
  }
}
function anyInjectedProvider() {
  for (const candidate of CANDIDATES) {
    try {
      if (candidate.get()) return true;
    } catch {
    }
  }
  const registry = window?.navigator?.wallets;
  return typeof registry?.get === "function" && registry.get().length > 0;
}
async function restoreWallet() {
  const saved = readSavedWallet();
  if (!saved) return null;
  const deadline = Date.now() + 1500;
  while (!anyInjectedProvider() && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const options = detectProviders();
  const preferred = options.filter(
    (option) => option.label === saved.label && (saved.kind === "standard" ? option.kind === "standard" : option.kind === "legacy" && (option.path === saved.path || !saved.path))
  );
  const sameLabel = options.filter((option) => option.label === saved.label && !preferred.includes(option));
  for (const option of [...preferred, ...sameLabel]) {
    try {
      const wallet = await silentConnect(option, saved.address);
      if (wallet) return wallet;
    } catch {
    }
  }
  return null;
}
async function signAndSend(connection, transaction, wallet, { signers = [] } = {}) {
  transaction.feePayer = wallet.publicKey;
  const latest = await connection.getLatestBlockhash("confirmed");
  transaction.recentBlockhash = latest.blockhash;
  transaction.lastValidBlockHeight = latest.lastValidBlockHeight;
  for (const signer of signers) {
    transaction.partialSign(signer);
  }
  const startSlot = await connection.getSlot("confirmed").catch(() => 0);
  let signature;
  try {
    signature = await requestSignature(connection, transaction, wallet);
  } catch (error) {
    if (!(error instanceof SignatureParseError)) throw error;
    signature = await findRecentSignature(connection, wallet.publicKey, startSlot);
  }
  const confirmation = await connection.confirmTransaction(
    { signature, blockhash: latest.blockhash, lastValidBlockHeight: latest.lastValidBlockHeight },
    "confirmed"
  );
  if (confirmation.value.err) {
    throw new Error(`\u4EA4\u6613\u5931\u8D25\uFF1A${JSON.stringify(confirmation.value.err)}`);
  }
  return signature;
}
async function findRecentSignature(connection, publicKey2, startSlot, timeoutMs = 9e4) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const signatures = await connection.getSignaturesForAddress(publicKey2, { limit: 5 });
      const hit = signatures.find((item) => !item.err && item.slot >= startSlot);
      if (hit) return hit.signature;
    } catch {
    }
    await new Promise((resolve) => setTimeout(resolve, 4e3));
  }
  throw new Error(
    "\u4EA4\u6613\u7ED3\u679C\u672A\u77E5\uFF1A\u94B1\u5305\u6CA1\u6709\u8FD4\u56DE\u53EF\u8BC6\u522B\u7684\u7B7E\u540D\uFF0C\u94FE\u4E0A\u4E5F\u6CA1\u627E\u5230\u65B0\u4EA4\u6613\u3002\u8BF7\u5230\u6D4F\u89C8\u5668\u67E5\u770B\u8BE5\u94B1\u5305\u7684\u6700\u8FD1\u4EA4\u6613\u540E\u518D\u51B3\u5B9A\u662F\u5426\u91CD\u8BD5\u3002"
  );
}
async function requestSignature(connection, transaction, wallet) {
  if (wallet.kind === "standard") {
    const features = wallet.wallet.features;
    const input = {
      account: wallet.account,
      chain: "solana:mainnet",
      transaction: new Uint8Array(transaction.serialize({ requireAllSignatures: false }))
    };
    if (features["solana:signAndSendTransaction"]) {
      const outputs2 = await features["solana:signAndSendTransaction"].signAndSendTransaction(input);
      const first2 = Array.isArray(outputs2) ? outputs2[0] : outputs2;
      return normalizeSignature(first2?.signature ?? first2);
    }
    const signFeature = features["solana:signTransaction"];
    if (!signFeature) throw new Error("\u8BE5\u94B1\u5305\u4E0D\u652F\u6301\u7B7E\u540D");
    const outputs = await signFeature.signTransaction(input);
    const first = Array.isArray(outputs) ? outputs[0] : outputs;
    if (!first?.signedTransaction) throw new Error("\u94B1\u5305\u672A\u8FD4\u56DE\u7B7E\u540D\u4EA4\u6613");
    const signed = VersionedTransaction.deserialize(new Uint8Array(first.signedTransaction));
    return connection.sendRawTransaction(signed.serialize(), { maxRetries: 3 });
  }
  const provider = wallet.provider;
  if (typeof provider.signTransaction === "function") {
    const signed = await provider.signTransaction(transaction);
    const raw = signed?.serialize ? signed.serialize() : signed;
    return connection.sendRawTransaction(raw, { maxRetries: 3 });
  }
  if (typeof provider.signAndSendTransaction === "function") {
    const result = await provider.signAndSendTransaction(transaction);
    return normalizeSignature(result);
  }
  if (typeof provider.request === "function") {
    const result = await provider.request({
      method: "signAndSendTransaction",
      params: { message: transaction.serialize({ requireAllSignatures: false }).toString("base64") }
    });
    return normalizeSignature(result);
  }
  throw new Error("\u8BE5\u94B1\u5305\u4E0D\u652F\u6301\u7B7E\u540D");
}
var SignatureParseError = class extends Error {
  constructor(message, bytes) {
    super(message);
    this.name = "SignatureParseError";
    this.bytes = bytes ?? null;
  }
};
function normalizeSignature(value, depth = 0) {
  if (value === null || value === void 0) throw new Error("\u94B1\u5305\u672A\u8FD4\u56DE\u7B7E\u540D");
  if (depth > 3) throw new SignatureParseError("\u65E0\u6CD5\u89E3\u6790\u94B1\u5305\u8FD4\u56DE\u7684\u7B7E\u540D");
  if (typeof value === "string") {
    const text = value.trim();
    if (/^[1-9A-HJ-NP-Za-km-z]{80,90}$/.test(text)) return text;
    if (/^[0-9a-fA-F]{128}$/.test(text)) {
      return encodeBase58(Uint8Array.from(text.match(/.{2}/g).map((pair) => parseInt(pair, 16))));
    }
    const bytes = decodeBase64(text);
    if (bytes && bytes.length === 64) return encodeBase58(bytes);
    if (bytes && bytes.length > 64) {
      throw new SignatureParseError("\u94B1\u5305\u8FD4\u56DE\u7684\u662F\u4EA4\u6613\u6570\u636E\u800C\u4E0D\u662F\u7B7E\u540D", bytes);
    }
    if (/^[1-9A-HJ-NP-Za-km-z]{60,90}$/.test(text)) return text;
    throw new SignatureParseError(`\u94B1\u5305\u8FD4\u56DE\u7684\u7B7E\u540D\u65E0\u6CD5\u8BC6\u522B\uFF08\u957F\u5EA6 ${text.length}\uFF09`);
  }
  if (value instanceof Uint8Array) {
    if (value.length === 64) return encodeBase58(value);
    if (value.length > 64) throw new SignatureParseError("\u94B1\u5305\u8FD4\u56DE\u7684\u662F\u4EA4\u6613\u6570\u636E\u800C\u4E0D\u662F\u7B7E\u540D", value);
    throw new SignatureParseError(`\u7B7E\u540D\u957F\u5EA6\u5F02\u5E38\uFF08${value.length} \u5B57\u8282\uFF09`);
  }
  if (Array.isArray(value)) return normalizeSignature(Uint8Array.from(value), depth + 1);
  if (typeof value === "object") {
    if (value.signature !== void 0) return normalizeSignature(value.signature, depth + 1);
    if (value.signedTransaction !== void 0 || value.transaction !== void 0) {
      const raw = value.signedTransaction ?? value.transaction;
      const bytes = raw instanceof Uint8Array ? raw : typeof raw === "string" ? decodeBase64(raw) : null;
      throw new SignatureParseError("\u94B1\u5305\u8FD4\u56DE\u4E86\u5DF2\u7B7E\u540D\u4EA4\u6613\u800C\u4E0D\u662F\u7B7E\u540D", bytes);
    }
  }
  throw new SignatureParseError("\u94B1\u5305\u672A\u8FD4\u56DE\u53EF\u7528\u7B7E\u540D");
}
function decodeBase64(text) {
  try {
    if (typeof Buffer !== "undefined") return Uint8Array.from(Buffer.from(text, "base64"));
    const binary = atob(text);
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  } catch {
    return null;
  }
}

// src/lib/tokenAccount.js
async function readTokenAmount(connection, address) {
  const info = await connection.getAccountInfo(address, "confirmed");
  if (!info || info.data.length < 72) return null;
  const view = new DataView(info.data.buffer, info.data.byteOffset + 64, 8);
  return view.getBigUint64(0, true);
}
async function readTokenAmountOrZero(connection, address) {
  try {
    const amount = await readTokenAmount(connection, address);
    return amount ?? 0n;
  } catch {
    return 0n;
  }
}

// src/lib/format.js
var DECIMALS = 9;
function formatTokens(value, decimals = DECIMALS, maxFractionDigits = 4) {
  const amount = BigInt(value);
  const negative = amount < 0n;
  const abs = negative ? -amount : amount;
  const divisor = 10n ** BigInt(decimals);
  const whole = abs / divisor;
  const fraction = abs % divisor;
  let text = withGrouping(whole);
  if (fraction > 0n && maxFractionDigits > 0) {
    let digits = fraction.toString().padStart(decimals, "0").slice(0, maxFractionDigits);
    digits = digits.replace(/0+$/, "");
    if (digits.length > 0) text += `.${digits}`;
  }
  return negative ? `-${text}` : text;
}
function withGrouping(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function parseTokens(text, decimals = DECIMALS, messages = {}) {
  const clean = String(text).trim().replace(/,/g, "");
  if (!/^\d*(\.\d*)?$/.test(clean) || clean === "" || clean === ".") {
    throw new Error(messages.invalid ?? "\u8BF7\u8F93\u5165\u6709\u6548\u6570\u91CF");
  }
  const [whole, fraction = ""] = clean.split(".");
  if (fraction.length > decimals) {
    throw new Error(messages.tooMany ?? `\u6700\u591A\u652F\u6301 ${decimals} \u4F4D\u5C0F\u6570`);
  }
  const padded = fraction.padEnd(decimals, "0");
  return BigInt(whole || "0") * 10n ** BigInt(decimals) + BigInt(padded || "0");
}
function formatBps(bps) {
  const value = Number(bps) / 100;
  const text = Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  return `${text}%`;
}
function formatDateTime(unixSeconds) {
  if (!unixSeconds) return "\u2014";
  const date = new Date(Number(unixSeconds) * 1e3);
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}
function shorten(address, head = 4, tail = 4) {
  if (!address) return "\u2014";
  return `${address.slice(0, head)}\u2026${address.slice(-tail)}`;
}

// src/lib/ui.js
function $(selector, root = document) {
  return root.querySelector(selector);
}
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs ?? {})) {
    if (value === null || value === void 0 || value === false) continue;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key === "html") node.innerHTML = value;
    else if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === "dataset") {
      Object.assign(node.dataset, value);
    } else {
      node.setAttribute(key, value === true ? "" : String(value));
    }
  }
  for (const child of children.flat()) {
    if (child === null || child === void 0 || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}
function toast(message, kind = "info", timeout = 5200) {
  const host = $("#toasts");
  if (!host) return;
  const item = el("div", { class: `toast toast--${kind}`, text: message });
  host.append(item);
  setTimeout(() => item.remove(), timeout);
}
function chooseWallet(options, labels = {}) {
  return new Promise((resolve) => {
    const overlay = el("div", { class: "modal" });
    const finish = (value) => {
      overlay.remove();
      resolve(value);
    };
    const card = el(
      "div",
      { class: "modal__card" },
      el("h2", { class: "modal__title", text: labels.title ?? "\u9009\u62E9\u94B1\u5305" }),
      el("p", { class: "modal__subtitle", text: labels.subtitle ?? "\u68C0\u6D4B\u5230\u591A\u4E2A\u94B1\u5305\uFF0C\u8BF7\u9009\u62E9\u672C\u6B21\u7528\u4E8E\u7B7E\u540D\u7684\u94B1\u5305\u3002" }),
      el(
        "div",
        { class: "stack" },
        options.map(
          (option) => el("button", { class: "btn btn--ghost", type: "button", onclick: () => finish(option) }, option.label)
        )
      ),
      el(
        "div",
        { class: "modal__actions" },
        el("button", { class: "btn btn--ghost", type: "button", onclick: () => finish(null) }, labels.cancel ?? "\u53D6\u6D88")
      )
    );
    overlay.append(card);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) finish(null);
    });
    document.body.append(overlay);
  });
}
function reviewTransaction({
  title,
  subtitle,
  rows = [],
  risks = [],
  confirmLabel = "\u5728\u94B1\u5305\u4E2D\u786E\u8BA4",
  cancelLabel = "\u53D6\u6D88",
  riskTitle = "\u98CE\u9669\u4E0E\u4E0D\u53EF\u9006\u6027"
}) {
  return new Promise((resolve) => {
    const overlay = el("div", { class: "modal" });
    const close = (value) => {
      overlay.remove();
      resolve(value);
    };
    const card = el(
      "div",
      { class: "modal__card" },
      el("h2", { class: "modal__title", text: title }),
      subtitle ? el("p", { class: "modal__subtitle", text: subtitle }) : null,
      el(
        "dl",
        { class: "kv" },
        rows.map(
          ([label, value]) => el("div", { class: "kv__row" }, el("dt", { text: label }), el("dd", { text: String(value) }))
        )
      ),
      risks.length ? el(
        "div",
        { class: "risk" },
        el("h3", { text: riskTitle }),
        el("ul", {}, risks.map((risk) => el("li", { text: risk })))
      ) : null,
      el(
        "div",
        { class: "modal__actions" },
        el("button", { class: "btn btn--ghost", type: "button", onclick: () => close(false) }, cancelLabel),
        el("button", { class: "btn", type: "button", onclick: () => close(true) }, confirmLabel)
      )
    );
    overlay.append(card);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close(false);
    });
    document.body.append(overlay);
  });
}
async function withBusy(button, task, busyLabel = "\u5904\u7406\u4E2D\u2026") {
  const original = button.textContent;
  button.disabled = true;
  button.textContent = busyLabel;
  try {
    return await task();
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
}
function setStatus(text, kind = "info") {
  const node = $("#status");
  if (!node) return;
  node.textContent = text;
  node.className = `status status--${kind}`;
}

export {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  u64,
  publicKey,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddressSync,
  Writer,
  Reader,
  discriminatorHex,
  encodeBase58,
  getConnection,
  detectProviders,
  walletHint,
  connectWallet,
  restoreWallet,
  signAndSend,
  readTokenAmountOrZero,
  formatTokens,
  parseTokens,
  formatBps,
  formatDateTime,
  shorten,
  $,
  el,
  toast,
  chooseWallet,
  reviewTransaction,
  withBusy,
  setStatus
};
//# sourceMappingURL=chunk-G3HNJYJA.js.map
