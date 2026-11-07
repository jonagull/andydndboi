// Run: node src/pricing.check.js
import assert from 'node:assert/strict'
import { quote, isoInDays } from './pricing.js'

assert.deepEqual(quote('oneshot', '2026-11-14'), { price: 3900 })
assert.deepEqual(quote('campaign', '2027-02-01'), { price: 2900 })
assert.equal(quote('guild', '2026-11-14'), null)
assert.equal(quote('oneshot', ''), null)
assert.equal(isoInDays(3, new Date(2026, 11, 30)), '2027-01-02')
console.log('pricing ok')
