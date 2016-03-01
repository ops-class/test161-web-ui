LEADERBOARD = 'leaders';

FlowRouter.route('/', {
  name: 'home',
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {params});
  }
});

FlowRouter.route('/:path', {
  name: 'main',
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {params});
  }
});

FlowRouter.notFound = {
  action: function(params, queryParams) {
    FlowRouter.go('/');
  }
};

pathIsAll = (path) => path === undefined

pathIsProfile = (path) => path === 'profile'

pathIsIntro = (path) => path === 'test161'

pathIsLeaderboard = (path = '') => path.indexOf(LEADERBOARD) > -1
