import * as uuid from 'uuid';
import baseX from 'base-x';

const BASE62 = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
const OUTPUT_LENGTH = 22;
const UUID_LENGTH = 32;

export default class UUID62 {
	public static v4() {
		const buffer = Buffer.alloc(16);
		const id = uuid.v4(null, buffer);
		return this.encode(id);
	}

	public static encode(input: Buffer) {
		return ensureLength(BASE62.encode(input), OUTPUT_LENGTH);
	}

	public static decode(input: string, encoding?: BufferEncoding) {
		encoding = encoding || 'hex';
		const decoded = BASE62.decode(input);
		const res = ensureLength(
			Buffer.from(decoded).toString(encoding),
			UUID_LENGTH
		);
		// insert dashes on return
		return `${res.slice(0, 8)}-${res.slice(8, 12)}-${res.slice(12, 16)}-${res.slice(16, 20)}-${res.slice(20)}`;
	}
}

function ensureLength(input: string, targetLength: number) {
	input = input.toString();
	return `${'0'.repeat(32)}${input}`.slice(-targetLength);
}
