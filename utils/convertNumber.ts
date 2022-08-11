export const convertNumber = (num: number) => {
  if (num < 1000) {
    return `${num}`;
  } else {
    let other = (num / 1000).toFixed(1);
    return `${other}K`;
  }
};
