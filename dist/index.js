"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = __importStar(require("uuid"));
const base_x_1 = __importDefault(require("base-x"));
const BASE62 = (0, base_x_1.default)('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
const OUTPUT_LENGTH = 22;
const UUID_LENGTH = 32;
class UUID62 {
    static v4() {
        const buffer = Buffer.alloc(16);
        const id = uuid.v4(null, buffer);
        return this.encode(id);
    }
    static encode(input) {
        return ensureLength(BASE62.encode(input), OUTPUT_LENGTH);
    }
    static decode(input, encoding) {
        encoding = encoding || 'hex';
        const decoded = BASE62.decode(input);
        const res = ensureLength(Buffer.from(decoded).toString(encoding), UUID_LENGTH);
        // insert dashes on return
        return `${res.slice(0, 8)}-${res.slice(8, 12)}-${res.slice(12, 16)}-${res.slice(16, 20)}-${res.slice(20)}`;
    }
}
exports.default = UUID62;
function ensureLength(input, targetLength) {
    input = input.toString();
    return `${'0'.repeat(32)}${input}`.slice(-targetLength);
}
