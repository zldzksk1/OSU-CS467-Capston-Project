const crypto = require('crypto');
const config = require('config');

const algo = 'aes-128-cbc';
const key = config.get('encryptSecret');
const iv = crypto.randomBytes(16).slice(0, 16);

const encrypt = (email) => {
    const cipher = crypto.createCipheriv(algo, key, iv);

    const encrypted = Buffer.concat([cipher.update(email, 'utf-8'), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algo, key, Buffer.from(hash.iv, 'hex'));

    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrypted.toString();
};

module.exports = {
    encrypt,
    decrypt
};
