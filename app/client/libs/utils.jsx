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

logout = () => {
  Meteor.logout();
};

login = () => {
  Meteor.lock.show();
};
