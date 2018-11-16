const FS = require('fs');

const data = new Map();
const filename = '../data/device_store.json';

exports.save = () => {
  FS.writeFileSync(filename, data);
  return true;
}

exports.load = () => {

  
}

exports.set = (id, device) => {
  data.set(id, device);
}

exports.get = (id) => {
  if (!data.has)
  return data.get('id');
}
