export const convertTime = (time: number | 0) => {
  return `${Math.trunc(time)}:${
    (time % 1) * 60 < 9 ? `0${(time % 1) * 60}` : Math.floor((time % 1) * 60)
  }`;
};
