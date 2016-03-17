import {HiddenRequestSchema, ScoreRequestSchema} from './schema';
import {Students} from '../../libs/collections';
import {getUserByEmail, isStaff} from '../../libs/query';

const checkHiddenRequest = (obj) => HiddenRequestSchema.newContext().validate(obj);

const checkScoreRequest = (obj) => ScoreRequestSchema.newContext().validate(obj);

const checkStaffByToken = (token) => {
  if (!token) {
    return false;
  }
  const student = Students.findOne({token});
  if (!student) {
    return false;
  }
  const user = getUserByEmail(student.email);
  return isStaff(user);
};

export {checkScoreRequest, checkStaffByToken, checkHiddenRequest};
