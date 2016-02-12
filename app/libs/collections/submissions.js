Submissions = new Mongo.Collection('submissions');

Submissions._ensureIndex({ "users": 1, "target_name": 1 });

submissionStatus = ['submitted', 'completed', 'failed'];
targetNames = ['asst1', 'asst2', 'asst3'];
targetTypes = ['perm', 'grad'];

SubmissionSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "id",
    regEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  },
  submission_time: {
    type: Date,
    label: "Submision Time"
  },
  users: {
    type: [String],
    label: "Users",
    regEx: SimpleSchema.RegEx.Email,
    min: 1
  },
  repository: {
    type: String,
    label: "Repository"
  },
  commit_id: {
    type: String,
    label: "Commit ID"
  },
  target: {
    type: String,
    label: "Target _id"
  },
  target_name: {
    type: String,
    label: "Target Name",
    allowedValues: targetNames
  },
  max_score: {
    type: Number,
    min: 1
  },
  tests: {
    type: [String],
    label: "Tests",
    // regEx: SimpleSchema.RegEx.Id,
    min: 0,
    regEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  },
  status: {
    type: String,
    label: "Status",
    allowedValues: submissionStatus
  },
  completion_time: {
    type: Date,
    label: "Completion Time",
    optional: true
  },
  score: {
    type: Number,
    label: "Number",
    optional: true,
    min: 0
  },
  performance: {
    type: Number,
    label: "Performance",
    optional: true
  }
});

Submissions.attachSchema(SubmissionSchema);

isCompleted = (status) => status === 'completed'

isFailed = (status) => status === 'failed'

isSubmitted = (status) => status === 'submitted'

getRandomSubmission = (index = -1) => {
  if (index === -1 || index >= submissionStatus.length) {
    index = Math.floor(Math.random() * submissionStatus.length);
  }
  const _id = Meteor.uuid();
  const randomTime = moment().subtract(Math.floor(Math.random() * 160000), 'seconds');
  const submission_time = randomTime.toDate();
  const users = ['t1@xcv58.com', 't2@xcv58.com'];
  const repository = 'git@github.com:ops-class/test161.git';
  const commit_id = '9352d6f4ad60d5183b678d64b9964f8c2a58c0db';
  const status = submissionStatus[index];
  const tests = [];
  const target = _id;
  const target_name = targetNames[Math.floor(Math.random() * targetNames.length)];
  const max_score = 100;
  const completion_time = moment(randomTime).add(Math.floor(Math.random() * 10000), 'seconds').toDate();
  if (isSubmitted(status)) {
    return {_id, submission_time, users, repository, commit_id, status, target, max_score, target_name, tests};
  } else if (isFailed(status)) {
    return {_id, submission_time, users, repository, commit_id, status, target, max_score, target_name, tests, completion_time};
  } else {
    const score = Math.floor(Math.random() * 100);
    return {_id, submission_time, users, repository, commit_id, status, target, max_score, target_name, tests, completion_time, score};
  }
}

initSubmissions = (count = 10) => {
  for (let i = 0; i < count; i++) {
    const sub = getRandomSubmission(i);
    Submissions.insert(sub);
  }
}

if (Meteor.isServer) {
  if (!Submissions.findOne()) {
    initSubmissions(100);
  }
}
