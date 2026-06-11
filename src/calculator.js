#!/usr/bin/env node
"use strict";

/**
 * CLI Calculator
 * Supported operations:
 *  - add       (aliases: add, +)
 *  - subtract  (aliases: subtract, -)
 *  - multiply  (aliases: multiply, x, *, times)
 *  - divide    (aliases: divide, /)
 *
 * Usage examples:
 *   node src/calculator.js add 2 3        # -> 5
 *   node src/calculator.js subtract 5 2   # -> 3
 *   node src/calculator.js multiply 4 3   # -> 12
 *   node src/calculator.js divide 8 2     # -> 4
 */

const [, , opRaw, aRaw, bRaw] = process.argv;

function usage(errMsg) {
  if (errMsg) console.error(`Error: ${errMsg}`);
  console.error('Usage: node src/calculator.js <operation> <number1> <number2>');
  console.error('Operations: add | +, subtract | -, multiply | x | * | times, divide | /');
  process.exit(1);
}

if (!opRaw || !aRaw || !bRaw) usage('operation and two numeric arguments are required');

const op = opRaw.toLowerCase();
const a = Number(aRaw);
const b = Number(bRaw);

if (Number.isNaN(a) || Number.isNaN(b)) usage('both arguments must be valid numbers');

function isMultiply(o) {
  return ['multiply', 'x', '*', 'times'].includes(o);
}
function isAdd(o) {
  return ['add', '+'].includes(o);
}
function isSubtract(o) {
  return ['subtract', '-'].includes(o);
}
function isDivide(o) {
  return ['divide', '/'].includes(o);
}

let result;
try {
  if (isAdd(op)) {
    result = a + b;
  } else if (isSubtract(op)) {
    result = a - b;
  } else if (isMultiply(op)) {
    result = a * b;
  } else if (isDivide(op)) {
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(2);
    }
    result = a / b;
  } else {
    usage(`unknown operation '${opRaw}'`);
  }
} catch (err) {
  console.error('Unexpected error:', err.message || err);
  process.exit(3);
}

// Print result with reasonable precision for floating point results
if (Number.isFinite(result)) {
  // Trim trailing zeros for nicer output
  const asString = Number.isInteger(result) ? String(result) : String(Number(result.toPrecision(12))).replace(/(?:\.\d*?)0+$/, (m) => m.replace(/0+$/, ''));
  console.log(asString);
  process.exit(0);
} else {
  console.error('Error: result is not a finite number');
  process.exit(4);
}
