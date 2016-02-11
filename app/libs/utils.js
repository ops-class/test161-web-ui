randomInt = (range = 100) => Math.floor(Math.random() * range)

getTestStatusClass = (status) => {
  if (status === testStatus[0]) {
    return 'running';
  }
  if (status === testStatus[1]) {
    return 'correct';
  }
  if (status === testStatus[2]) {
    return 'incorrect';
  }
  return 'skip';
}

getCommandStatusClass = (status) => {
  if (status === commandStatus[1]) {
    return 'running';
  }
  if (status === commandStatus[2]) {
    return 'correct';
  }
  if (status === commandStatus[3]) {
    return 'incorrect';
  }
  return 'skip';
}
