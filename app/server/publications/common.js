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

const getStudentEmail = (student, submission, type, staff) => {
  const {email} = student;
  if (staff) {
    return email;
  }
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

const appendStaffSuffix = ({student, userObjects}, name) => {
  if (isStaff(student, userObjects)) {
    return name + ' (staff)';
  } else {
    return name
  }
}

const isStaff = ({email}, userObjects) => {
  const user = userObjects.find(x => x.services.auth0.email === email);
  return ((((user || {}).services || {}).auth0 || {}).user_metadata || {}).staff;
}

filterAggregate = (e, target_name, type, value, staff) => {
  const {_id: users, privacyArray = [], students, userObjects = []} = e;
  e._id = hash(users.join(', ') + target_name);
  e.group = [];

  let values = privacyArray.filter(x => x.value === value);
  for (let student of students) {
    const {email, name = 'Unknown', link} = student;
    let tmpEmail = null;
    for (let submission of values) {
      const newEmail = getStudentEmail(student, submission, type, staff);
      if (newEmail === email || (newEmail === ANONYMOUS && tmpEmail !== email)) {
        tmpEmail = newEmail;
        e.submission_time = submission.submission_time;
      }
    }
    if (tmpEmail) {
      if (tmpEmail === ANONYMOUS) {
        e.group.push({
          name: appendStaffSuffix({student, userObjects}, ANONYMOUS)
        });
      } else {
        const member = {
          link,
          name: appendStaffSuffix({student, userObjects}, name)
        }
        if (staff) {
          member.email = email;
        }
        e.group.push(member);
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
