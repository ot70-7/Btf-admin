import {
  publicKey
} from "./chunk-ONAMLBMU.js";
import {
  __toESM,
  require_Layout
} from "./chunk-WXGNZ34X.js";

// node_modules/@solana/spl-token/lib/esm/serialization.js
var import_buffer_layout = __toESM(require_Layout(), 1);
var COptionPublicKeyLayout = class extends import_buffer_layout.Layout {
  constructor(property) {
    super(-1, property);
    this.publicKeyLayout = publicKey();
  }
  decode(buffer, offset = 0) {
    const option = buffer[offset];
    if (option === 0) {
      return null;
    }
    return this.publicKeyLayout.decode(buffer, offset + 1);
  }
  encode(src, buffer, offset = 0) {
    if (src === null) {
      buffer[offset] = 0;
      return 1;
    } else {
      buffer[offset] = 1;
      this.publicKeyLayout.encode(src, buffer, offset + 1);
      return 33;
    }
  }
  getSpan(buffer, offset = 0) {
    if (buffer) {
      const option = buffer[offset];
      return option === 0 ? 1 : 1 + this.publicKeyLayout.span;
    }
    throw new RangeError("Buffer must be provided");
  }
};

export {
  COptionPublicKeyLayout
};
//# sourceMappingURL=chunk-IQQJNEIU.js.map
