const dotenv = require('dotenv');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
let encryptedValue = false;
let SecretenvValue = () => encryptedValue;
function config() {
  let results = dotenv.config(...arguments);
  let { parsed } = results;

  let { SECRETENV_KEY, SECRETENV_BUNDLE } = process.env;
  const IV_LENGTH = 16;
  let key = false;
  if (SECRETENV_KEY) {
    const hmac = crypto.createHmac('sha256', 'secretenv');
    hmac.update(SECRETENV_KEY);
    key = hmac.digest();
  }

  function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('base64');
  }

  function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'base64');
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  if (key) {
    if (parsed && Object.keys(parsed).length > 0 && !SECRETENV_BUNDLE?.length) {
      encryptedValue = encrypt(JSON.stringify(parsed))
    }
    else if (SECRETENV_BUNDLE?.length && SECRETENV_BUNDLE?.split(':')?.length === 2) {
      const composite_value = decrypt(SECRETENV_BUNDLE);
      parsed = JSON.parse(composite_value);
      Object.assign(process.env, parsed);
    }
  }
  return {...results, parsed, encryptedValue}
}

module.exports = { ...dotenv, config, SecretenvValue};