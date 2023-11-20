/**
 * Formats a given date into a beautiful string representation.
 *
 * @param {Date} date The date to be formatted.
 * @returns {string} A formatted string in the following pattern: "DD Mon YY, HH:MM".
 */
export default function formatDate(date) {
    // Extract the day of the month (1-31).
    const day = date.getDate();
    
    // Format the month in a short textual representation (e.g., "Jan").
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    
    // Extract the last two digits of the year (e.g., "21" for 2021).
    const year = date.getFullYear().toString().slice(-2);
    
    // Extract the hours and ensure it's displayed as a 2-digit string (e.g., "03" or "12").
    const hour = date.getHours().toString().padStart(2, '0');
    
    // Extract the minutes and ensure it's displayed as a 2-digit string (e.g., "05" or "59").
    const minute = date.getMinutes().toString().padStart(2, '0');
    
    // Combine all the formatted components into a single string.
    const formattedDate = `${day} ${month} ${year}, ${hour}:${minute}`;
    
    // Return the beautiful date string.
    return formattedDate;
}
