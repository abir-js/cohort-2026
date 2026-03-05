// console.log(this);

function insideFunction() {
  return this;
}
// console.log(insideFunction());

function insideFunctionWithStrict() {
  "use strict";
  return this;
}
// console.log(insideFunctionWithStrict());

const bollyWoodFilm = {
  name: "Bajirao Mastani",
  lead: "Rabnvir Singh",
  introduce() {
    return `${this.lead} performs in ${this.name}`;
  },
  introduceWithArrow: () => {
    return `${this.lead} performs in ${this.name}`;
  },
};

// console.log(bollyWoodFilm.introduce());
// console.log(bollyWoodFilm.introduceWithArrow());

const filmDirector = {
  name: "Sanjay Leela Bansali",
  cast: ["Ranveer", "Deepika", "Priyanka"],

  announceCast() {
    this.cast.forEach((actor) => {
      console.log(`${this.name} intorduces ${actor}`);
    });
  },
};
// filmDirector.announceCast();

const filmSet = {
  crew: "Spot Boys",
  prepareProps() {
    console.log(`Outer this.crew: ${this.crew}`);
    function arrangeChair() {
      console.log(`Inner this.crew: ${this.crew}`);
    }
    arrangeChair();

    const arrangeLights = () => {
      console.log(`Arrow this.crew: ${this.crew}`);
    };
    arrangeLights();
  },
};
// filmSet.prepareProps();

// * Detached Methods
const actor = {
  name: "Ranveer Singh",
  bow() {
    return `${this.name} takes a bow`;
  }
};

const detachedBow = actor.bow;
console.log(detachedBow());