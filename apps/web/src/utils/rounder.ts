export const roundNumber = (number: number, decimals: number = 2) => {
  // most secure way to round a number in javascript

  const rounded = Math.ceil(number * 10 ** decimals) / 10 ** decimals;

  return rounded;
};
