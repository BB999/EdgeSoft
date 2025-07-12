const { formatDate, addDays, daysBetween, isWeekend } = require('./dateUtils');

describe('Date Utilities', () => {
  describe('formatDate', () => {
    test('should format date with YYYY-MM-DD pattern', () => {
      const date = new Date('2023-12-25');
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2023-12-25');
    });

    test('should format date with DD/MM/YYYY pattern', () => {
      const date = new Date('2023-12-25');
      expect(formatDate(date, 'DD/MM/YYYY')).toBe('25/12/2023');
    });

    test('should format date with MM-DD-YYYY pattern', () => {
      const date = new Date('2023-01-05');
      expect(formatDate(date, 'MM-DD-YYYY')).toBe('01-05-2023');
    });

    test('should format date with custom separator', () => {
      const date = new Date('2023-12-25');
      expect(formatDate(date, 'YYYY.MM.DD')).toBe('2023.12.25');
    });

    test('should handle single digit months and days with padding', () => {
      const date = new Date('2023-01-05');
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2023-01-05');
    });

    test('should throw error for invalid date', () => {
      expect(() => formatDate(null, 'YYYY-MM-DD')).toThrow('Invalid date provided');
    });

    test('should throw error for invalid format string', () => {
      const date = new Date('2023-12-25');
      expect(() => formatDate(date, '')).toThrow('Invalid format string');
      expect(() => formatDate(date, null)).toThrow('Invalid format string');
    });

    test('should handle leap year correctly', () => {
      const date = new Date('2024-02-29');
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-02-29');
    });
  });

  describe('addDays', () => {
    test('should add positive days to date', () => {
      const date = new Date('2023-12-25');
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(30);
      expect(result.getMonth()).toBe(11); // December (0-indexed)
      expect(result.getFullYear()).toBe(2023);
    });

    test('should subtract days when negative number provided', () => {
      const date = new Date('2023-12-25');
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(20);
      expect(result.getMonth()).toBe(11); // December (0-indexed)
      expect(result.getFullYear()).toBe(2023);
    });

    test('should handle month overflow correctly', () => {
      const date = new Date('2023-12-30');
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(4);
      expect(result.getMonth()).toBe(0); // January (0-indexed)
      expect(result.getFullYear()).toBe(2024);
    });

    test('should handle year overflow correctly', () => {
      const date = new Date('2023-12-31');
      const result = addDays(date, 1);
      expect(result.getDate()).toBe(1);
      expect(result.getMonth()).toBe(0); // January (0-indexed)
      expect(result.getFullYear()).toBe(2024);
    });

    test('should handle leap year correctly', () => {
      const date = new Date('2024-02-28');
      const result = addDays(date, 1);
      expect(result.getDate()).toBe(29);
      expect(result.getMonth()).toBe(1); // February (0-indexed)
    });

    test('should handle month underflow correctly', () => {
      const date = new Date('2023-01-02');
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(28);
      expect(result.getMonth()).toBe(11); // December (0-indexed)
      expect(result.getFullYear()).toBe(2022);
    });

    test('should not modify original date object', () => {
      const originalDate = new Date('2023-12-25');
      const originalTime = originalDate.getTime();
      addDays(originalDate, 5);
      expect(originalDate.getTime()).toBe(originalTime);
    });

    test('should throw error for invalid date', () => {
      expect(() => addDays(null, 5)).toThrow('Invalid date provided');
      expect(() => addDays(undefined, 5)).toThrow('Invalid date provided');
    });

    test('should throw error for invalid days parameter', () => {
      const date = new Date('2023-12-25');
      expect(() => addDays(date, 'invalid')).toThrow('Days must be a number');
      expect(() => addDays(date, null)).toThrow('Days must be a number');
    });

    test('should handle zero days', () => {
      const date = new Date('2023-12-25');
      const result = addDays(date, 0);
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe('daysBetween', () => {
    test('should calculate positive days between dates', () => {
      const date1 = new Date('2023-12-20');
      const date2 = new Date('2023-12-25');
      expect(daysBetween(date1, date2)).toBe(5);
    });

    test('should calculate negative days when second date is earlier', () => {
      const date1 = new Date('2023-12-25');
      const date2 = new Date('2023-12-20');
      expect(daysBetween(date1, date2)).toBe(-5);
    });

    test('should return zero for same dates', () => {
      const date1 = new Date('2023-12-25');
      const date2 = new Date('2023-12-25');
      expect(daysBetween(date1, date2)).toBe(0);
    });

    test('should handle dates across different months', () => {
      const date1 = new Date('2023-11-28');
      const date2 = new Date('2023-12-05');
      expect(daysBetween(date1, date2)).toBe(7);
    });

    test('should handle dates across different years', () => {
      const date1 = new Date('2023-12-28');
      const date2 = new Date('2024-01-05');
      expect(daysBetween(date1, date2)).toBe(8);
    });

    test('should handle leap year correctly', () => {
      const date1 = new Date('2024-02-28');
      const date2 = new Date('2024-03-01');
      expect(daysBetween(date1, date2)).toBe(2); // includes leap day
    });

    test('should ignore time components and only consider dates', () => {
      const date1 = new Date('2023-12-25T10:30:00');
      const date2 = new Date('2023-12-25T18:45:00');
      expect(daysBetween(date1, date2)).toBe(0);
    });

    test('should handle large date differences', () => {
      const date1 = new Date('2020-01-01');
      const date2 = new Date('2023-12-31');
      expect(daysBetween(date1, date2)).toBe(1460); // 4 years including leap year
    });

    test('should throw error for invalid first date', () => {
      const date2 = new Date('2023-12-25');
      expect(() => daysBetween(null, date2)).toThrow('Invalid date provided');
      expect(() => daysBetween(undefined, date2)).toThrow('Invalid date provided');
    });

    test('should throw error for invalid second date', () => {
      const date1 = new Date('2023-12-25');
      expect(() => daysBetween(date1, null)).toThrow('Invalid date provided');
      expect(() => daysBetween(date1, undefined)).toThrow('Invalid date provided');
    });
  });

  describe('isWeekend', () => {
    test('should return true for Saturday', () => {
      const saturday = new Date('2023-12-23'); // This is a Saturday
      expect(isWeekend(saturday)).toBe(true);
    });

    test('should return true for Sunday', () => {
      const sunday = new Date('2023-12-24'); // This is a Sunday
      expect(isWeekend(sunday)).toBe(true);
    });

    test('should return false for Monday', () => {
      const monday = new Date('2023-12-25'); // This is a Monday
      expect(isWeekend(monday)).toBe(false);
    });

    test('should return false for Tuesday', () => {
      const tuesday = new Date('2023-12-26'); // This is a Tuesday
      expect(isWeekend(tuesday)).toBe(false);
    });

    test('should return false for Wednesday', () => {
      const wednesday = new Date('2023-12-27'); // This is a Wednesday
      expect(isWeekend(wednesday)).toBe(false);
    });

    test('should return false for Thursday', () => {
      const thursday = new Date('2023-12-28'); // This is a Thursday
      expect(isWeekend(thursday)).toBe(false);
    });

    test('should return false for Friday', () => {
      const friday = new Date('2023-12-29'); // This is a Friday
      expect(isWeekend(friday)).toBe(false);
    });

    test('should ignore time components', () => {
      const saturdayMorning = new Date('2023-12-23T06:00:00');
      const saturdayEvening = new Date('2023-12-23T22:00:00');
      expect(isWeekend(saturdayMorning)).toBe(true);
      expect(isWeekend(saturdayEvening)).toBe(true);
    });

    test('should handle dates across different years', () => {
      const newYearSaturday = new Date('2024-01-06'); // This is a Saturday
      const newYearSunday = new Date('2024-01-07'); // This is a Sunday
      expect(isWeekend(newYearSaturday)).toBe(true);
      expect(isWeekend(newYearSunday)).toBe(true);
    });

    test('should throw error for invalid date', () => {
      expect(() => isWeekend(null)).toThrow('Invalid date provided');
      expect(() => isWeekend(undefined)).toThrow('Invalid date provided');
      expect(() => isWeekend('invalid')).toThrow('Invalid date provided');
    });

    test('should handle leap year dates correctly', () => {
      const leapDaySaturday = new Date('2020-02-29'); // This was a Saturday
      expect(isWeekend(leapDaySaturday)).toBe(true);
    });
  });
});