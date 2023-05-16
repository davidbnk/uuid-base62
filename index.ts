import uuid from 'uuid';
import baseX from 'base-x';

const BASE62 = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
const OUTPUT_LENGTH = 22;

export default class UUID62 {
	public v4() {
		const buffer = Buffer.alloc(16);
		const id = uuid.v4(null, buffer);
		return this.encode(id);
	}

	public encode(input: Buffer, encoding?: string) {
		encoding = encoding || 'hex';
		return ensureLength(BASE62.encode(input), OUTPUT_LENGTH);
	}
}

function ensureLength(input: string, targetLength: number) {
	input = input.toString();
	return `${'0'.repeat(32)}${input}`.slice(-targetLength);
}
