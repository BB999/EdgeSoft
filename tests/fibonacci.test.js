const { fibonacci } = require('../src/mathUtils');

describe('fibonacci', () => {
  describe('フィボナッチ数列 - 基本ケース (Fibonacci sequence - Basic cases)', () => {
    test('should return correct Fibonacci numbers for small indices', () => {
      expect(fibonacci(0)).toBe(0);    // F(0) = 0
      expect(fibonacci(1)).toBe(1);    // F(1) = 1
      expect(fibonacci(2)).toBe(1);    // F(2) = 1
      expect(fibonacci(3)).toBe(2);    // F(3) = 2
      expect(fibonacci(4)).toBe(3);    // F(4) = 3
      expect(fibonacci(5)).toBe(5);    // F(5) = 5
      expect(fibonacci(6)).toBe(8);    // F(6) = 8
      expect(fibonacci(7)).toBe(13);   // F(7) = 13
      expect(fibonacci(8)).toBe(21);   // F(8) = 21
      expect(fibonacci(9)).toBe(34);   // F(9) = 34
      expect(fibonacci(10)).toBe(55);  // F(10) = 55
    });

    test('should return correct Fibonacci numbers for medium indices', () => {
      expect(fibonacci(15)).toBe(610);
      expect(fibonacci(20)).toBe(6765);
      expect(fibonacci(25)).toBe(75025);
    });
  });

  describe('大きなインデックスでのテスト (Large index testing)', () => {
    test('should handle larger Fibonacci numbers correctly', () => {
      expect(fibonacci(30)).toBe(832040);
      expect(fibonacci(35)).toBe(9227465);
      expect(fibonacci(40)).toBe(102334155);
    });

    test('should handle very large indices without overflow (if implementation supports)', () => {
      // これらのテストは実装によって BigInt を使うかもしれません
      expect(fibonacci(50)).toBe(12586269025);
      expect(fibonacci(60)).toBe(1548008755920);
    });
  });

  describe('パフォーマンステスト (Performance tests)', () => {
    test('should compute Fibonacci numbers efficiently', () => {
      const start = Date.now();
      fibonacci(40);
      const end = Date.now();
      expect(end - start).toBeLessThan(1000); // 1秒以内に計算完了
    });

    test('should handle repeated calls efficiently (memoization test)', () => {
      const start = Date.now();
      for (let i = 0; i < 100; i++) {
        fibonacci(30);
      }
      const end = Date.now();
      expect(end - start).toBeLessThan(100); // 100ms以内（メモ化があれば）
    });
  });

  describe('フィボナッチ数列の性質 (Fibonacci sequence properties)', () => {
    test('should satisfy Fibonacci recurrence relation F(n) = F(n-1) + F(n-2)', () => {
      for (let n = 2; n <= 20; n++) {
        expect(fibonacci(n)).toBe(fibonacci(n - 1) + fibonacci(n - 2));
      }
    });

    test('should have consecutive Fibonacci numbers that are coprime', () => {
      // 連続するフィボナッチ数は互いに素である
      for (let n = 1; n <= 15; n++) {
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        expect(gcd(fibonacci(n), fibonacci(n + 1))).toBe(1);
      }
    });
  });

  describe('エッジケース (Edge cases)', () => {
    test('should return number type', () => {
      expect(typeof fibonacci(5)).toBe('number');
      expect(typeof fibonacci(0)).toBe('number');
    });

    test('should handle base cases correctly', () => {
      expect(fibonacci(0)).toBe(0);
      expect(fibonacci(1)).toBe(1);
    });
  });

  describe('エラーハンドリング (Error handling)', () => {
    test('should throw error for negative indices', () => {
      expect(() => fibonacci(-1)).toThrow('Fibonacci is not defined for negative indices');
      expect(() => fibonacci(-5)).toThrow('Fibonacci is not defined for negative indices');
      expect(() => fibonacci(-100)).toThrow('Fibonacci is not defined for negative indices');
    });

    test('should throw error for non-integer indices', () => {
      expect(() => fibonacci(3.5)).toThrow('Fibonacci index must be a non-negative integer');
      expect(() => fibonacci(2.1)).toThrow('Fibonacci index must be a non-negative integer');
      expect(() => fibonacci(0.5)).toThrow('Fibonacci index must be a non-negative integer');
    });

    test('should throw error for non-numeric inputs', () => {
      expect(() => fibonacci('5')).toThrow('Input must be a number');
      expect(() => fibonacci(null)).toThrow('Input must be a number');
      expect(() => fibonacci(undefined)).toThrow('Input must be a number');
      expect(() => fibonacci({})).toThrow('Input must be a number');
      expect(() => fibonacci([])).toThrow('Input must be a number');
      expect(() => fibonacci(true)).toThrow('Input must be a number');
    });

    test('should throw error for extremely large indices', () => {
      expect(() => fibonacci(1000)).toThrow('Index too large, may cause performance issues or overflow');
    });

    test('should throw error when no argument provided', () => {
      expect(() => fibonacci()).toThrow('Fibonacci requires exactly one argument');
    });
  });

  describe('特別な値のテスト (Special value tests)', () => {
    test('should handle index 0 and 1 consistently', () => {
      expect(fibonacci(0)).not.toBe(fibonacci(1));
      expect(fibonacci(0)).toBe(0);
      expect(fibonacci(1)).toBe(1);
    });

    test('should return integers only', () => {
      for (let i = 0; i <= 20; i++) {
        expect(Number.isInteger(fibonacci(i))).toBe(true);
      }
    });
  });
});