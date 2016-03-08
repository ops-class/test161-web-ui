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

const getStudentName = (student, values, type, target_name) => {
  const {email} = student;
  const privacySet = new Set(values.filter(x => x.type === email).map(x => x.choice));
  if (privacySet.size === 0) {
    if (isHide(student.privacy, type)) {
      return null;
    }
    if (isAnonymous(student.privacy, type)) {
      return ANONYMOUS;
    } else {
      return email;
    }
  }
  if (privacySet.has(SHOW)) {
    return email;
  }
  if (privacySet.has(ANONYMOUS)) {
    return ANONYMOUS;
  }
  return null;
}

const isStaff = ({email}, userObjects) => {
  const user = userObjects.find(x => x.services.auth0.email === email);
  return ((((user || {}).services || {}).auth0 || {}).user_metadata || {}).staff;
}

filterAggregate = (e, target_name, type, value) => {
  const {_id: users, privacyArray = [], students, userObjects = []} = e;
  e._id = hash(users.join(', ') + target_name);
  e.group = [];
  let values = privacyArray.filter(x => x.privacy && x.value === value);
  values = [].concat(...values.map(x => x.privacy));
  for (let student of students) {
    const name = getStudentName(student, values, type, target_name);
    if (name) {
      if (isStaff(student, userObjects)) {
        e.group.push(name + ' - staff');
      } else {
        e.group.push(name);
      }
    } else {
      return null;
    }
  }
  // e.group = e.group.join(', ');
  delete e.userObjects;
  delete e.students;
  delete e.privacyArray;
  return e;
}
