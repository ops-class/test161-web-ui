import {HIDE, SHOW, ANONYMOUS} from 'lib/collections';
import {isStaff} from 'lib/';

const hash = (name) => {
  /*eslint-disable */
  return CryptoJS.MD5(name).toString();
  /*eslint-enable */
};

const isHide = (privacy, type) => {
  const setting = (privacy || []).find(x => (x || {}).type === type);
  if (!setting) {
    return type === 'asst';
  }
  return setting.choice === HIDE;
};

const isAnonymous = (privacy, type) => {
  const setting = (privacy || []).find(x => (x || {}).type === type);
  if (!setting) {
    return true;
  }
  return setting.choice === ANONYMOUS;
};

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
  }
  return email;
};

const appendStaffSuffix = ({student, userObjects}, name) => {
  if (isStaff(findUser(student, userObjects))) {
    return name + ' (staff)';
  }
  return name;
};

const findUser = ({email}, userObjects) => userObjects.find(x => x.services.auth0.email === email);

const filterAggregate = (e, targetName, type, value, staff) => {
  const {_id: users, privacyArray = [], students, userObjects = []} = e;
  e._id = hash(users.join(', ') + targetName);
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
        };
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
};

export default {
  hash,
  isHide,
  isAnonymous,
  getStudentEmail,
  filterAggregate
};
