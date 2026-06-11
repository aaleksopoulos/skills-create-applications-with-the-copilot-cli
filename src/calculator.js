#!/usr/bin/env node
"use strict";

/**
 * CLI Calculator
 * Supported operations (exported functions and CLI):
 *  - add       (aliases: add, +)
 *  - subtract  (aliases: subtract, -)
 *  - multiply  (aliases: multiply, x, *, times)
 *  - divide    (aliases: divide, /)
 *
 * The module exports: add, subtract, multiply, divide
 * The CLI runs only when executed directly (require.main === module)
 */

const { add, subtract, multiply, divide } = require('./calculator-core');

function usage(errMsg) {
  if (errMsg) console.error(`Error: ${errMsg}`);
  console.error('Usage: node src/calculator.js <operation> <number1> <number2>');
  console.error('Operations: add | +, subtract | -, multiply | x | * | times, divide | /');
  process.exit(1);
}

function normalizeOp(o) {
  return String(o || '').toLowerCase();
}
function matches(op, list) {
  return list.includes(op);
}

if (require.main === module) {
  const [, , opRaw, aRaw, bRaw] = process.argv;
  if (!opRaw || !aRaw || !bRaw) usage('operation and two numeric arguments are required');

  const op = normalizeOp(opRaw);
  const a = Number(aRaw);
  const b = Number(bRaw);
  if (Number.isNaN(a) || Number.isNaN(b)) usage('both arguments must be valid numbers');

  try {
    let result;
    if (matches(op, ['add', '+'])) result = add(a, b);
    else if (matches(op, ['subtract', '-'])) result = subtract(a, b);
    else if (matches(op, ['multiply', 'x', '*', 'times'])) result = multiply(a, b);
    else if (matches(op, ['divide', '/'])) result = divide(a, b);
    else usage(`unknown operation '${opRaw}'`);

    if (Number.isFinite(result)) {
      const out = Number.isInteger(result) ? String(result) : String(Number(result.toPrecision(12))).replace(/(?:\.\d*?)0+$/, (m) => m.replace(/0+$/, ''));
      console.log(out);
      process.exit(0);
    } else {
      console.error('Error: result is not a finite number');
      process.exit(4);
    }
  } catch (err) {
    if (err && /division by zero/i.test(String(err.message))) {
      console.error('Error: division by zero');
      process.exit(2);
    }
    console.error('Unexpected error:', err.message || err);
    process.exit(3);
  }
}

module.exports = { add, subtract, multiply, divide };
