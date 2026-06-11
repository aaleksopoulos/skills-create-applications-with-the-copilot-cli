"use strict";

const { expect } = require('chai');
const path = require('path');
const calculator = require(path.resolve(__dirname, '..', 'calculator'));

describe('Calculator core functions', () => {
  describe('addition', () => {
    it('adds 2 + 3 -> 5 (example from image)', () => {
      expect(calculator.add(2, 3)).to.equal(5);
    });
  });

  describe('subtraction', () => {
    it('subtracts 10 - 4 -> 6 (example from image)', () => {
      expect(calculator.subtract(10, 4)).to.equal(6);
    });
  });

  describe('multiplication', () => {
    it('multiplies 45 * 2 -> 90 (example from image)', () => {
      expect(calculator.multiply(45, 2)).to.equal(90);
    });
  });

  describe('division', () => {
    it('divides 20 / 5 -> 4 (example from image)', () => {
      expect(calculator.divide(20, 5)).to.equal(4);
    });

    it('handles floating point division', () => {
      expect(calculator.divide(1, 3)).to.be.closeTo(1/3, 1e-12);
    });

    it('throws on division by zero', () => {
      expect(() => calculator.divide(5, 0)).to.throw(/division by zero/i);
    });
  });

  describe('additional edge cases', () => {
    it('supports negative numbers', () => {
      expect(calculator.add(-2, -3)).to.equal(-5);
      expect(calculator.subtract(-2, 3)).to.equal(-5);
    });

    it('supports decimals', () => {
      expect(calculator.add(0.1, 0.2)).to.be.closeTo(0.3, 1e-12);
    });
  });
});
