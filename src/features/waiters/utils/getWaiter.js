export const getWaiter = (waiters, id) =>
  waiters.find((waiter) => waiter.id === id);
