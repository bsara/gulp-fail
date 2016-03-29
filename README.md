# gulp-fail [![NPM Package](https://img.shields.io/npm/v/gulp-fail.svg?style=flat-square)](https://www.npmjs.com/package/gulp-fail) [![Build Status](https://img.shields.io/travis/bsara/gulp-fail.svg?style=flat-square)](https://travis-ci.org/bsara/gulp-fail)

> Forces a gulp task to fail. (Works great with [gulp-if][gi]!)



## Insallation

    $ npm install --save-dev gulp-fail



## Usage

> **NOTE:** It really makes most sense to use this plugin with [gulp-if][gi] in almost all cases.


#### No Message Given

```javascript
var fail   = require('gulp-fail');
var gulpIf = require('gulp-if');

var condition = true;


// Will fail with a generic message as to why.
gulp.task('mytask', function() {
  return gulp.src('**/*.js')
             .pipe(gulpIf(condition, fail()));
})
```


#### Custom Message

```javascript
var fail   = require('gulp-fail');
var gulpIf = require('gulp-if');

var condition = true;


// Will fail with the given message shown as the reason.
gulp.task('mytask', function() {
  return gulp.src('**/*.js')
             .pipe(gulpIf(condition, fail("It failed cause I told it to! ...Hooray?")));
})
```


#### Message Function

```javascript
var fail   = require('gulp-fail');
var gulpIf = require('gulp-if');

var condition = true;


// Will fail with the message returned by the function passed to `fail`.
gulp.task('mytask', function() {
  return gulp.src('**/*.js')
             .pipe(gulpIf(condition, fail(function() {
               var message = "";

               // do some stuff to determine what the message will be

               return message;
             })));
})
```


#### Advanced Usage (JSHint and JSCS)

```javascript
var fail        = require('gulp-fail');
var gulpIf      = require('gulp-if');
var jshint      = require('gulp-jshint');
var jscs        = require('gulp-jscs');
var jscsStylish = require('gulp-jscs-stylish');


// Will fail without duplicating the jscs error messages.
gulp.task('lint', function() {
  var jscsFailed = false;

  return gulp.src('**/*.js')
             .pipe(jshint())
             .pipe(jscs())
             .pipe(jscsStylish.combineWithHintResults())
             .pipe(jshint.reporter('jshint-stylish'))
             .pipe(gulpIf(function(file) {
               return ((file.jscs && !file.jscs.success)
                        || (file.jshint && !file.jshint.success));
             }, fail("Linting finished with errors!", true)));
})
```



### API

#### fail([_message_], [_failAfterCompletion_])

- **message** `String|Function`

  The error message used the task is forced to fail. This can be a string or a function.
  If a function is given, it is expected to return a `String`.

- **failAfterCompletion** `Boolean`

  If `true`, the stream will complete it's journey through every pipe before the fail occurs.
  This was added because of plugins like [`gulp-jscs`](https://www.npmjs.com/package/gulp-jscs)
  and [`gulp-jscs-stylish`](https://www.npmjs.com/package/gulp-jscs-stylish) (See [the example
  above](#advanced-usage-jshint-and-jscs)).



## License

The MIT License (MIT)

Copyright (c) 2016 Brandon Sara ([http://bsara.github.io](http://bsara.github.io))

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.






[gi]: https://www.npmjs.com/package/gulp-if "gulp-if plugin"
