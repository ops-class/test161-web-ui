getPointClass = ({points_earned, points_avail}) => {
  const ratio = points_avail ? points_earned / points_avail : 0;
  if (ratio < 0.3) {
    return 'danger';
  }
  if (ratio < 0.6) {
    return 'warning';
  }
  if (ratio < 0.9) {
    return 'info';
  }
  return 'success';
}

PointComponent = ({points_earned, points_avail}) => {
  let className = 'alert ';
  className += 'alert-' + getPointClass({points_earned, points_avail});
  console.log(className);
  return (
    <span className={className}>
      {points_earned}/{points_avail}
    </span>
  );
};
