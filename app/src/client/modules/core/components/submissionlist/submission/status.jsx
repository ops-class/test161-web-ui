import React from 'react';
import {getSubmissionStatusClass} from 'lib/';

const StatusComponent = ({status, score, max_score, performance, target_type}) => {
  let className = 'submission-status toggle text-uppercase hvr-grow-shadow alert ';
  let content = status;
  if (target_type === 'asst') {
    if (score) {
      content = `${score}/${max_score}`;
    }
  } else {
    content = performance;
  }
  className += getSubmissionStatusClass({status, score});
  return (
    <div className={className}>
      {content}
    </div>
  );
};

export default {StatusComponent};
