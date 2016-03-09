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

const getStudentName = (student, submission, type) => {
  const {email} = student;
  const {privacy = []} = submission;
  const localPrivacy = privacy.find(x => x.type === email);
  if (localPrivacy) {
    if (localPrivacy.choice === SHOW) {
      return email;
    }
    if (localPrivacy.choice === ANONYMOUS) {
      return ANONYMOUS;
    }
    return null;
  }
  if (isHide(student.privacy, type)) {
    return null;
  }
  if (isAnonymous(student.privacy, type)) {
    return ANONYMOUS;
  } else {
    return email;
  }
}

const isStaff = ({email}, userObjects) => {
  const user = userObjects.find(x => x.services.auth0.email === email);
  return ((((user || {}).services || {}).auth0 || {}).user_metadata || {}).staff;
}

filterAggregate = (e, target_name, type, value) => {
  const {_id: users, privacyArray = [], students, userObjects = []} = e;
  e._id = hash(users.join(', ') + target_name);
  e.group = [];

  let values = privacyArray.filter(x => x.value === value);
  for (let student of students) {
    const {email} = student;
    let name = null;
    for (let submission of privacyArray) {
      const newName = getStudentName(student, submission, type);
      if (newName === email || (newName === ANONYMOUS && name !== email)) {
        name = newName;
        e.submission_time = submission.submission_time;
      }
    }
    if (name) {
      if (isStaff(student, userObjects)) {
        e.group.push(name + ' (staff)');
      } else {
        e.group.push(name);
      }
    } else {
      return null;
    }
  }
  delete e.userObjects;
  delete e.students;
  delete e.privacyArray;
  return e;
}
