let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function myForeach(kuchtokaro) {
  for (let i = 0; i < nums.length; i++) {
    kuchtokaro(nums[i]);
  }
}

myForeach((item) => console.log(item));
