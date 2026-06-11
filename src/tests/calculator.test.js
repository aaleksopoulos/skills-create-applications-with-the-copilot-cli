"use strict";

const { expect } = require('chai');
const path = require('path');
const calculator = require(path.resolve(__dirname, '..', 'calculator'));

describe('Calculator core functions', () => {
  describe('addition', () => {
    it('adds 2 + 3 -> 5 (example from image)', () => {
      expect(calculator.addition(2, 3)).to.equal(5);
    });
  });

  describe('subtraction', () => {
    it('subtracts 10 - 4 -> 6 (example from image)', () => {
      expect(calculator.subtraction(10, 4)).to.equal(6);
    });
  });

  describe('multiplication', () => {
    it('multiplies 45 * 2 -> 90 (example from image)', () => {
      expect(calculator.multiplication(45, 2)).to.equal(90);
    });
  });

  describe('division', () => {
    it('divides 20 / 5 -> 4 (example from image)', () => {
      expect(calculator.division(20, 5)).to.equal(4);
    });

    it('handles floating point division', () => {
      expect(calculator.division(1, 3)).to.be.closeTo(1/3, 1e-12);
    });

    it('throws on division by zero', () => {
      expect(() => calculator.division(5, 0)).to.throw(/division by zero/i);
    });
  });

  describe('new operations (extended)', () => {
    it('modulo: 5 % 2 -> 1', () => {
      expect(calculator.modulo(5, 2)).to.equal(1);
    });

    it('power: 2 ^ 3 -> 8', () => {
      expect(calculator.power(2, 3)).to.equal(8);
    });

    it('squareRoot: sqrt(16) -> 4', () => {
      expect(calculator.squareRoot(16)).to.equal(4);
    });

    it('throws on modulo by zero', () => {
      expect(() => calculator.modulo(5, 0)).to.throw(/modulo by zero/i);
    });

    it('throws on negative square root', () => {
      expect(() => calculator.squareRoot(-4)).to.throw(/negative/i);
    });
  });

  describe('additional edge cases', () => {
    it('supports negative numbers', () => {
      expect(calculator.addition(-2, -3)).to.equal(-5);
      expect(calculator.subtraction(-2, 3)).to.equal(-5);
    });

    it('supports decimals', () => {
      expect(calculator.addition(0.1, 0.2)).to.be.closeTo(0.3, 1e-12);
    });
  });
});
