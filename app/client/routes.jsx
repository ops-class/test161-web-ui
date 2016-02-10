FlowRouter.route("/", {
  name: "home",
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {asst: null});
  }
});

FlowRouter.route("/asst/:id", {
  name: "asst",
  action: function(params, queryParams) {
    const asst = `asst${params.id}`;
    ReactLayout.render(MainLayout, { asst });
  }
});

FlowRouter.notFound = {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <div>404</div>
    })
  }
};
