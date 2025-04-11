export const convertToPlainObject = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
