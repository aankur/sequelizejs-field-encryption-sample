const EncryptionHelper = require('./encryption-helper');
{
  const string = Buffer.alloc(100).toString('ascii');
  console.time('100-size-encrypt x 1000');
  for (let i = 0; i < 1000; i++) {
    EncryptionHelper.encryptText(string);
  }
  console.timeEnd('100-size-encrypt x 1000');
}

{
  const string = Buffer.alloc(100).toString('ascii');
  const data = EncryptionHelper.encryptText(string);
  console.time('100-size-decrypt x 1000');
  for (let i = 0; i < 1000; i++) {
    EncryptionHelper.decryptText(data);
  }
  console.timeEnd('100-size-decrypt x 1000');
}

{
  const string = Buffer.alloc(1000).toString('ascii');
  console.time('1000-size-encrypt x 1000');
  for (let i = 0; i < 1000; i++) {
    EncryptionHelper.encryptText(string);
  }
  console.timeEnd('1000-size-encrypt x 1000');
}

{
  const string = Buffer.alloc(1000).toString('ascii');
  const data = EncryptionHelper.encryptText(string);
  console.time('1000-size-decrypt x 1000');
  for (let i = 0; i < 1000; i++) {
    EncryptionHelper.decryptText(data);
  }
  console.timeEnd('1000-size-decrypt x 1000');
}
