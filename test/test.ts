import assert from "assert";
import UUID62 from "../src";
import * as uuid from 'uuid';

const id = UUID62.v4();
console.log(id);
assert.equal(id.length, 22);
const decoded = UUID62.decode(id);
console.log(decoded);
assert.ok(uuid.validate(decoded));
