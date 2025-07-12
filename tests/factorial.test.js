const { factorial } = require('../src/mathUtils');

describe('factorial', () => {
  describe('正常ケース (Normal cases)', () => {
    test('0! should return 1', () => {
      expect(factorial(0)).toBe(1);
    });

    test('1! should return 1', () => {
      expect(factorial(1)).toBe(1);
    });

    test('5! should return 120', () => {
      expect(factorial(5)).toBe(120);
    });

    test('10! should return 3628800', () => {
      expect(factorial(10)).toBe(3628800);
    });

    test('3! should return 6', () => {
      expect(factorial(3)).toBe(6);
    });

    test('4! should return 24', () => {
      expect(factorial(4)).toBe(24);
    });
  });

  describe('エッジケース (Edge cases)', () => {
    test('should handle large numbers correctly', () => {
      expect(factorial(12)).toBe(479001600);
    });

    test('should return correct type (number)', () => {
      expect(typeof factorial(5)).toBe('number');
    });
  });

  describe('エラーハンドリング (Error handling)', () => {
    test('should throw error for negative numbers', () => {
      expect(() => factorial(-1)).toThrow('Factorial is not defined for negative numbers');
      expect(() => factorial(-5)).toThrow('Factorial is not defined for negative numbers');
    });

    test('should throw error for non-integer numbers', () => {
      expect(() => factorial(3.5)).toThrow('Factorial is only defined for non-negative integers');
      expect(() => factorial(2.1)).toThrow('Factorial is only defined for non-negative integers');
    });

    test('should throw error for non-numeric inputs', () => {
      expect(() => factorial('5')).toThrow('Input must be a number');
      expect(() => factorial(null)).toThrow('Input must be a number');
      expect(() => factorial(undefined)).toThrow('Input must be a number');
      expect(() => factorial({})).toThrow('Input must be a number');
      expect(() => factorial([])).toThrow('Input must be a number');
    });

    test('should throw error for very large numbers to prevent overflow', () => {
      expect(() => factorial(200)).toThrow('Input too large, may cause overflow');
    });
  });
});