FlowRouter.route("/", {
  name: "home",
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {params});
  }
});

FlowRouter.route("/:path", {
  name: "asst",
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {params});
  }
});

FlowRouter.notFound = {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <div>404</div>
    })
  }
};

pathIsAll = (path) => path === undefined

pathIsProfile = (path) => path === 'profile'

pathIsIntro = (path) => path === 'test161'
