export const getRandomTime = () => {
  function randomDateFn(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  function formatDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;

    return (
      year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
    );
  }

  const start = new Date(2020, 0, 1);
  const end = new Date(2023, 11, 31);
  const randomDate = randomDateFn(start, end);
  return formatDate(randomDate);
};
