Tests = new Mongo.Collection('tests');

commandStatus = ['none', 'running', 'correct', 'incorrect'];
testStatus = ['none', 'correct', 'incorrect', 'abort', 'skip'];

OutputSchema = new SimpleSchema({
  line: {
    type: String,
    label: "line"
  },
  walltime: {
    type: Number,
    label: "Wall time",
    decimal: true,
    min: 0
  },
  simtime: {
    type: Number,
    label: "Wall time",
    decimal: true,
    min: 0
  }
});

CommandSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "id",
    regEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  },
  output: {
    type: [OutputSchema],
    label: "Outputs"
  },
  status: {
    type: String,
    label: "status",
    allowedValues: commandStatus
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
  status: {
    type: String,
    label: "Status",
    allowedValues: testStatus
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

generateOutput = (i = 0) => {
  const line = 'line ' + i;
  const walltime = 0.1 * i;
  const simtime = walltime;
  return {line, walltime, simtime};
}

generateCommand = () => {
  const _id = Meteor.uuid();
  const points_avail = 10;
  const points_earned = 10;
  const status = commandStatus[0];
  const output = [];
  return {_id, points_avail, points_earned, output, status};
}

generateTest = (index = -1, target = '', num = 2) => {
  const _id = Meteor.uuid();
  const name = `${target} test ${index}`;
  const commands = [];
  const points_avail = randomInt(10);
  const points_earned = randomInt(points_avail);
  const status = testStatus[0];
  const test = {_id, name, commands, points_avail, points_earned, status};
  Tests.insert(test);
  for (let i = 0; i < num; i++) {
    Meteor.setTimeout(() => {
      const command = generateCommand();
      commands.push(command);
      Tests.update(_id, { $set: { commands: commands } });
      for (let j = 0; j < 10; j++) {
        Meteor.setTimeout(() => {
          command.status = commandStatus[1];
          command.output.push(generateOutput(j));
          if (command.output.length === 10) {
            command.status = commandStatus[2];
          }
          Tests.update(_id, { $set: {commands: commands } });
          if (command.output.length === 10 && commands.length == num) {
            Tests.update(_id, { $set: {status: testStatus[1] } });
          }
        }, 1000 * j);
      }
    }, 1000 * 10 * i);
  }
  return test;
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
      tests.push(test._id);
      Submissions.update(_id, { $set : { tests: tests } });
    }, 1000 * 10 * num * i);
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

clean = () => {
  Tests.remove({});
  Submissions.remove({});
}

Meteor.methods({
  mock: function(score = 100, num = 2) {
    mock(score, num);
  }
})
