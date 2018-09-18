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
    // return [...this._productStorage];
    return this.knex.raw('SELECT * FROM product_items');
  }

  //Display a specific product based on its ID
  getProductById(id) {
    // let filteredArray = this._productStorage.filter(element => id == element.id)[0];
    // //console.log("filteredArray:", filteredArray);
    // return filteredArray;
    console.log("id at GET:", id);
    return this.knex.raw(`SELECT * FROM product_items WHERE id = ${id}`);
  }

  updateProduct(id, product) {
    console.log("UPDATE id:", id);
    console.log("UPDATE product:", product);
    return this.knex.raw(`UPDATE product_items SET name = '${product.name}', price = '${product.price}', inventory = '${product.inventory}' WHERE id = ${id}`);
  }

  //Remove a specific product based on its ID
  removeProductById(id) {
    console.log("REMOVE id:", id);
    return this.knex.raw(`DELETE FROM product_items WHERE id = ${id}`);
  }


  //Add a new product to storage
  add(product) {
    product.id = this._count;
    //this._productStorage.push(product);
    this._count++;
    // return product.id;
    console.log("productToAdd:\n", product);
    return this.knex.raw(`INSERT INTO product_items (name, price, inventory) VALUES ('${product.name}', '${product.price}', '${product.inventory}')`);
  }

}

module.exports = Products;