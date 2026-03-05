const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("ChaiCode");
    reject(new Error("ChaiCode"));
  }, 2 * 1000);
});

// setTimeout(() => {
//   console.log(promise);
// }, 2 * 1000);

// const myFunc = () => {
//     console.log(data);
// }

// promise.then(
//   (data) => console.log(data),
//   (err) => console.log(err),
// );

promise
  .then((data) => {
    return data.toUpperCase();
  })
  .then((data) => {
    return data + ".com";
  })
  .then(console.log)
  .catch((err) => {
    console.log(err);
    return "Chai";
  })
  .then(console.log);
