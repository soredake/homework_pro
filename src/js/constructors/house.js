"use strict";

function House(hFloors) {
  this.apartments = [];
  this.floors = hFloors;

  this.addApartment = (apartment) => {
    this.apartments.push(apartment);
  };
}
