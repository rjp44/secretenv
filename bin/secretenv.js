const { parsed, encryptedValue } = require('../index.js').config();



encryptedValue && console.log(`SECRETENV_VALUE=${encryptedValue}`);