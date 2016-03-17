import {submissionStatus, testStatus} from 'lib/collections';

const randomInt = (range = 100) => Math.floor(Math.random() * range);

// submissionStatus = ['submitted', 'building', 'running', 'completed', 'aborted'];
const getSubmissionStatusClass = ({status, score}) => {
  if (status === submissionStatus[0]) {
    return 'alert-info';
  }
  if (status === submissionStatus[1] || status === submissionStatus[2]) {
    return 'alert-warning';
  }
  if (status === submissionStatus[3]) {
    if (score) {
      return 'alert-success';
    }
    return 'alert-danger';
  }
  if (status === submissionStatus[4]) {
    return 'alert-danger';
  }
};

// testStatus = ['none', 'running', 'correct', 'incorrect', 'abort', 'skip'];
// commandStatus = ['none', 'running', 'correct', 'incorrect'];
const cssMap = Object.assign(...testStatus.map(status =>
  ({[status]: `status-${status}`})
));
const getCssClass = (status) => {
  return cssMap[status] || '';
};

const getTestStatusClass = getCssClass;

const getCommandStatusClass = getCssClass;

const isRunning = (status) => status === 'running';

const isTestRunning = isRunning;
const isCommandRunning = isRunning;

const isSubmissionRunning = (status) => {
  return isRunning(status) || status === submissionStatus[1];
};

export default {
  randomInt,
  getSubmissionStatusClass,
  getTestStatusClass,
  getCommandStatusClass,
  isTestRunning,
  isCommandRunning,
  isSubmissionRunning
};
