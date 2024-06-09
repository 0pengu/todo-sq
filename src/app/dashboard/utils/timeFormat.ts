export function formatTime(isoTimestamp: string) {
  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  const unixTimestamp = Math.floor(new Date(isoTimestamp).getTime() / 1000); // Convert ISO format to Unix timestamp
  const elapsedTime = currentTime - unixTimestamp;

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const year = 365 * day; // Assuming a non-leap year for simplicity

  if (elapsedTime < minute) {
    return "now";
  } else if (elapsedTime < hour) {
    const minutes = Math.floor(elapsedTime / minute);
    return `${minutes}m ago`;
  } else if (elapsedTime < day) {
    const hours = Math.floor(elapsedTime / hour);
    return `${hours}h ago`;
  } else if (elapsedTime < week) {
    const days = Math.floor(elapsedTime / day);
    return `${days}d ago`;
  } else if (elapsedTime < year) {
    const weeks = Math.floor(elapsedTime / week);
    return `${weeks}w ago`;
  } else {
    const years = Math.floor(elapsedTime / year);
    return `${years}y ago`;
  }
}

export function formatFutureTime(isoTimestamp: string) {
  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  const unixTimestamp = Math.floor(new Date(isoTimestamp).getTime() / 1000); // Convert ISO format to Unix timestamp
  const elapsedTime = unixTimestamp - currentTime; // Calculate the future time difference

  if (elapsedTime <= 0) {
    return "now";
  }

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const year = 365 * day; // Assuming a non-leap year for simplicity

  if (elapsedTime < minute) {
    return "now";
  } else if (elapsedTime < hour) {
    const minutes = Math.floor(elapsedTime / minute);
    return `in ${minutes}m`;
  } else if (elapsedTime < day) {
    const hours = Math.floor(elapsedTime / hour);
    return `in ${hours}h`;
  } else if (elapsedTime < week) {
    const days = Math.floor(elapsedTime / day);
    return `in ${days}d`;
  } else if (elapsedTime < year) {
    const weeks = Math.floor(elapsedTime / week);
    return `in ${weeks}w`;
  } else {
    const years = Math.floor(elapsedTime / year);
    return `in ${years}y`;
  }
}
