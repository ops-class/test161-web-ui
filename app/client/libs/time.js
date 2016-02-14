const {abs, floor} = Math;

getInterval = (diff) => {
  const seconds = abs(floor(diff / 1000));
  if (seconds < 60) {
    return 1000;
  }
  if (seconds < 3600) {
    return 60 * 1000;
  }
  return 3600000;
}
