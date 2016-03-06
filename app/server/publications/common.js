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

filterAggregate = (e, target_name, type) => {
  const group = e._id.join(', ') + target_name;
  e._id = hash(group);
  e.group = [];
  for (let student of e.students) {
    if (isHide(student.privacy, type)) {
      return null;
    }
    if (isAnonymous(student.privacy, type)) {
      e.group.push('anonymous');
    } else {
      e.group.push(student.email);
    }
  }
  // e.group = e.group.join(', ');
  delete e.students;
  return e;
}
