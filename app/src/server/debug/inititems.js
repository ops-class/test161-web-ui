import {Meteor} from 'meteor/meteor';
import {moment} from 'meteor/momentjs:moment';
import {Random} from 'meteor/random';
import {
  Students, Submissions, Targets, Tests,
  submissionStatus, commandStatus, testStatus,
  targetNames, isFailed, isSubmitted, SHOW
} from 'lib/collections';
import {randomInt} from 'lib/';

const DEBUG = Boolean(process.env.TEST161_DEBUG || Meteor.settings.TEST161_DEBUG);

if (DEBUG) {
  const privacy = [ {type: 'asst', choice: SHOW}, {type: 'perf', choice: SHOW} ];
  const generateOutput = (i = 0) => {
    const line = 'line ' + i;
    const walltime = 0.1 * i;
    const simtime = walltime;
    return {line, walltime, simtime};
  };

  const generateCommand = (i = -1) => {
    const _id = Meteor.uuid();
    const points_avail = 10;
    const points_earned = 10;
    const status = commandStatus[0];
    const output = [];
    const input = {
      line: 'command line ' + i,
      walltime: 0.0,
      simtime: 0.0
    };
    return {_id, points_avail, points_earned, output, status, input};
  };

  const generateTest = (index = -1, target = '', num = 2, outputNum = 10) => {
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
        Tests.update(_id, { $set: { commands, result: testStatus[1] } });
        for (let j = 0; j < outputNum; j++) {
          Meteor.setTimeout(() => {
            command.status = commandStatus[1];
            command.output.push(generateOutput(j));
            if (command.output.length === outputNum) {
              command.status = commandStatus[2 + randomInt(2)];
            }
            Tests.update(_id, { $set: {commands} });
            if (commands.length === num && commands[num - 1].output.length === outputNum) {
              Tests.update(_id, { $set: {result: testStatus[2 + randomInt(2)] } });
            }
          }, 1000 * j + noneTime);
        }
      }, 1000 * (outputNum + 2) * i + noneTime * num);
    }
    return test;
  };

  const generateMockTest = ({_id}, num = 2) => {
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
        Submissions.update(_id, { $set: { tests } });
      }, 1000 * outputNum * num * i);
    }
    Meteor.setTimeout(() => {
      Submissions.update(_id, { $set: {status: submissionStatus[3] } });
    }, 1000 * outputNum * num * 5);
  };

  const getRandomSubmission = (ind = -1) => {
    let index = ind;
    if (ind === -1 || ind >= submissionStatus.length) {
      index = Math.floor(Math.random() * submissionStatus.length);
    }
    const USERS_EMAILS = Meteor.users.find({}).fetch().map((user) => {
      return ((user.services || {}).auth0 || {}).email;
    });
    const _id = Meteor.uuid();
    const randomTime = moment().subtract(Math.floor(Math.random() * 160000), 'seconds');
    const submission_time = randomTime.toDate();
    const users = [ USERS_EMAILS[randomInt(USERS_EMAILS.length)] ];
    if (randomInt(2)) {
      users.push(USERS_EMAILS[randomInt(USERS_EMAILS.length)]);
      if (users[0] === users[1]) {
        users.splice(1, 1);
      }
    }
    const repository = 'git@github.com:ops-class/test161.git';
    const commit_id = '9352d6f4ad60d5183b678d64b9964f8c2a58c0db';
    const status = submissionStatus[index];
    const tests = [];
    const target = _id;
    let target_name = targetNames[Math.floor(Math.random() * targetNames.length)];
    let target_type = 'asst';
    const target_version = 1;
    const max_score = 50;
    const completion_time = moment(randomTime).add(
      Math.floor(Math.random() * 10000), 'seconds'
    ).toDate();
    if (isSubmitted(status)) {
      return {
        _id, submission_time, users, repository, commit_id,
        status, target, max_score, target_name, target_type,
        target_version, tests
      };
    }
    if (isFailed(status)) {
      return {
        _id, submission_time, users, repository, commit_id,
        status, target, max_score, target_name, target_type,
        target_version, tests, completion_time
      };
    }
    if (randomInt(2)) {
      let score = max_score;
      if (randomInt(3)) {
        score -= randomInt(max_score);
      }
      return {
        _id, submission_time, users, repository, commit_id,
        status, target, max_score, target_name, target_type,
        target_version, tests, completion_time, score
      };
    }
    const score = max_score;
    const performance = Math.floor(Math.random() * 100) / 10;
    target_name += '-perf';
    target_type = 'perf';
    return {
      _id, submission_time, users, repository, commit_id,
      status, target, max_score, target_name, target_type,
      target_version, tests, completion_time, score, performance
    };
  };

  const updateTargetStats = (sub) => {
    const {users, target_name} = sub;
    for (let email of users) {
      const student = Students.findOne({email});
      if (!student) {
        return console.log(`${email} not exist in Students!`);
      }
      const {target_stats = []} = student;
      let stat = target_stats.find(x => x.target_name === target_name);
      if (stat) {
        stat.total_submissions++;
        stat.high_score = Math.max(stat.high_score, sub.score || 0);
      } else {
        const target_version = 1;
        const target_type = target_name.endsWith('perf') ? 'perf' : 'asst';
        const max_score = 50;
        const total_submissions = 1;
        const high_score = sub.score || 0;
        stat = {target_name, target_version, target_type, max_score, total_submissions, high_score};
        target_stats.push(stat);
      }
      Students.update({email}, { $set: { target_stats }});
    }
    return;
  };

  const initSubmissions = (count = 10) => {
    for (let i = 0; i < count; i++) {
      const sub = getRandomSubmission(i);
      Submissions.insert(sub);
      updateTargetStats(sub);
    }
  };

  const clean = () => {
    Tests.remove({});
    Targets.remove({});
    Submissions.remove({});
    Students.remove({});
    Meteor.users.remove({});
  };

  const mock = (score = 0, num = 2) => {
    const submission = Submissions.findOne({score}, {sort: { submission_time: -1 }});
    if (!submission) {
      console.log('No submission with score: ' + score);
      return;
    }
    generateMockTest(submission, num);
  };

  const generateUsers = (num = 100) => {
    if (Meteor.users.find().count() > 1) {
      return;
    }
    for (let i = 0; i < num; i++) {
      const id = Random.id();
      const email = Random.id(5) + '@buffalo.edu';
      const user = {
        createdAt: new Date(),
        services: {
          auth0: {
            email,
            email_verified: true,
            user_id: 'auth0|' + id,
            name: 'admin@ops-class.org',
            nickname: 'admin',
            global_client_id: 'Rf8od4jJNfYw7DGfjPMQLfxXb7MjS3pP',
            id: 'auth0|' + id
          },
          resume: { loginTokens: [] }
        }
      };
      const userId = Meteor.users.insert(user);
      const _id = Random.id();
      const token = Random.id();
      const createdAt = new Date();
      const target_stats = [];
      const name = email.substring(0, 5);
      const link = 'https://www.ops-class.org';
      const student = {_id, userId, email, token, name, link, createdAt, target_stats, privacy};
      Students.insert(student);
    }
  };

  const updateStudents = (selector = {}, choice = SHOW) => {
    const update = {
      $set: {
        privacy: [
          {type: 'asst', choice},
          {type: 'perf', choice}
        ]
      }
    };
    Students.update(selector, update, {multi: true});
  };

  const mockTargets = () => {
    if (Targets.findOne()) {
      return;
    }
    for (let i = 1; i < 7; i++) {
      for (let j = 0; j < 5; j++) {
        let name = `asst${i}`;
        let type = 'asst';
        if (i >= 4) {
          name = `asst${i - 3}-perf`;
          type = 'perf';
        }
        const version = j;
        const _id = Meteor.uuid();
        const points = 50;
        const kconfig = 'kconfig';
        const userland = false;
        const file_hash = Random.id();
        const file_name = 'file name';
        const print_name = name.toUpperCase();
        const description = `${name} description`;
        const active = 'true';
        const leaderboard = 'true';
        Targets.insert({
          _id, name, print_name, description, active,
          leaderboard, version, type, points, kconfig,
          userland, file_hash, file_name
        });
      }
    }
  };

  const initItems = (num = 1000, user = num / 10) => {
    mockTargets();
    generateUsers(user);

    const count = Submissions.find().count();
    if (count < num) {
      initSubmissions(num - count);
    }
  };

  Object.assign(global, {initItems, clean, mock, updateStudents, Students, Submissions});

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
