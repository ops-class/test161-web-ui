Tests = new Mongo.Collection('tests');

CommandSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "id",
    regEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  },
  points_avail: {
    type: Number,
    label: "Available points"
  },
  points_earned: {
    type: Number,
    label: "Earned points"
  }
});

TestSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "id",
    regEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  },
  name: {
    type: String,
    label: "Name"
  },
  commands: {
    type: [CommandSchema],
    label: "Commands"
  },
  points_avail: {
    type: Number,
    label: "Available points"
  },
  points_earned: {
    type: Number,
    label: "Earned points"
  }
});

Tests.attachSchema(TestSchema);


generateCommand = () => {
  const _id = Meteor.uuid();
  const points_avail = 10;
  const points_earned = 10;
  return {_id, points_avail, points_earned};
}

generateTest = (index = -1, target = '', num = 2) => {
  const _id = Meteor.uuid();
  const name = `${target} test ${index}`;
  const commands = [];
  for (let i = 0; i < num; i++) {
    const command = generateCommand();
    commands.push(command);
    const {_id} = command;
    // const num = randomInt(50);
    const num = 10;
    Meteor.setTimeout(() => {
      generateOutput({_id, num});
    }, 1000 * 10 * i);
  }
  const points_avail = randomInt(10);
  const points_earned = randomInt(points_avail);
  return {_id, name, commands, points_avail, points_earned};
}


generateMockTest = ({_id}, num = 2) => {
  const submission = Submissions.findOne(_id);
  if (!submission) {
    console.log('generateMockTest:', _id, 'not found in Submissions!');
    return;
  }
  const {tests} = submission;
  if (tests.length !== 0) {
    console.log('generateMockTest:', `tests of ${_id} is not empty`);
    return;
  }
  for (let i = 0; i < num; i++) {
    Meteor.setTimeout(() => {
      const test = generateTest(i, _id);
      console.log('generate test: ', test);
      Tests.insert(test);
      tests.push(test._id);
      Submissions.update(_id, { $set : { tests: tests } });
    }, 1000 * 10 * 2 * i);
  }
}

mock = (score = 0, num = 2) => {
  const submission = Submissions.findOne({score});
  if (!submission) {
    console.log('No submission with score: ' + score);
    return;
  }
  generateMockTest(submission, num);
}
