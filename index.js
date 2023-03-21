const crypto = require("crypto-js");

class CryptoHelper {
  constructor(secret, iv, initialWord = "", finalWord = "") {
    this.secret = crypto.enc.Utf8.parse(secret);
    this.iv = crypto.enc.Utf8.parse(iv);
    this.initialWord = initialWord;
    this.finalWord = finalWord;
  }

  encryptSingleValue = async (data) => {
    let textEncrypted = null;
    if (data) {
      textEncrypted = crypto.AES.encrypt(data, this.secret, {
        iv: this.iv,
      }).toString();
      textEncrypted = this.initialWord + textEncrypted + this.finalWord;
    }
    return textEncrypted;
  };

  decryptSingleValue = async (data) => {
    let textDecrypted = null;
    if (data) {
      textDecrypted = crypto.AES.decrypt(data, this.secret, {
        iv: this.iv,
      }).toString(crypto.enc.Utf8);
    }
    return textDecrypted;
  };

  encryptJsonValue = async (object, key) => {
    let jsonKeyValueEncrypt = object;
    if (JSON.stringify(object) !== {}) {
      const textEncrypted = crypto.AES.encrypt(object[key], this.secret, {
        iv: this.iv,
      }).toString();
      jsonKeyValueEncrypt[key] =
        this.initialWord + textEncrypted + this.finalWord;
    }
    return jsonKeyValueEncrypt;
  };

  decryptJsonValue = async (object, key) => {
    let jsonKeyDecrypted = object;
    if (JSON.stringify(object) !== {}) {
      let textDecrypted = crypto.AES.decrypt(object[key], this.secret, {
        iv: this.iv,
      }).toString(crypto.enc.Utf8);
      jsonKeyDecrypted[key] = textDecrypted;
    }
    return jsonKeyDecrypted;
  };
}

module.exports = CryptoHelper;
