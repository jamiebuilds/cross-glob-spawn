'use strict';

var path = require('path');
var crossGlobSpawn = require('../');

describe('spawn', () => {
  it('should spawn a process with globs', done => {
    var result = '';
    var child = crossGlobSpawn('cat', [path.join(__dirname, '../fixtures/*.js')]);
    child.stdout.on('data', data => result += data);
    child.on('close', () => {
      expect(result).toEqual("A\nB\n");
      done();
    });
  });

  it('should spawn a process with globs synchronously', () => {
    var result = crossGlobSpawn.sync('cat', [path.join(__dirname, '../fixtures/*.js')]);
    expect(result.status).toEqual(0);
    expect(result.stdout.toString()).toEqual("A\nB\n");
  });
});
