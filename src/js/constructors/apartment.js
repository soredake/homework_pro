"use strict";

function Apartment(aStyle, aRoomsCount) {
  this.style = aStyle;
  this.roomsCount = aRoomsCount;
  this.tenants = [];

  this.addTenant = (tenant) => {
    this.tenants.push(tenant);
  };
}
