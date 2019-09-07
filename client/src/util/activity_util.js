export const getPace = function(hr, min, sec, distance) {
  let totalSeconds;
  totalSeconds = hr * 60 ** 2 + min * 60 + sec;
  let pace = totalSeconds / distance;
  let hours = Math.floor(pace / 3600);
  pace %= 3600;
  let minutes = Math.floor(pace / 60);
  let seconds = Math.floor(pace % 60);
  return `${hours}:${minutes}:${seconds}`;
};
        
export const abbreviateUnit = function(unit) {
  switch (unit) {
    case "Feet":
      return "ft";
    case "Miles":
      return "mi";
    case "Kilometers":
      return "km";
    case "Meters":
      return "m";
    case "Yards":
      return "yd";
    default:
      break;
  }
};
