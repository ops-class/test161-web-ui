import {Meteor} from 'meteor/meteor';
import {Targets} from 'libs/collections';

// Only publish data for the matches we care about. Be careful not to over-publish
Meteor.publish('targets', function () {
  if (!this.userId) {
    this.ready();
    return;
  }

  let initializing = true;

  const selector = {
    active: 'true',
    leaderboard: 'true'
  };

  const pipeline = [
    {
      $match: selector
    },
    {
      $group: {
        _id: '$name',
        type: { $first: '$type' },
        points: { $max: '$points' },
        print_name: { $first: '$print_name' },
        version: {
          $max: '$version'
        }
      }
    }
  ];

  const runAggregation = () => {
    Targets.aggregate(pipeline).map((e) => {
      this.added('targetnames', e._id, e);
    });
    this.ready();
  };

  const query = Targets.find(selector);
  const handle = query.observeChanges({
    added: () => {
      if (!initializing) {
        runAggregation();
      }
    },
    removed: runAggregation,
    changed: runAggregation,
    error: (err) => {
      throw new Meteor.Error('Uh oh! something went wrong!', err.message);
    }
  });

  initializing = false;
  runAggregation();

  this.onStop(function () {
    handle.stop();
  });
});
