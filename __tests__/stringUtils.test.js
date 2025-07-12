const { reverse, capitalize, count, truncate } = require('../src/stringUtils');

describe('String Utility Functions', () => {
  
  describe('reverse(str)', () => {
    test('reverses a simple string', () => {
      expect(reverse('hello')).toBe('olleh');
    });

    test('reverses a string with spaces', () => {
      expect(reverse('hello world')).toBe('dlrow olleh');
    });

    test('reverses a single character', () => {
      expect(reverse('a')).toBe('a');
    });

    test('returns empty string for empty input', () => {
      expect(reverse('')).toBe('');
    });

    test('reverses string with special characters', () => {
      expect(reverse('hello!@#')).toBe('#@!olleh');
    });

    test('reverses string with numbers', () => {
      expect(reverse('abc123')).toBe('321cba');
    });

    test('handles unicode characters', () => {
      expect(reverse('こんにちは')).toBe('はちにんこ');
    });

    test('throws error for non-string input', () => {
      expect(() => reverse(123)).toThrow('Input must be a string');
      expect(() => reverse(null)).toThrow('Input must be a string');
      expect(() => reverse(undefined)).toThrow('Input must be a string');
    });
  });

  describe('capitalize(str)', () => {
    test('capitalizes first letter of each word', () => {
      expect(capitalize('hello world')).toBe('Hello World');
    });

    test('handles single word', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    test('handles already capitalized text', () => {
      expect(capitalize('Hello World')).toBe('Hello World');
    });

    test('handles mixed case', () => {
      expect(capitalize('hELLo WoRLD')).toBe('Hello World');
    });

    test('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    test('handles string with multiple spaces', () => {
      expect(capitalize('hello   world')).toBe('Hello   World');
    });

    test('handles string with leading/trailing spaces', () => {
      expect(capitalize(' hello world ')).toBe(' Hello World ');
    });

    test('handles string with special characters', () => {
      expect(capitalize('hello-world')).toBe('Hello-World');
      expect(capitalize('hello_world')).toBe('Hello_World');
    });

    test('handles numbers', () => {
      expect(capitalize('hello123 world456')).toBe('Hello123 World456');
    });

    test('handles single character words', () => {
      expect(capitalize('a b c')).toBe('A B C');
    });

    test('throws error for non-string input', () => {
      expect(() => capitalize(123)).toThrow('Input must be a string');
      expect(() => capitalize(null)).toThrow('Input must be a string');
      expect(() => capitalize(undefined)).toThrow('Input must be a string');
    });
  });

  describe('count(str, char)', () => {
    test('counts occurrences of a character', () => {
      expect(count('hello', 'l')).toBe(2);
    });

    test('counts occurrences in longer string', () => {
      expect(count('mississippi', 's')).toBe(4);
    });

    test('returns 0 for non-existent character', () => {
      expect(count('hello', 'z')).toBe(0);
    });

    test('counts spaces', () => {
      expect(count('hello world', ' ')).toBe(1);
    });

    test('counts special characters', () => {
      expect(count('hello!world!', '!')).toBe(2);
    });

    test('is case sensitive', () => {
      expect(count('Hello', 'h')).toBe(0);
      expect(count('Hello', 'H')).toBe(1);
    });

    test('handles empty string', () => {
      expect(count('', 'a')).toBe(0);
    });

    test('handles empty character search', () => {
      expect(count('hello', '')).toBe(0);
    });

    test('counts unicode characters', () => {
      expect(count('こんにちは', 'ん')).toBe(1);
    });

    test('throws error for non-string input', () => {
      expect(() => count(123, 'a')).toThrow('Input must be a string');
      expect(() => count('hello', 123)).toThrow('Character must be a string');
    });

    test('throws error for multi-character search', () => {
      expect(() => count('hello', 'ab')).toThrow('Character must be a single character');
    });
  });

  describe('truncate(str, length)', () => {
    test('truncates string longer than specified length', () => {
      expect(truncate('hello world', 8)).toBe('hello...');
    });

    test('returns original string if shorter than length', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });

    test('returns original string if equal to length', () => {
      expect(truncate('hello', 5)).toBe('hello');
    });

    test('handles very short truncation', () => {
      expect(truncate('hello world', 3)).toBe('...');
    });

    test('handles truncation with length 0', () => {
      expect(truncate('hello', 0)).toBe('...');
    });

    test('handles empty string', () => {
      expect(truncate('', 5)).toBe('');
    });

    test('handles single character', () => {
      expect(truncate('a', 1)).toBe('a');
      expect(truncate('abc', 1)).toBe('...');
    });

    test('preserves spaces in truncation', () => {
      expect(truncate('hello world test', 10)).toBe('hello w...');
    });

    test('handles unicode characters', () => {
      expect(truncate('こんにちは世界', 3)).toBe('こんに...');
    });

    test('throws error for non-string input', () => {
      expect(() => truncate(123, 5)).toThrow('Input must be a string');
    });

    test('throws error for non-number length', () => {
      expect(() => truncate('hello', 'abc')).toThrow('Length must be a number');
    });

    test('throws error for negative length', () => {
      expect(() => truncate('hello', -1)).toThrow('Length must be non-negative');
    });

    test('handles fractional length (rounds down)', () => {
      expect(truncate('hello world', 5.9)).toBe('hello');
    });
  });
});