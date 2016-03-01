mockTargets = () => {
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      const name = `asst${i}`;
      const version = j;
      const _id = Meteor.uuid();
      const type = 'asst';
      const points = 50;
      const kconfig = 'kconfig';
      const userland = false;
      const file_hash = Random.id();
      const file_name = 'file name';
      Targets.insert({_id, name, version, type, points, kconfig, userland, file_hash, file_name});
    }
  }
}
