export const getWaiter = (waiters, id) =>
  waiters.filter((waiter) => waiter.id === id);
