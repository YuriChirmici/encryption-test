const encryptor = require("file-encryptor");
const path = require("path");
const fs = require("fs");

const key = process.argv[2];

if (!key) {
    throw new Error("No key")
}

const dataPath = path.join(__dirname, "raw");
const outputDir = path.join(__dirname, "encrypted");

const encryptFile = (filename) => new Promise((resolve, reject) => {
    const from = path.join(dataPath, filename);
    const to = path.join(outputDir, filename);

    encryptor.encryptFile(from, to, key, function(err) {
        if (err) reject(err);
        resolve();
    });
})

const start = async () => {
    const files = fs.readdirSync(dataPath)
    for (let filename of files) {
        await encryptFile(filename);
    }
}

start();
