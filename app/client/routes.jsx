FlowRouter.route("/", {
  name: "home",
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: (<div>content</div>)
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
