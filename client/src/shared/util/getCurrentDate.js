export function getCurrentDate() {
  let newDate = new Date();
  let sec = newDate.getSeconds();
  let min = newDate.getMinutes();
  let hour = newDate.getHours();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return `${year}${month < 10 ? `0${month}` : `${month}`}${
    date < 10 ? `0${date}` : `${date}`
  }${hour < 10 ? `0${hour}` : `${hour}`}${min < 10 ? `0${min}` : `${min}`}${
    sec < 10 ? `0${sec}` : `${sec}`
  }`;
}
