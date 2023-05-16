"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
const base_x_1 = __importDefault(require("base-x"));
const BASE62 = (0, base_x_1.default)('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
const OUTPUT_LENGTH = 22;
class UUID62 {
    v4() {
        const buffer = Buffer.alloc(16);
        const id = uuid_1.default.v4(null, buffer);
        return this.encode(id);
    }
    encode(input, encoding) {
        encoding = encoding || 'hex';
        return ensureLength(BASE62.encode(input), OUTPUT_LENGTH);
    }
}
exports.default = UUID62;
function ensureLength(input, targetLength) {
    input = input.toString();
    return `${'0'.repeat(32)}${input}`.slice(-targetLength);
}
