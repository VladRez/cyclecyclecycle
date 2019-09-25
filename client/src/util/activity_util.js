export const getPace = function(hr, min, sec, distance) {
  let totalSeconds;
  totalSeconds = hr * 60 ** 2 + min * 60 + sec;
  let pace = totalSeconds / distance;
  let hours = Math.floor(pace / 3600);
  pace %= 3600;
  let minutes = Math.floor(pace / 60);
  let seconds = Math.floor(pace % 60);

  hours = hours.toString();
  minutes = minutes != null ? minutes.toString() : "";
  seconds = seconds != null ? seconds.toString() : "";

  if (minutes.length < 2) minutes = "0" + minutes;
  if (seconds.length < 2) seconds = "0" + seconds;

  return [hours, minutes, seconds].join(":");
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

export const formatTime = function(time1) {
  var time = new Date(time1);
  let hrs = time.getHours();
  let ap = "AM";
  if (hrs > 12) {
    hrs -= 12;
    ap = "PM";
  }
  let mins = "" + time.getMinutes();
  let sec = time.getSeconds();
  return hrs + ":" + mins + ":" + sec + " " + ap;
};

export const formatDate = function(date) {
  var d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  
  return [month, day, year].join("-");
};

export const formatDuration = (hr, min, sec) => {
  hr = hr != null ? hr.toString() : "";
  min = min != null ? min.toString() : "";
  sec = sec != null ? sec.toString() : "";

  if (min.length < 2) min = "0" + min;
  if (sec.length < 2) sec = "0" + sec;

  return [hr, min, sec].join(":");
};
