const { isPrime } = require('../src/mathUtils');

describe('isPrime', () => {
  describe('素数判定 - 正常ケース (Prime number detection - Normal cases)', () => {
    test('should return true for prime numbers', () => {
      expect(isPrime(2)).toBe(true);   // 最小の素数
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
      expect(isPrime(13)).toBe(true);
      expect(isPrime(17)).toBe(true);
      expect(isPrime(19)).toBe(true);
      expect(isPrime(23)).toBe(true);
      expect(isPrime(29)).toBe(true);
    });

    test('should return false for non-prime numbers', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(1)).toBe(false);   // 1は素数ではない
      expect(isPrime(4)).toBe(false);   // 2×2
      expect(isPrime(6)).toBe(false);   // 2×3
      expect(isPrime(8)).toBe(false);   // 2×4
      expect(isPrime(9)).toBe(false);   // 3×3
      expect(isPrime(10)).toBe(false);  // 2×5
      expect(isPrime(12)).toBe(false);  // 3×4
      expect(isPrime(15)).toBe(false);  // 3×5
      expect(isPrime(21)).toBe(false);  // 3×7
      expect(isPrime(25)).toBe(false);  // 5×5
    });
  });

  describe('大きな数での判定 (Large number testing)', () => {
    test('should handle larger prime numbers correctly', () => {
      expect(isPrime(97)).toBe(true);
      expect(isPrime(101)).toBe(true);
      expect(isPrime(103)).toBe(true);
      expect(isPrime(107)).toBe(true);
      expect(isPrime(109)).toBe(true);
    });

    test('should handle larger composite numbers correctly', () => {
      expect(isPrime(100)).toBe(false);  // 10×10
      expect(isPrime(99)).toBe(false);   // 9×11
      expect(isPrime(98)).toBe(false);   // 2×49
      expect(isPrime(102)).toBe(false);  // 2×51
      expect(isPrime(104)).toBe(false);  // 8×13
    });

    test('should handle very large prime numbers', () => {
      expect(isPrime(982451653)).toBe(true);  // 大きな素数
    });
  });

  describe('エッジケース (Edge cases)', () => {
    test('should return boolean type', () => {
      expect(typeof isPrime(2)).toBe('boolean');
      expect(typeof isPrime(4)).toBe('boolean');
    });

    test('should handle perfect squares correctly', () => {
      expect(isPrime(49)).toBe(false);   // 7×7
      expect(isPrime(64)).toBe(false);   // 8×8
      expect(isPrime(81)).toBe(false);   // 9×9
      expect(isPrime(121)).toBe(false);  // 11×11
    });
  });

  describe('エラーハンドリング (Error handling)', () => {
    test('should throw error for negative numbers', () => {
      expect(() => isPrime(-1)).toThrow('Prime check is not defined for negative numbers');
      expect(() => isPrime(-5)).toThrow('Prime check is not defined for negative numbers');
      expect(() => isPrime(-100)).toThrow('Prime check is not defined for negative numbers');
    });

    test('should throw error for non-integer numbers', () => {
      expect(() => isPrime(3.5)).toThrow('Prime check is only defined for integers');
      expect(() => isPrime(2.1)).toThrow('Prime check is only defined for integers');
      expect(() => isPrime(0.5)).toThrow('Prime check is only defined for integers');
    });

    test('should throw error for non-numeric inputs', () => {
      expect(() => isPrime('5')).toThrow('Input must be a number');
      expect(() => isPrime(null)).toThrow('Input must be a number');
      expect(() => isPrime(undefined)).toThrow('Input must be a number');
      expect(() => isPrime({})).toThrow('Input must be a number');
      expect(() => isPrime([])).toThrow('Input must be a number');
      expect(() => isPrime(true)).toThrow('Input must be a number');
    });

    test('should throw error for extremely large numbers', () => {
      expect(() => isPrime(Number.MAX_SAFE_INTEGER + 1)).toThrow('Input too large for reliable integer calculation');
    });
  });
});