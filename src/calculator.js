#!/usr/bin/env node
"use strict";

/**
 * CLI Calculator
 * Supported operations (exported functions and CLI):
 *  - addition      (aliases: add, +)
 *  - subtraction   (aliases: subtract, -)
 *  - multiplication(aliases: multiply, x, *, times)
 *  - division      (aliases: divide, /)
 *
 * The module exports: addition, subtraction, multiplication, division
 * The CLI runs only when executed directly (require.main === module)
 */

const { add, subtract, multiply, divide, modulo: moduloCore, power: powerCore, squareRoot: squareRootCore } = require('./calculator-core');

// Provide the requested function names as aliases to the core implementations
const addition = add;
const subtraction = subtract;
const multiplication = multiply;
const division = divide;
const modulo = moduloCore;
const power = powerCore;
const squareRoot = squareRootCore;


function usage(errMsg) {
  if (errMsg) console.error(`Error: ${errMsg}`);
  console.error('Usage: node src/calculator.js <operation> <number1> [number2]');
  console.error('Binary operations (require two numbers): add | +, subtract | -, multiply | x | * | times, divide | /, modulo | % , power | pow | exponentiation');
  console.error('Unary operations (require one number): sqrt | squareroot | squareRoot');
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
  if (!opRaw) usage('operation is required');

  const op = normalizeOp(opRaw);
  const a = aRaw !== undefined ? Number(aRaw) : NaN;
  const b = bRaw !== undefined ? Number(bRaw) : NaN;

  const unaryOps = ['sqrt', 'squareroot', 'squareroot'];

  try {
    let result;

    if (matches(op, ['sqrt', 'squareroot', 'squareroot'])) {
      if (aRaw === undefined) usage('sqrt requires one numeric argument');
      if (Number.isNaN(a)) usage('argument must be a valid number');
      result = squareRoot(a);
    } else {
      if (!aRaw || !bRaw) usage('operation and two numeric arguments are required');
      if (Number.isNaN(a) || Number.isNaN(b)) usage('both arguments must be valid numbers');

      if (matches(op, ['add', '+'])) result = add(a, b);
      else if (matches(op, ['subtract', '-'])) result = subtract(a, b);
      else if (matches(op, ['multiply', 'x', '*', 'times'])) result = multiply(a, b);
      else if (matches(op, ['divide', '/'])) result = divide(a, b);
      else if (matches(op, ['modulo', '%'])) result = modulo(a, b);
      else if (matches(op, ['power', 'pow', 'exponentiation'])) result = power(a, b);
      else usage(`unknown operation '${opRaw}'`);
    }

    if (Number.isFinite(result)) {
      const out = Number.isInteger(result) ? String(result) : String(Number(result.toPrecision(12))).replace(/(?:\.\d*?)0+$/, (m) => m.replace(/0+$/, ''));
      console.log(out);
      process.exit(0);
    } else {
      console.error('Error: result is not a finite number');
      process.exit(4);
    }
  } catch (err) {
    const msg = String(err && err.message ? err.message : err);
    if (/division by zero/i.test(msg)) {
      console.error('Error: division by zero');
      process.exit(2);
    }
    if (/modulo by zero/i.test(msg)) {
      console.error('Error: modulo by zero');
      process.exit(2);
    }
    if (/negative/i.test(msg)) {
      console.error('Error: negative input for square root');
      process.exit(2);
    }
    console.error('Unexpected error:', msg);
    process.exit(3);
  }
}

module.exports = { addition, subtraction, multiplication, division, modulo, power, squareRoot };
