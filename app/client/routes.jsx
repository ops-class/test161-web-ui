FlowRouter.route("/", {
  name: "home",
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {asst: null,
      profile: false});
  }
});

FlowRouter.route("/asst/:id", {
  name: "asst",
  action: function(params, queryParams) {
    const asst = `asst${params.id}`;
    ReactLayout.render(MainLayout, {asst: asst,
      profile: false});
  }
});

FlowRouter.route("/profile", {
  name: "home",
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {asst: null,
      profile: true});
  }
});

FlowRouter.notFound = {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <div>404</div>
    })
  }
};
