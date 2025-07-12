const { reverse, capitalize, count, truncate } = require('./src/stringUtils');

describe('String Utilities', () => {
  describe('reverse(str)', () => {
    test('reverses a simple string', () => {
      expect(reverse('hello')).toBe('olleh');
    });

    test('reverses a string with spaces', () => {
      expect(reverse('hello world')).toBe('dlrow olleh');
    });

    test('reverses an empty string', () => {
      expect(reverse('')).toBe('');
    });

    test('reverses a single character', () => {
      expect(reverse('a')).toBe('a');
    });

    test('reverses Unicode characters', () => {
      expect(reverse('こんにちは')).toBe('はちにんこ');
    });

    test('handles numbers and symbols', () => {
      expect(reverse('123!@#')).toBe('#@!321');
    });

    test('throws error for non-string input', () => {
      expect(() => reverse(null)).toThrow();
      expect(() => reverse(undefined)).toThrow();
      expect(() => reverse(123)).toThrow();
    });
  });

  describe('capitalize(str)', () => {
    test('capitalizes first letter of each word', () => {
      expect(capitalize('hello world')).toBe('Hello World');
    });

    test('handles single word', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    test('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    test('handles already capitalized words', () => {
      expect(capitalize('Hello World')).toBe('Hello World');
    });

    test('handles mixed case', () => {
      expect(capitalize('hELLo WoRLD')).toBe('HELLO WORLD');
    });

    test('handles multiple spaces', () => {
      expect(capitalize('hello  world   test')).toBe('Hello  World   Test');
    });

    test('handles special characters', () => {
      expect(capitalize('hello-world_test')).toBe('Hello-World_Test');
    });

    test('handles Unicode characters', () => {
      expect(capitalize('こんにちは 世界')).toBe('こんにちは 世界');
    });

    test('handles strings starting with numbers', () => {
      expect(capitalize('123hello world')).toBe('123hello World');
    });

    test('throws error for non-string input', () => {
      expect(() => capitalize(null)).toThrow();
      expect(() => capitalize(undefined)).toThrow();
      expect(() => capitalize(123)).toThrow();
    });
  });

  describe('count(str, char)', () => {
    test('counts single character occurrences', () => {
      expect(count('hello', 'l')).toBe(2);
    });

    test('counts character not in string', () => {
      expect(count('hello', 'x')).toBe(0);
    });

    test('counts in empty string', () => {
      expect(count('', 'a')).toBe(0);
    });

    test('is case sensitive', () => {
      expect(count('Hello', 'h')).toBe(0);
      expect(count('Hello', 'H')).toBe(1);
    });

    test('counts spaces', () => {
      expect(count('hello world', ' ')).toBe(1);
    });

    test('counts all same characters', () => {
      expect(count('aaaa', 'a')).toBe(4);
    });

    test('counts Unicode characters', () => {
      expect(count('こんにちはこん', 'こ')).toBe(2);
    });

    test('throws error for multi-character search', () => {
      expect(() => count('hello', 'll')).toThrow();
    });

    test('throws error for non-string inputs', () => {
      expect(() => count(null, 'a')).toThrow();
      expect(() => count('hello', null)).toThrow();
      expect(() => count(123, 'a')).toThrow();
    });
  });

  describe('truncate(str, length)', () => {
    test('truncates long string with ellipsis', () => {
      expect(truncate('hello world', 8)).toBe('hello...');
    });

    test('returns string unchanged if shorter than length', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });

    test('returns string unchanged if equal to length', () => {
      expect(truncate('hello', 5)).toBe('hello');
    });

    test('handles empty string', () => {
      expect(truncate('', 5)).toBe('');
    });

    test('handles length 0', () => {
      expect(truncate('hello', 0)).toBe('...');
    });

    test('handles length 1', () => {
      expect(truncate('hello', 1)).toBe('...');
    });

    test('handles length 2', () => {
      expect(truncate('hello', 2)).toBe('...');
    });

    test('handles length 3', () => {
      expect(truncate('hello', 3)).toBe('...');
    });

    test('handles minimum truncation length', () => {
      expect(truncate('hello world', 4)).toBe('h...');
    });

    test('handles Unicode characters', () => {
      expect(truncate('こんにちは世界', 4)).toBe('こ...');
    });

    test('throws error for negative length', () => {
      expect(() => truncate('hello', -1)).toThrow();
    });

    test('throws error for non-integer length', () => {
      expect(() => truncate('hello', 3.5)).toThrow();
      expect(() => truncate('hello', 'abc')).toThrow();
    });

    test('throws error for non-string input', () => {
      expect(() => truncate(null, 5)).toThrow();
      expect(() => truncate(undefined, 5)).toThrow();
      expect(() => truncate(123, 5)).toThrow();
    });
  });
});