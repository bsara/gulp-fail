/**
 * gulp-fail v1.0.5
 * Copyright (c) 2016 Brandon Sara (http://bsara.github.io)
 * Licensed under the MIT License
 */

'use strict';


// Dependencies
// -----------------

var gutil   = require('gulp-util');
var through = require('through2');

var PluginError = gutil.PluginError;



// Constants
// -----------------

var PLUGIN_NAME = 'gulp-fail';



// Task Definition
// -----------------

function gulpFail(message, failAfterCompletion) {

  var shouldFail = false;
  var getMessage = message;


  if (typeof getMessage !== 'function') {
    getMessage = function() {
      return (message || "Task was forced to fail.");
    };
  }



  function getError() {
    return new PluginError(PLUGIN_NAME, gutil.colors.red(getMessage()), { showStack: false });
  }


  function checkFile(file, _e, cb) {
    if (failAfterCompletion !== true) {
      cb(getError());
      return;
    }

    shouldFail = true;

    cb(null, file);
  }


  function checkStream() {
    if (failAfterCompletion === true && shouldFail) {
      this.emit('error', getError());
      return;
    }
    this.emit('end');
  }


  function onError() {
    this.emit('end');
  }



  return through.obj(checkFile, checkStream)
                .on('error', onError);
}



// Module Exports
// -----------------

module.exports = gulpFail;
