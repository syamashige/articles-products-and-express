class Products {
  constructor() {
    this.knex = require('../knex/knex.js');

    this._count = 1;  //for id
    this._productStorage = [];  //hardcoded data storage

    //Pre-added product items
    this.add({
      name: 'Coffee Candy',
      price: 3.12,
      inventory: 28
    });
    this.add({
      name: 'NutterButter',
      price: 8.56,
      inventory: 20
    });
    this.add({
      name: 'Chocolate Chip Cookie',
      price: 2.58,
      inventory: 4
    });
  }

  //Methods

  //Display all products in storage
  all() {
    return [...this._productStorage];
  }

  //Display a specific product based on its ID
  getProductById(id) {
    let filteredArray = this._productStorage.filter(element => id == element.id)[0];
    //console.log("filteredArray:", filteredArray);
    return filteredArray;
  }

  //Remove a specific product based on its ID
  removeProductById(id) {
    let removedProduct = null;
    console.log("\nproductStorage before remove:\n", this._productStorage);
    this._productStorage.forEach((element, index) => {
      if (element.id === Number(id)) {
        removedProduct = this._productStorage.splice(index, 1);
      }
    });
    console.log("\nproductStorage after remove:\n", this._productStorage);

    return removedProduct;
  }

  //Add a new product to storage
  add(product) {
    product.id = this._count;
    this._productStorage.push(product);
    this._count++;
    return product.id;
  }
}

module.exports = Products;