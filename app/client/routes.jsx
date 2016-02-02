FlowRouter.route("/", {
  name: "home",
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: (<div>content</div>)
    });
  }
});

FlowRouter.route("/asst/:id", {
  name: "asst",
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: (<div>content</div>)
    });
  }
});
