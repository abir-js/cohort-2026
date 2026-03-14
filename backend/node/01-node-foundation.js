const fs = require("fs")

const path = require("path");
const os = require("os")

console.log("NodeJS: ", process.versions.node);
console.log("V8: ", process.versions.v8);
console.log("LibUV: ", process.versions.uv);
console.log("=".repeat(30));
console.log("Platform: ", process.platform);
console.log("CPU: ", os.cpus().length);