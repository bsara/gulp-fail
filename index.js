/**
 * gulp-fail v1.0.6
 * Copyright (c) 2016 Brandon Sara (http://bsara.github.io)
 * Licensed under the MIT License
 */

'use strict';


// Dependencies
// -----------------

var PluginError   = require('plugin-error');
var colors = require('ansi-colors');
var through = require('through2');


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



  var getError = function() {
    return new PluginError(PLUGIN_NAME, colors.red(getMessage()), { showStack: false });
  };


  var checkFile = function(file, _e, cb) {
    if (failAfterCompletion !== true) {
      cb(getError());
      return;
    }

    shouldFail = true;

    cb(null, file);
  };


  var checkStream = function() {
    if (failAfterCompletion === true && shouldFail) {
      this.emit('error', getError());
      return;
    }
    this.emit('end');
  };


  var onError = function() {
    this.emit('end');
  };



  return through.obj(checkFile, checkStream)
                .on('error', onError);
}



// Module Exports
// -----------------

module.exports = gulpFail;
