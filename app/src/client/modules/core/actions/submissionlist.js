const INIT_LIMIT = 10;
const LIMIT = 'LIMIT';

export default {
  currentLimit({LocalState}) {
    const limit = LocalState.get(LIMIT);
    if (limit) {
      return limit;
    }
    LocalState.set(LIMIT, INIT_LIMIT);
    return INIT_LIMIT;
  },
  increaseLimit({LocalState}, length) {
    const limit = LocalState.get(LIMIT) || INIT_LIMIT;
    if (length === limit) {
      LocalState.set(LIMIT, limit + 10);
    }
  },
  clearLimit({LocalState}) {
    return LocalState.set(LIMIT, null);
  }
};
