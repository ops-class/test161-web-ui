randomInt = (range = 100) => Math.floor(Math.random() * range)

// submissionStatus = ['submitted', 'building', 'running', 'completed', 'aborted'];
getSubmissionStatusClass = (status) => {
  if (status === submissionStatus[0]) {
    return 'alert-info';
  }
  if (status === submissionStatus[1] || status === submissionStatus[2]) {
    return 'alert-warning';
  }
  if (status === submissionStatus[3]) {
    return 'alert-success';
  }
  if (status === submissionStatus[4]) {
    return 'alert-danger';
  }
}

// testStatus = ['none', 'running', 'correct', 'incorrect', 'abort', 'skip'];
// commandStatus = ['none', 'running', 'correct', 'incorrect'];
const cssMap = Object.assign(...testStatus.map(status => ({[status]: `status-${status}`})));
getCssClass = (status) => {
  return cssMap[status] || '';
}

getTestStatusClass = getCssClass

getCommandStatusClass = getCssClass

isRunning = (status) => status === 'running'

isTestRunning = isRunning
isCommandRunning = isRunning

isSubmissionRunning = (status) => {
  return isRunning(status) || status === submissionStatus[2];
}
