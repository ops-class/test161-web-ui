const LEADERBOARD = 'leaders';

const pathIsAll = (path) => path === undefined

const pathIsProfile = (path) => path === 'profile'

const pathIsIntro = (path) => path === 'test161'

const pathIsLeaderboard = (path = '') => path.indexOf(LEADERBOARD) > -1

export {
  pathIsAll,
  pathIsProfile,
  pathIsIntro,
  pathIsLeaderboard
}
