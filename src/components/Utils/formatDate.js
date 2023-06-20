export function formatTime(time) {
  const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000); // Convert seconds and nanoseconds to milliseconds
  const options = {
    day: "2-digit",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}
