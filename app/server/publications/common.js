hash = (name) => {
  return CryptoJS.MD5(name).toString();
}

isHide = (privacy, type) => {
  const setting = (privacy || []).find(x => (x || {}).type === type);
  if (!setting) {
    if (type === 'asst') {
      return true;
    } else {
      return false;
    }
  } else {
    return setting.choice === HIDE;
  }
}

isAnonymous = (privacy, type) => {
  const setting = (privacy || []).find(x => (x || {}).type === type);
  if (!setting) {
    return true;
  } else {
    return setting.choice === ANONYMOUS;
  }
}
