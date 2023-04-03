const crypto = require("crypto-js");

class CryptoHelper {
  constructor(secret, iv, initialWord, finalWord) {
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
      textEncrypted =
        this.initialWord && this.finalWord
          ? this.initialWord + textEncrypted + this.finalWord
          : textEncrypted;
    }
    return textEncrypted;
  };

  decryptSingleValue = async (data) => {
    let textDecrypted = null;
    if (data) {
      const clearText =
        this.initialWord && this.finalWord
          ? data.replace(this.initialWord, "").slice(0, -1)
          : data;
      textDecrypted = crypto.AES.decrypt(clearText, this.secret, {
        iv: this.iv,
      }).toString(crypto.enc.Utf8);
    }
    return textDecrypted;
  };

  encryptJsonSingleValue = async (object, key) => {
    let jsonKeyValueEncrypt = object;
    if (JSON.stringify(object) !== {}) {
      const textEncrypted = crypto.AES.encrypt(object[key], this.secret, {
        iv: this.iv,
      }).toString();
      jsonKeyValueEncrypt[key] =
        this.initialWord && this.finalWord
          ? this.initialWord + textEncrypted + this.finalWord
          : textEncrypted;
    }
    return jsonKeyValueEncrypt;
  };

  decryptJsonSingleValue = async (object, key) => {
    let jsonKeyDecrypted = object;
    if (JSON.stringify(object) !== {}) {
      const clearText =
        this.initialWord && this.finalWord
          ? object[key].replace(this.initialWord, "").slice(0, -1)
          : object[key];
      let textDecrypted = crypto.AES.decrypt(clearText, this.secret, {
        iv: this.iv,
      }).toString(crypto.enc.Utf8);
      jsonKeyDecrypted[key] = textDecrypted;
    }
    return jsonKeyDecrypted;
  };
}

module.exports = CryptoHelper;
