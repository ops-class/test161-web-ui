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
    ReactLayout.render(MainLayout, {
      content: <div>404</div>
    })
  }
};
