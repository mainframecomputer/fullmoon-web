import { MOON_PHASES } from "@/components/icons/MoonPhaseIcon";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMoonPhase(): string {
  // Get current date
  const currentDate = new Date();

  // Define base date (known new moon date)
  const baseDate = new Date(2000, 0, 6); // Note: months are 0-based in JavaScript

  // Calculate days since base date
  const daysSinceBaseDate =
    (currentDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24);

  // Moon phase repeats approximately every 29.53 days
  const moonCycleLength = 29.53;
  const daysIntoCycle = daysSinceBaseDate % moonCycleLength;

  // Determine the phase based on how far into the cycle we are
  if (daysIntoCycle < 1.8457) {
    return "new";
  }
  if (daysIntoCycle < 5.536) {
    return "waxing-crescent";
  }
  if (daysIntoCycle < 9.228) {
    return "first-quarter";
  }
  if (daysIntoCycle < 12.919) {
    return "waxing-gibbous";
  }
  if (daysIntoCycle < 16.61) {
    return "full";
  }
  if (daysIntoCycle < 20.302) {
    return "waning-gibbous";
  }
  if (daysIntoCycle < 23.993) {
    return "last-quarter";
  }
  if (daysIntoCycle < 27.684) {
    return "waning-crescent";
  }
  return "new";
}

export const getCurrentMoonPhase = () => {
  const phase = getMoonPhase();
  switch (phase) {
    case "new":
      return MOON_PHASES.NEW;
    case "waxing-crescent":
      return MOON_PHASES.WAXING_CRESCENT;
    case "first-quarter":
      return MOON_PHASES.FIRST_QUARTER;
    case "waxing-gibbous":
      return MOON_PHASES.WAXING_GIBBOUS;
    case "full":
      return MOON_PHASES.FULL;
    case "waning-gibbous":
      return MOON_PHASES.WANING_GIBBOUS;
    case "last-quarter":
      return MOON_PHASES.LAST_QUARTER;
    case "waning-crescent":
      return MOON_PHASES.WANING_CRESCENT;
    default:
      return MOON_PHASES.NEW;
  }
};
