#!/usr/bin/env node
const dir = require('path');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'path', alias: 'p', type: String, defaultValue: '.env' },
  { name: 'read', alias: 'r', type: String },
  { name: 'encrypt', alias: 'e', type: Boolean },
];

const options = commandLineArgs(optionDefinitions);

const configArgs = { path: dir.resolve(process.cwd(), options.path) };

const results = require('../index.js').config(configArgs);
const { parsed, encryptedValue } = results
encryptedValue && options.encrypt && console.log(`SECRETENV_BUNDLE=${encryptedValue}`);
options.read && parsed[options.read] && console.log(parsed[options.read]);
