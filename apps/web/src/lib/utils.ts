import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMoonPhase(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Calculate the Julian date
  const jd =
    367 * year -
    Math.floor((7 * (year + Math.floor((month + 9) / 12))) / 4) +
    Math.floor((275 * month) / 9) +
    day -
    730530;

  // Calculate the moon's age in days (0-29.53)
  const moonAge = ((jd % 29.53) + 29.53) % 29.53;

  // Determine the moon phase based on age
  if (moonAge < 1.84566) return "new";
  if (moonAge < 5.53699) return "waxing-crescent";
  if (moonAge < 9.22831) return "first-quarter";
  if (moonAge < 12.91963) return "waxing-gibbous";
  if (moonAge < 16.61096) return "full";
  if (moonAge < 20.30228) return "waning-gibbous";
  if (moonAge < 23.99361) return "last-quarter";
  if (moonAge < 27.68493) return "waning-crescent";
  return "new";
}
