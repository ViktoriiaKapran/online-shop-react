export const getDateString = (ms) => {
  let orderCreatedAt = new Date(+ms).toUTCString();
  return orderCreatedAt;
}