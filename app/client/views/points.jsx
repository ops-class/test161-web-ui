getPointClass = ({points_earned, points_avail}) => {
  const ratio = points_avail ? points_earned / points_avail : 0;
  if (ratio < 0.3) {
    return 'label-important';
  }
  if (ratio < 0.6) {
    return 'label-warning';
  }
  if (ratio < 0.9) {
    return 'label-info';
  }
  return 'label-success';
}

PointComponent = ({points_earned, points_avail}) => {
  let className = 'label ';
  className += getPointClass({points_earned, points_avail});
  console.log(className);
  return (
    <span className={className}>
      {points_earned}/{points_avail}
    </span>
  );
};
