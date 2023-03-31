"use strict";

function Tenant(tName, tAge) {
  this.name = tName;
  this.age = tAge;

  this.getInfo = () => {
    return this.name + " " + this.age;
  };
}

function Apartment(aStyle, aRoomsCount) {
  this.style = aStyle;
  this.roomsCount = aRoomsCount;
  this.tenants = [];

  this.addTenant = (tenant) => {
    this.tenants.push(tenant);
  };
}

function House(hFloors) {
  this.apartments = [];
  this.floors = hFloors;

  this.addApartment = (apartment) => {
    this.apartments.push(apartment);
  };
}
