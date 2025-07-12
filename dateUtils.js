// Constants
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const SUNDAY = 0;
const SATURDAY = 6;

// Helper functions
/**
 * Validates that a value is a valid Date object
 * @param {*} date - Value to validate
 * @throws {Error} If the value is not a valid date
 */
function validateDate(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }
}

/**
 * Validates that a value is a valid number
 * @param {*} value - Value to validate
 * @param {string} errorMessage - Custom error message
 * @throws {Error} If the value is not a valid number
 */
function validateNumber(value, errorMessage) {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error(errorMessage);
  }
}

/**
 * Validates that a format string is valid
 * @param {*} format - Format string to validate
 * @throws {Error} If the format string is invalid
 */
function validateFormatString(format) {
  if (!format || typeof format !== 'string' || format.trim() === '') {
    throw new Error('Invalid format string');
  }
}

/**
 * Formats a date according to the specified format pattern
 * @param {Date} date - The date to format
 * @param {string} format - Format pattern (supports YYYY, MM, DD tokens)
 * @returns {string} The formatted date string
 * @throws {Error} If date or format is invalid
 */
function formatDate(date, format) {
  validateDate(date);
  validateFormatString(format);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return format
    .replace(/YYYY/g, year)
    .replace(/MM/g, month)
    .replace(/DD/g, day);
}

/**
 * Adds a specified number of days to a date
 * @param {Date} date - The base date
 * @param {number} days - Number of days to add (can be negative)
 * @returns {Date} A new date object with days added
 * @throws {Error} If date or days parameter is invalid
 */
function addDays(date, days) {
  validateDate(date);
  validateNumber(days, 'Days must be a number');

  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Calculates the number of days between two dates
 * @param {Date} date1 - The first date
 * @param {Date} date2 - The second date
 * @returns {number} Number of days (positive if date2 > date1, negative otherwise)
 * @throws {Error} If either date is invalid
 */
function daysBetween(date1, date2) {
  validateDate(date1);
  validateDate(date2);

  // Create new dates with time set to midnight to ignore time components
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  
  const timeDifference = d2.getTime() - d1.getTime();
  const daysDifference = Math.round(timeDifference / MILLISECONDS_PER_DAY);
  
  return daysDifference;
}

/**
 * Determines if a given date falls on a weekend (Saturday or Sunday)
 * @param {Date} date - The date to check
 * @returns {boolean} True if the date is a weekend, false otherwise
 * @throws {Error} If date is invalid
 */
function isWeekend(date) {
  validateDate(date);

  const dayOfWeek = date.getDay();
  return dayOfWeek === SUNDAY || dayOfWeek === SATURDAY;
}

module.exports = {
  formatDate,
  addDays,
  daysBetween,
  isWeekend
};