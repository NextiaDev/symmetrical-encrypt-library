// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import crypto from "crypto-js";
// const crypto: any = require("crypto-js");

export class CryptoHelper {
  static secretKey: string;
  static ivKey: string;
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
    console.log('EN=##############################################====');
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
    console.log('DE=##############################################====');
    let textDecrypted = null;
    console.log("#1");
    console.log(CryptoHelper);
    if (text) {
      console.log("#2");
      const clearText =
        CryptoHelper.initialWord && CryptoHelper.finalWord
          ? text
              .replace(CryptoHelper.initialWord, "")
              .replace(CryptoHelper.finalWord, "")
          : text;
      console.log("#3");
      console.log(clearText);
      textDecrypted = crypto.AES.decrypt(clearText, CryptoHelper.secretKey, {
        iv: CryptoHelper.ivKey,
      }).toString(crypto.enc.Utf8);
    }
    console.log(textDecrypted);
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
