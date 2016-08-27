const { isNumber, isString, isObject, has } = require('lodash');
const math = require('mathjs');
const alfy = require('alfy');

try {
  const answer = math.eval(alfy.input);
  if (isNumber(answer) || isString(answer) || (isObject(answer) && has(answer, 'value'))) {
    const answerString = answer.toString();
    // Return only if it isn't what user entered
    if (answerString !== alfy.input) {
      alfy.output([{
        title: answer.toString(),
        subtitle: alfy.input,
      }]);
    }
  }
} catch (err) {
  // do nothing...
}

// if this was a forked process, make sure to exit it
// otherwise, the parent process will never resolve the output data
// ref: https://github.com/nodejs/node-v0.x-archive/issues/2605
if (process.send) {
  process.exit();
}
