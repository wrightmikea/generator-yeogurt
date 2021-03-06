/**
 * Create prompts for client info
 */

'use strict';

var testingPrompts = function testingPrompts() {
  if (this.existingConfig) {
    return;
  }

  var cb = this.async();

  this.log('\n---- ' + 'Testing'.red.underline + ' ----\n');

  this.prompt([{
    type: 'confirm',
    name: 'useTesting',
    message: 'Will you be ' + 'testing your client-side JavaScript'.blue + '?',
    default: true
  }, {
    when: function(answers) { return answers.useTesting; },
    type: 'list',
    name: 'testFramework',
    message: 'Which JavaScript ' + 'testing framework'.blue + ' would you like to use?',
    choices: ['Jasmine', 'Mocha'],
    filter: function(val) {
      var filterMap = {
        'Jasmine': 'jasmine',
        'Mocha': 'mocha'
      };

      return filterMap[val];
    }
  }], function(answers) {
    this.testingPrompts = answers;

    cb();
  }.bind(this));
};

module.exports = testingPrompts;
