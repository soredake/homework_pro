"use strict";

const elonMusk = new Person("Elon Musk", 51);
const brendanFraser = new Person("Brendan Fraser", 54);
const grantGustin = new Person("Grant Gustin", 33);

const ferrariPortofinoM = new Car("Ferrari", "Portofino M", "2017", "BM7104AX");
const ferrariCalifornia = new Car("Ferrari", "California", "2008", "BM7105AX");
const ferrari599GTBFiorano = new Car(
  "Ferrari",
  "599 GTB Fiorano",
  "2006",
  "BM7106AX"
);

console.log(elonMusk.getInfo());
console.log(brendanFraser.getInfo());
console.log(grantGustin.getInfo());

ferrariPortofinoM.setOwner(brendanFraser);
ferrariCalifornia.setOwner(elonMusk);
ferrari599GTBFiorano.setOwner(grantGustin);

console.log(ferrariPortofinoM.getInfo());
console.log(ferrariCalifornia.getInfo());
console.log(ferrari599GTBFiorano.getInfo());
