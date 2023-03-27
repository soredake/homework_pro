function Person(pName, pAge) {
  this.name = pName;
  this.age = pAge;

  this.getInfo = () => {
    return `${this.name}, age: ${this.age}`;
  };
}

function Car(cBrand, cModel, cYear, cNumberPlate) {
  this.brand = cBrand;
  this.model = cModel;
  this.year = cYear;
  this.numberPlate = cNumberPlate;
  this.owner = "";

  this.setOwner = function (cOwner) {
    if (cOwner.age < 18) {
      console.log("you're too young to drive :(");
      return;
    }
    this.owner = cOwner;
  };

  this.getInfo = () => {
    return `Car info: ${this.brand} ${this.model}, year of manufacture: ${
      this.year
    }, number plate: ${this.numberPlate} \nOwner is: ${this.owner.getInfo()}`;
  };
}
