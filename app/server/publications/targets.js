// Only publish data for the matches we care about. Be careful not to over-publish
Meteor.publish('targets', function() {
  if (!this.userId) {
    this.ready();
    return;
  }
  
  let initializing = true;

  const pipeline = [{
    $group: {
      _id: "$name",
      version: {
        $max: "$version"
      }
    }
  }];

  const runAggregation = () => {
    Targets.aggregate(pipeline).map((e) => {
      this.added('targetnames', e._id, e);
    });
    this.ready();
  }

  const query = Targets.find({});
  const handle = query.observeChanges({
    added: (id) => {
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

  this.onStop(function() {
    handle.stop();
  });
});
