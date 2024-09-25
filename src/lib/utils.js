// utils.js
export function forceRefresh() {
  // Check if the page has already been refreshed
  if (!sessionStorage.getItem('refreshed')) {
    // Set the refreshed flag in sessionStorage
    sessionStorage.setItem('refreshed', 'true');
    // Force refresh the page
    window.location.reload();
  } else {
    // Remove the refreshed flag for the next time
    sessionStorage.removeItem('refreshed');
  }
}
  // Function to get color based on mood value
  export function getMoodColor(mood) {
    const gradientColors = ['#ff0000', '#ff3300', '#ff6600', '#ff9900', '#ffcc00', '#ccff00', '#99cc00', '#66cc00', '#33cc00', '#00cc00']; // Red to Green gradient
    return gradientColors[mood - 1]; // Adjust index for 0-based array
  }

