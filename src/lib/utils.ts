import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and merges Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a timestamp into a readable date or time string.
 * @param date_ms - Timestamp in milliseconds.
 * @returns Formatted date string.
 */
export function formatDate(date_ms: number): string {
  const date_obj = new Date(date_ms); // Directly use milliseconds
  const current_date = new Date();
  current_date.setHours(0, 0, 0, 0); // Today's date at midnight

  const provided_date = new Date(date_obj);
  provided_date.setHours(0, 0, 0, 0);

  // Check if it's today
  if (provided_date.getTime() === current_date.getTime()) {
    return date_obj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  }

  // Check if it's yesterday
  const yesterday = new Date(current_date);
  yesterday.setDate(current_date.getDate() - 1);
  if (provided_date.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }

  // Check if it's within the current week
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  if (provided_date > new Date(current_date.getTime() - 7 * 24 * 60 * 60 * 1000)) {
    return days[provided_date.getDay()];
  }

  // Return formatted date for older messages
  return `${provided_date.getMonth() + 1}/${provided_date.getDate()}/${provided_date.getFullYear()}`;
}

/**
 * Checks if two timestamps fall on the same day.
 * @param timestamp1 - First timestamp in milliseconds.
 * @param timestamp2 - Second timestamp in milliseconds.
 * @returns Boolean indicating if both dates are the same.
 */
export const isSameDay = (timestamp1: number, timestamp2: number): boolean => {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Returns a relative date string (Today, Yesterday, etc.) based on message timestamps.
 * @param message - The current message object.
 * @param previousMessage - The previous message object (optional).
 * @returns String describing the relative date.
 */
type Message = {
  _creationTime: number; // Timestamp in milliseconds
};

export const getRelativeDateTime = (message: Message, previousMessage?: Message): string | undefined => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  const messageDate = new Date(message._creationTime);

  if (!previousMessage || !isSameDay(previousMessage._creationTime, messageDate.getTime())) {
    if (isSameDay(messageDate.getTime(), today.getTime())) {
      return "Today";
    } else if (isSameDay(messageDate.getTime(), yesterday.getTime())) {
      return "Yesterday";
    } else if (messageDate > lastWeek) {
      return messageDate.toLocaleDateString(undefined, { weekday: "long" });
    } else {
      return messageDate.toLocaleDateString(undefined, { day: "2-digit", month: "2-digit", year: "numeric" });
    }
  }
};

/**
 * Generates a random alphanumeric ID of specified length.
 * @param len - Length of the ID (default is 5).
 * @returns Random alphanumeric string.
 */
export function randomID(len: number = 5): string {
  const chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
