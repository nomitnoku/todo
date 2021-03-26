const getCurrentTime = () => {
  const dateObj = new Date();
  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${year}-${month > 9 ? month : `0${month}`}-${date > 9 ? date : `0${date}`}`;
};

export default {
  getCurrentTime,
};
