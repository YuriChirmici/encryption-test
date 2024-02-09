const encryptor = require("file-encryptor");
const path = require("path");
const fs = require("fs");

const key = process.argv[2];

if (!key) {
    throw new Error("No key")
}

const filename = process.argv[3]

const dataPath = path.join(__dirname, "encrypted");
const outputDir = path.join(__dirname, "decrypted");

const decryptFile = (filename) => new Promise((resolve, reject) => {
    const from = path.join(dataPath, filename);
    const to = path.join(outputDir, filename);
    encryptor.decryptFile(from, to, key, function(err) {
        if (err) reject(err);
        resolve();
    });
})

const start = async () => {
    if (filename) {
        await decryptFile(filename);
        return;
    }

    const files = fs.readdirSync(dataPath)
    for (let filename of files) {
        await decryptFile(filename);
    }
}

start();
