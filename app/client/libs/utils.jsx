UserSubs = new SubsManager();

subscribeUserData = function() {
    const data = {ready: false};
    const handle = UserSubs.subscribe("userData");
    if (handle.ready()) {
      data.user = Meteor.user();
      data.ready = true;
    }
    return data;
}

SubmissionSubs = new SubsManager();

TestSubs = new SubsManager();

OutputSubs = new SubsManager();

logout = () => {
  Meteor.logout();
};

login = () => {
  if (Meteor.lock.$container) {
    Meteor.lock.hide();
  }
  Meteor.lock.show({
    closable: false
  });
};
