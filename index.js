const crypto = require("crypto-js");

class CryptoHelper {
  constructor(secret) {
    this.secret = secret;
  }

  encryptSingleValue = async (data) => {
    let textEncrypt = null;
    if (data) {
      textEncrypt = crypto.AES.encrypt(data, this.secret).toString();
    }
    return textEncrypt;
  };

  decryptSingleValue = async (data) => {
    let textValue = null;
    if (data) {
      let textDecrypted = crypto.AES.decrypt(data, this.secret);
      textValue = textDecrypted.toString(crypto.enc.Utf8);
    }
    return textValue;
  };

  encryptJsonValue = async (object, key) => {
    let jsonKeyValueEncrypt = object;
    if (JSON.stringify(object) !== {}) {
      let textEncrypted = crypto.AES.encrypt(object[key], this.secret).toString();
      jsonKeyValueEncrypt[key] = textEncrypted;
    }
    return jsonKeyValueEncrypt;
  };

  decryptJsonValue = async (object, key) => {
    let jsonKeyDecrypted = object;
    if (JSON.stringify(object) !== {}) {
      let textDecrypted = crypto.AES.decrypt(object[key], this.secret);
      let textValue = textDecrypted.toString(crypto.enc.Utf8);
      jsonKeyDecrypted[key] = textValue;
    }
    return jsonKeyDecrypted;
  };
}

module.exports = CryptoHelper;
