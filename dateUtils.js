function formatDate(date, format) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  if (!format || typeof format !== 'string' || format.trim() === '') {
    throw new Error('Invalid format string');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return format
    .replace(/YYYY/g, year)
    .replace(/MM/g, month)
    .replace(/DD/g, day);
}

function addDays(date, days) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  if (typeof days !== 'number' || isNaN(days)) {
    throw new Error('Days must be a number');
  }

  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

function daysBetween(date1, date2) {
  if (!date1 || !(date1 instanceof Date) || isNaN(date1.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  if (!date2 || !(date2 instanceof Date) || isNaN(date2.getTime())) {
    throw new Error('Invalid date provided');
  }

  // Create new dates with time set to midnight to ignore time components
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  
  const timeDifference = d2.getTime() - d1.getTime();
  const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
  
  return daysDifference;
}

function isWeekend(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }

  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
}

module.exports = {
  formatDate,
  addDays,
  daysBetween,
  isWeekend
};