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
};

const leadingZero = (n) => (n < 10 ? '0' + n : n);

getDurationString = (diff) => {
  const total = abs(floor(diff / 1000));
  const seconds = total % 60;
  const minutes = floor(total / 60);
  return leadingZero(minutes) + ':' + leadingZero(seconds);
};
