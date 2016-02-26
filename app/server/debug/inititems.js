const DEBUG = !!(process.env.TEST161_DEBUG || Meteor.settings.TEST161_DEBUG);
if (DEBUG) {
  generateOutput = (i = 0) => {
    const line = 'line ' + i;
    const walltime = 0.1 * i;
    const simtime = walltime;
    return {line, walltime, simtime};
  }

  generateCommand = (i = -1) => {
    const _id = Meteor.uuid();
    const points_avail = 10;
    const points_earned = 10;
    const status = commandStatus[0];
    const output = [];
    const input = {
      line: 'command line ' + i,
      walltime: 0.0,
      simtime: 0.0
    }
    return {_id, points_avail, points_earned, output, status, input};
  }

  generateTest = (index = -1, target = '', num = 2, outputNum = 10) => {
    const _id = Meteor.uuid();
    const name = `${target} test ${index}`;
    const commands = [];
    const points_avail = randomInt(10);
    const points_earned = randomInt(points_avail);
    const result = testStatus[0];
    const test = {_id, name, commands, points_avail, points_earned, result};
    Tests.insert(test);
    for (let i = 0; i < num; i++) {
      const noneTime = 2000;
      Meteor.setTimeout(() => {
        const command = generateCommand(i);
        commands.push(command);
        Tests.update(_id, { $set: { commands: commands, result: testStatus[1] } });
        for (let j = 0; j < outputNum; j++) {
          Meteor.setTimeout(() => {
            command.status = commandStatus[1];
            command.output.push(generateOutput(j));
            if (command.output.length === outputNum) {
              command.status = commandStatus[2 + randomInt(2)];
            }
            Tests.update(_id, { $set: {commands: commands } });
            if (commands.length === num && commands[num - 1].output.length === outputNum) {
              Tests.update(_id, { $set: {result: testStatus[2 + randomInt(2)] } });
            }
          }, 1000 * j + noneTime);
        }
      }, 1000 * (outputNum + 2) * i + noneTime * num);
    }
    return test;
  }

  generateMockTest = ({_id}, num = 2) => {
    const submission = Submissions.findOne(_id);
    Submissions.update(_id, { $set: {status: submissionStatus[2] } });
    if (!submission) {
      console.log('generateMockTest:', _id, 'not found in Submissions!');
      return;
    }
    const {tests} = submission;
    if (tests.length !== 0) {
      console.log('generateMockTest:', `tests of ${_id} is not empty`);
      return;
    }
    const outputNum = 3;
    for (let i = 0; i < num; i++) {
      Meteor.setTimeout(() => {
        const test = generateTest(i, _id, num, outputNum);
        tests.push(test._id);
        Submissions.update(_id, { $set : { tests: tests } });
      }, 1000 * outputNum * num * i);
    }
    Meteor.setTimeout(() => {
      Submissions.update(_id, { $set: {status: submissionStatus[3] } });
    }, 1000 * outputNum * num * 5);
  }

  getRandomSubmission = (index = -1) => {
    if (index === -1 || index >= submissionStatus.length) {
      index = Math.floor(Math.random() * submissionStatus.length);
    }
    const USERS_EMAILS = Meteor.users.find({}).fetch().map((user) => {
      return ((user.services || {}).auth0 || {}).email;
    });
    const _id = Meteor.uuid();
    const randomTime = moment().subtract(Math.floor(Math.random() * 160000), 'seconds');
    const submission_time = randomTime.toDate();
    const users = [USERS_EMAILS[randomInt(USERS_EMAILS.length)]];
    if (randomInt(2)) {
      users.push(USERS_EMAILS[randomInt(USERS_EMAILS.length)]);
    }
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
      const score = max_score - randomInt(10);
      return {_id, submission_time, users, repository, commit_id, status, target, max_score, target_name, tests, completion_time, score};
    }
  }

  initSubmissions = (count = 10) => {
    for (let i = 0; i < count; i++) {
      const sub = getRandomSubmission(i);
      Submissions.insert(sub);
    }
  }

  clean = () => {
    Tests.remove({});
    Submissions.remove({});
    Meteor.users.remove({});
  }

  mock = (score = 0, num = 2) => {
    const submission = Submissions.findOne({score}, {sort: { submission_time: -1 }});
    if (!submission) {
      console.log('No submission with score: ' + score);
      return;
    }
    generateMockTest(submission, num);
  }

  generateUsers = (num = 100) => {
    for (let i = 0; i < num; i++) {
      const id = Random.id();
      const email = Random.id(5) + '@buffalo.edu';
      user = {
        createdAt: new Date(),
        services: {
          auth0: {
            email: email,
            email_verified: true,
            user_id: 'auth0|' + id,
            name: 'admin@ops-class.org',
            nickname: 'admin',
            global_client_id: 'Rf8od4jJNfYw7DGfjPMQLfxXb7MjS3pP',
            id: 'auth0|' + id
          },
          resume: { loginTokens: [] }
        }
      }
      const userId = Meteor.users.insert(user);
      const _id = Random.id();
      const token = Random.id();
      const createdAt = new Date();
      const target_stats = [];
      const student = {_id, userId, email, token, createdAt, target_stats};
      Students.insert(student);
    }
  }

  initItems = (num = 1000) => {
    generateUsers(num / 10);

    const count = Submissions.find().count();
    if (count < num) {
      initSubmissions(num - count);
    }
  }

  Meteor.methods({
    initItems: (num) => {
      initItems(num);
      return num;
    },
    mock: (score = 100, num = 2) => {
      mock(score, num);
      return `mock for score ${score} with ${num} tests`;
    },
    clean: () => {
      clean();
      return 'clean';
    }
  });
}
