"use strict";

function Tenant(tName, tAge) {
  this.name = tName;
  this.age = tAge;
}

Tenant.prototype.getInfo = () => {
  return this.name + " " + this.age;
};

function Appartment(aTenants, aRemont, aRooms) {
  this.tenants = aTenants;
  this.remont = aRemont;
  this.rooms = aRooms;
}

function House(hAppartments) {
  this.appartments = hAppartments;
}
