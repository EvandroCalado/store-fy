export const formatNumberWithDecimal = (number: number): string => {
  const [int, decimal] = number.toString().split('.');

  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
};
