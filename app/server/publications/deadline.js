// TODO: rewrite this function by query a collection or whatever mechanism
getDeadline = (targetName) => {
  if (targetName === 'asst1') {
    return new Date('Feb 22, 2016 17:00:00');
  }
  return new Date('Feb 22, 2017 17:00:00');
}
