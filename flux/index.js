'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var getRootDir = require('../helpers/get-root-dir');
var path = require('path');

var FluxGenerator = module.exports = function FluxGenerator() {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  var fileJSON = this.config.get('config');

  // options
  this.jsFramework = fileJSON.jsFramework;
  this.testFramework = fileJSON.testFramework;
  this.useTesting = fileJSON.useTesting;

};

util.inherits(FluxGenerator, yeoman.generators.NamedBase);

// Prompts
FluxGenerator.prototype.ask = function ask() {

  if (this.jsFramework !== 'react') {
    this.log('This subgenerator is only used for React Applications. It seems as though you are not using React');
    this.log('Operation aborted');
    this.abort = true;
    return;
  }

  var self = this;
  var done = this.async();
  var prompts = [{
    name: 'fluxFile',
    message: 'Where would you like to create flux files?',
    default: 'client/scripts'
  }, {
    when: function() {
      return self.useTesting;
    },
    name: 'testFile',
    message: 'Where would you like to create flux file tests?',
    default: 'test/spec'
  }];

  this.prompt(prompts, function(answers) {
    // Get root directory
    this.rootDir = getRootDir(answers.fluxFile);

    this.constantFile = path.join(answers.fluxFile, '/constants/' , this._.slugify(this.name.toLowerCase()));
    this.actionFile = path.join(answers.fluxFile, '/actions/', this._.slugify(this.name.toLowerCase()));
    this.storeFile = path.join(answers.fluxFile, '/stores/', this._.slugify(this.name.toLowerCase()));

    if (answers.testFile) {
      this.testConstantFile = path.join(answers.testFile, '/constants/' , this._.slugify(this.name.toLowerCase()));
      this.testActionFile = path.join(answers.testFile, '/actions/' , this._.slugify(this.name.toLowerCase()));
      this.testStoreFile = path.join(answers.testFile, '/stores/' , this._.slugify(this.name.toLowerCase()));
    }
    done();
  }.bind(this));
};

// Create files
FluxGenerator.prototype.files = function files() {
  if (this.abort) {
    return;
  }

  // Create constant, action, and store files
  this.template('constant.js', this.constantFile + '.js');
  this.template('action.js', this.actionFile + '.js');
  this.template('store.js', this.storeFile + '.js');

  if (this.useTesting) {
    this.template('constant.spec.js', this.testConstantFile + '.spec.js');
    this.template('action.spec.js', this.testActionFile + '.spec.js');
    this.template('store.spec.js', this.testStoreFile + '.spec.js');
  }

};
