const { gcd } = require('../src/mathUtils');

describe('gcd', () => {
  describe('最大公約数 - 基本ケース (Greatest Common Divisor - Basic cases)', () => {
    test('should calculate GCD correctly for basic cases', () => {
      expect(gcd(12, 18)).toBe(6);
      expect(gcd(24, 36)).toBe(12);
      expect(gcd(48, 18)).toBe(6);
      expect(gcd(15, 25)).toBe(5);
      expect(gcd(21, 14)).toBe(7);
    });

    test('should handle cases where one number divides the other', () => {
      expect(gcd(12, 6)).toBe(6);
      expect(gcd(20, 5)).toBe(5);
      expect(gcd(100, 25)).toBe(25);
      expect(gcd(8, 4)).toBe(4);
    });

    test('should handle identical numbers', () => {
      expect(gcd(15, 15)).toBe(15);
      expect(gcd(7, 7)).toBe(7);
      expect(gcd(100, 100)).toBe(100);
    });
  });

  describe('特殊ケース (Special cases)', () => {
    test('should handle GCD with 0', () => {
      expect(gcd(0, 5)).toBe(5);
      expect(gcd(10, 0)).toBe(10);
      expect(gcd(0, 0)).toBe(0);
    });

    test('should handle GCD with 1', () => {
      expect(gcd(1, 5)).toBe(1);
      expect(gcd(7, 1)).toBe(1);
      expect(gcd(1, 1)).toBe(1);
    });

    test('should handle coprime numbers (GCD = 1)', () => {
      expect(gcd(17, 13)).toBe(1);  // 両方素数
      expect(gcd(25, 49)).toBe(1);  // 5²と7²
      expect(gcd(9, 16)).toBe(1);   // 3²と4²
      expect(gcd(15, 28)).toBe(1);  // 互いに素
    });
  });

  describe('大きな数でのテスト (Large number testing)', () => {
    test('should handle large numbers correctly', () => {
      expect(gcd(1071, 462)).toBe(21);
      expect(gcd(270, 192)).toBe(6);
      expect(gcd(1000, 750)).toBe(250);
      expect(gcd(12345, 54321)).toBe(3);
    });

    test('should handle very large numbers', () => {
      expect(gcd(123456789, 987654321)).toBe(9);
      expect(gcd(1000000, 500000)).toBe(500000);
    });
  });

  describe('順序の独立性 (Order independence)', () => {
    test('GCD should be commutative (gcd(a,b) = gcd(b,a))', () => {
      expect(gcd(12, 18)).toBe(gcd(18, 12));
      expect(gcd(48, 36)).toBe(gcd(36, 48));
      expect(gcd(100, 25)).toBe(gcd(25, 100));
      expect(gcd(7, 13)).toBe(gcd(13, 7));
    });
  });

  describe('エッジケース (Edge cases)', () => {
    test('should return number type', () => {
      expect(typeof gcd(12, 18)).toBe('number');
    });

    test('should handle negative numbers by using absolute values', () => {
      expect(gcd(-12, 18)).toBe(6);
      expect(gcd(12, -18)).toBe(6);
      expect(gcd(-12, -18)).toBe(6);
      expect(gcd(-15, -25)).toBe(5);
    });
  });

  describe('エラーハンドリング (Error handling)', () => {
    test('should throw error for non-integer numbers', () => {
      expect(() => gcd(3.5, 7)).toThrow('GCD is only defined for integers');
      expect(() => gcd(12, 8.5)).toThrow('GCD is only defined for integers');
      expect(() => gcd(2.1, 4.7)).toThrow('GCD is only defined for integers');
    });

    test('should throw error for non-numeric inputs', () => {
      expect(() => gcd('5', 10)).toThrow('Both inputs must be numbers');
      expect(() => gcd(15, '8')).toThrow('Both inputs must be numbers');
      expect(() => gcd(null, 5)).toThrow('Both inputs must be numbers');
      expect(() => gcd(10, undefined)).toThrow('Both inputs must be numbers');
      expect(() => gcd({}, [])).toThrow('Both inputs must be numbers');
    });

    test('should throw error when arguments are missing', () => {
      expect(() => gcd(5)).toThrow('GCD requires exactly two arguments');
      expect(() => gcd()).toThrow('GCD requires exactly two arguments');
    });

    test('should throw error for extremely large numbers', () => {
      expect(() => gcd(Number.MAX_SAFE_INTEGER + 1, 5)).toThrow('Input too large for reliable integer calculation');
      expect(() => gcd(5, Number.MAX_SAFE_INTEGER + 1)).toThrow('Input too large for reliable integer calculation');
    });
  });
});