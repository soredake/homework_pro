"use strict";

function Tenant(tName, tAge) {
  this.name = tName;
  this.age = tAge;

  this.getInfo = () => {
    return this.name + " " + this.age;
  };
}
