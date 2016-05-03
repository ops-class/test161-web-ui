const BUILD = 'build';

const compareTest = (a, b) => {
  if (a.name === BUILD || b.name === BUILD) {
    return a.name === BUILD ? -1 : 1;
  }
  const pointsAvail = a.points_avail - b.points_avail;
  if (pointsAvail !== 0) {
    return pointsAvail;
  }
  const pointsEarned = a.points_earned - b.points_earned;
  if (pointsEarned !== 0) {
    return pointsEarned;
  }
  return a.name.localeCompare(b.name);
};

export {compareTest};
