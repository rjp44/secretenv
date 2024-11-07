#!/usr/bin/env node
const dir = require('path');

const path = process.argv.length >= 3 ? dir.resolve(process.cwd(), process.argv[2]) : undefined;
const configArgs = { path };

const { encryptedValue } = require('../index.js').config(configArgs);
encryptedValue && console.log(`SECRETENV_VALUE=${encryptedValue}`);
