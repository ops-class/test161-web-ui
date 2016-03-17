import {Students} from '../../../libs/collections';
import {actions, hideAction} from '../schema';

const queryHiddens = (target) => {
  const selector = { hiddens: { $in: [ target ] } };
  const options = { fields: { email: 1, _id: 0 } };
  return Students.find(selector, options).fetch();
};

const updateStudents = (target, emails, action) => {
  const selector = { email: { $in: emails } };
  let modifier = { $pull: { hiddens: target } };

  if (action === hideAction) {
    modifier = { $addToSet: { hiddens: target } };
  }

  const options = {};
  return Students.update(selector, modifier, options);
};

const getEmail = (x) => x.email;

const processActions = (target, globalAction = hideAction, users) => {
  const res = [];
  for (let action of actions) {
    const emails = users.filter(x => (x.action || globalAction) === action).map(getEmail);
    updateStudents(target, emails, action);
    res.push(...emails.map(email => ({email, status: action})));
  }
  return res;
};

export {queryHiddens, processActions};
