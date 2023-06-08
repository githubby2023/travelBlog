const encrypt = require("crypto-js");

export class Encryption {
  static key = encrypt.enc.Base64.parse(
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
  );
  static iv = encrypt.enc.Base64.parse("AAAAAAAAAAAAAAAAAAAAAA==");

  static encryptAES(plainText) {
    var encrypted = encrypt.AES.encrypt(plainText, Encryption.key, {
      iv: Encryption.iv,
      mode: encrypt.mode.CTR,
    });
    console.log("Encrypted is 1 " + encrypted);
    return encrypted;
  }

  static decryptAES(encryptedText) {
    console.log("Encrypted is " + encryptedText);
    const fromString = encrypt.enc.Base64.parse(encryptedText);
    console.log("Encrypted from string is " + fromString);
    const decrypted = encrypt.AES.decrypt(
      { ciphertext: fromString },
      Encryption.key,
      {
        iv: Encryption.iv,
        mode: encrypt.mode.CTR,
      }
    );

    if (decrypted) {
      try {
        const str = decrypted.toString(encrypt.enc.Utf8);
        console.log("Decrypted str is " + str);
        if (str.length > 0) {
          console.log("Decrypted: " + str);
          return str;
        } else {
          return "";
        }
      } catch (e) {
        console.log(e);
        return "";
      }
    }
    return "";
  }
}
