
// Function to get current date and time in the format "00:00 AM/PM"
function getCurrentDateTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    // Format hours and minutes as two-digit numbers
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Determine AM or PM
    const amPm = hours < 12 ? 'AM' : 'PM';

    // Create the formatted time string
    const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

    // Create the formatted date string
    const formattedDate = currentDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    // Return an object containing both the date and time
    return {
        date: formattedDate,
        time: formattedTime
    };
}

// Export the getCurrentDateTime function
module.exports = getCurrentDateTime;
