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

export const formatTime = function (time1) {
  debugger;
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

export const formatDate = function (date) {
  var d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("-");
};


