import crypto from "crypto-js";

export class CryptoHelper {
  static secretKey: string | any;
  static ivKey: string | any;
  static initialWord: string;
  static finalWord: string;
  constructor(
    secret: string,
    iv: string,
    initialWord: string,
    finalWord: string
  ) {
    CryptoHelper.secretKey = crypto.enc.Utf8.parse(secret);
    CryptoHelper.ivKey = crypto.enc.Utf8.parse(iv);
    CryptoHelper.initialWord = initialWord;
    CryptoHelper.finalWord = finalWord;
  }

  encryptSingleValue = async (text: string) => {
    let textEncrypted = null;
    if (text) {
      textEncrypted = crypto.AES.encrypt(text, CryptoHelper.secretKey, {
        iv: CryptoHelper.ivKey,
      }).toString();
      textEncrypted =
        CryptoHelper.initialWord && CryptoHelper.finalWord
          ? CryptoHelper.initialWord + textEncrypted + CryptoHelper.finalWord
          : textEncrypted;
    }
    return textEncrypted;
  };

  decryptSingleValue = async (text: string) => {
    let textDecrypted = null;
    if (text) {
      const clearText =
        CryptoHelper.initialWord && CryptoHelper.finalWord
          ? text
              .replace(CryptoHelper.initialWord, "")
              .replace(CryptoHelper.finalWord, "")
          : text;
      textDecrypted = crypto.AES.decrypt(clearText, CryptoHelper.secretKey, {
        iv: CryptoHelper.ivKey,
      }).toString(crypto.enc.Utf8);
    }
    return textDecrypted;
  };

  encryptJsonSingleValue = async (object: any, key: string) => {
    let jsonKeyValueEncrypt = object;
    if (Object.keys(object).length !== 0) {
      const textEncrypted = crypto.AES.encrypt(
        object[key],
        CryptoHelper.secretKey,
        {
          iv: CryptoHelper.ivKey,
        }
      ).toString();
      jsonKeyValueEncrypt[key] =
        CryptoHelper.initialWord && CryptoHelper.finalWord
          ? CryptoHelper.initialWord + textEncrypted + CryptoHelper.finalWord
          : textEncrypted;
    }
    return jsonKeyValueEncrypt;
  };

  decryptJsonSingleValue = async (object: any, key: string) => {
    let jsonKeyDecrypted = object;
    if (Object.keys(object).length !== 0) {
      const clearText =
        CryptoHelper.initialWord && CryptoHelper.finalWord
          ? object[key]
              .replace(CryptoHelper.initialWord, "")
              .replace(CryptoHelper.finalWord, "")
          : object[key];
      let textDecrypted = crypto.AES.decrypt(
        clearText,
        CryptoHelper.secretKey,
        {
          iv: CryptoHelper.ivKey,
        }
      ).toString(crypto.enc.Utf8);
      jsonKeyDecrypted[key] = textDecrypted;
    }
    return jsonKeyDecrypted;
  };
}

module.exports = CryptoHelper;
