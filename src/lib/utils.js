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
