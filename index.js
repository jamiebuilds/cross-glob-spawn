'use strict';

var crossSpawn = require('cross-spawn');
var objectAssign = require('object-assign');

function crossGlobSpawn(command, args, opts) {
  var child;
  var cmd = command + ' ' + args.join(' ');

  if ('win32' === process.platform) {
    child = crossSpawn('cmd.exe', ['/s', '/c', '"' + cmd + '"'], objectAssign({}, opts, {
      windowsVerbatimArguments: true
    }));
  } else {
    child = crossSpawn('/bin/sh', ['-c', cmd], opts);
  }

  return child;
}

function crossGlobSpawnSync(command, args, opts) {
  var result;
  var cmd = command + ' ' + args.join(' ');

  if ('win32' === process.platform) {
    result = crossSpawn.sync('cmd.exe', ['/s', '/c', '"' + cmd + '"'], objectAssign({}, opts, {
      windowsVerbatimArguments: true
    }));
  } else {
    result = crossSpawn.sync('/bin/sh', ['-c', cmd], opts);
  }

  return result;
}

module.exports = crossGlobSpawn;
module.exports.spawn = crossGlobSpawn;
module.exports.sync = crossGlobSpawnSync;
