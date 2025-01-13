import * as React from "react";

export const MOON_PHASES = {
  NEW: "new",
  WAXING_CRESCENT: "waxing-crescent",
  FIRST_QUARTER: "first-quarter",
  WAXING_GIBBOUS: "waxing-gibbous",
  FULL: "full",
  WANING_GIBBOUS: "waning-gibbous",
  LAST_QUARTER: "last-quarter",
  WANING_CRESCENT: "waning-crescent",
} as const;

interface MoonPhaseIconProps {
  phase: string;
  size?: number;
  color?: string;
}

export default function MoonPhaseIcon({
  phase,
  size = 24,
  color = "currentColor",
}: MoonPhaseIconProps) {
  const getPath = () => {
    switch (phase) {
      case MOON_PHASES.NEW:
        return (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 1}
            fill="none"
            stroke={color}
          />
        );
      case MOON_PHASES.WAXING_CRESCENT:
        return (
          <path
            d={`M${size / 2},1 A${size / 2 - 1},${size / 2 - 1} 0 1,1 ${
              size / 2
            },${size - 1} A${size / 4},${size / 2 - 1} 0 1,0 ${size / 2},1`}
            fill={color}
          />
        );
      case MOON_PHASES.FIRST_QUARTER:
        return (
          <path
            d={`M${size / 2},1 A${size / 2 - 1},${size / 2 - 1} 0 1,1 ${
              size / 2
            },${size - 1} L${size / 2},1`}
            fill={color}
          />
        );
      case MOON_PHASES.WAXING_GIBBOUS:
        return (
          <path
            d={`M${size / 2},1 A${size / 2 - 1},${size / 2 - 1} 0 1,1 ${
              size / 2
            },${size - 1} A${size / 4},${size / 2 - 1} 0 0,1 ${size / 2},1`}
            fill={color}
          />
        );
      case MOON_PHASES.FULL:
        return (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 1}
            fill={color}
            stroke="none"
          />
        );
      case MOON_PHASES.WANING_GIBBOUS:
        return (
          <path
            d={`M${size / 2},1 A${size / 2 - 1},${size / 2 - 1} 0 1,0 ${
              size / 2
            },${size - 1} A${size / 4},${size / 2 - 1} 0 0,0 ${size / 2},1`}
            fill={color}
          />
        );
      case MOON_PHASES.LAST_QUARTER:
        return (
          <path
            d={`M${size / 2},1 A${size / 2 - 1},${size / 2 - 1} 0 1,0 ${
              size / 2
            },${size - 1} L${size / 2},1`}
            fill={color}
          />
        );
      case MOON_PHASES.WANING_CRESCENT:
        return (
          <path
            d={`M${size / 2},1 A${size / 2 - 1},${size / 2 - 1} 0 1,0 ${
              size / 2
            },${size - 1} A${size / 4},${size / 2 - 1} 0 1,1 ${size / 2},1`}
            fill={color}
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Moon phase: ${phase}`}
    >
      {getPath()}
    </svg>
  );
}
