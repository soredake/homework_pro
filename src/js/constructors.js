"use strict";

function Tenant(tName, tAge) {
  this.name = tName;
  this.age = tAge;

  this.getInfo = () => {
    return this.name + " " + this.age;
  };
}

function Apartment(aTenants, aStyle, aRooms) {
  this.style = aStyle;
  this.rooms = aRooms;
  this.tenants = aTenants;
}

function House(hApartments) {
  this.apartments = hApartments;
}
