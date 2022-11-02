const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const getMonthName = (month) => {
  return months[month];
};

const getDisplayDate = () => {
  const dt = new Date();
  return `${getMonthName(dt.getMonth())} ${dt.getDate()}, ${dt.getFullYear()}`;
};

const formatTimestamp = (dateString) => {
  const dt = new Date(dateString);

  const hours = dt.getHours();
  const min = dt.getMinutes();
  let sec = dt.getSeconds().toString();

  if (sec.length === 1) {
    sec = `0${sec}`;
  }

  return `${hours}:${min}:${sec}`;
};

const isSameMonth = (d1, d2) => {
  return new Date(d1).getMonth() === new Date(d2).getMonth();
};
