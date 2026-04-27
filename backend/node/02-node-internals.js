const fs = require("fs");

setImmediate(() => console.log("Immediate"));

setTimeout(() => {
  console.log("Timemout");
}, 0);

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log("Timemout inside FS");
  }, 0);
  setImmediate(() => {
    console.log("Interval inside FS");
  });
  console.log("Hello inside fs");
});
console.log("Hello");
