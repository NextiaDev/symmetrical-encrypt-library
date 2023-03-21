const crypto = require("crypto-js");

class CryptoHelper {
  constructor(secret, iv) {
    this.secret = crypto.enc.Utf8.parse(secret);
    this.iv = crypto.enc.Utf8.parse(iv);
  }

  encryptSingleValue = async (data) => {
    let textEncrypt = null;
    if (data) {
      textEncrypt = crypto.AES.encrypt(data, this.secret, {
        iv: this.iv,
      }).toString();
    }
    return textEncrypt;
  };

  decryptSingleValue = async (data) => {
    let textValue = null;
    if (data) {
      let textDecrypted = crypto.AES.decrypt(data, this.secret, {
        iv: this.iv,
      });
      textValue = textDecrypted.toString(crypto.enc.Utf8);
    }
    return textValue;
  };

  encryptJsonValue = async (object, key) => {
    let jsonKeyValueEncrypt = object;
    if (JSON.stringify(object) !== {}) {
      let textEncrypted = crypto.AES.encrypt(object[key], this.secret, {
        iv: this.iv,
      }).toString();
      jsonKeyValueEncrypt[key] = textEncrypted;
    }
    return jsonKeyValueEncrypt;
  };

  decryptJsonValue = async (object, key) => {
    let jsonKeyDecrypted = object;
    if (JSON.stringify(object) !== {}) {
      let textDecrypted = crypto.AES.decrypt(object[key], this.secret, {
        iv: this.iv,
      });
      let textValue = textDecrypted.toString(crypto.enc.Utf8);
      jsonKeyDecrypted[key] = textValue;
    }
    return jsonKeyDecrypted;
  };
}

module.exports = CryptoHelper;
