FlowRouter.route("/", {
  name: "home",
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <SubmissionList />
    });
  }
});

FlowRouter.notFound = {
  action: function(params, queryParams) {
    const {path} = FlowRouter.current();
    const url = "https://www.ops-class.org" + path;
    window.open(url, '_blank');
  }
};
