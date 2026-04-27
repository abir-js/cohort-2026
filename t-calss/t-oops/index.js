const user = {
  name: "Abir",
  score: 90,
  increment() {
    this.score++;
  },
};

const user2 = {
};

user2.__proto__ = user;

user2.name = "Angle Priya"
console.log(user.name);