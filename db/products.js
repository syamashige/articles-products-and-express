class Products {
  constructor() {
    this._count = 1;
    this._productStorage = [];
    this.add({
      name: 'Coffee Candy',
      price: 3.00,
      inventory: 28
    });
    this.add({
      name: 'NutterButter',
      price: 8.50,
      inventory: 20
    });
    this.add({
      name: 'Ramen',
      price: 2.50,
      inventory: 4
    });
  }

  //Methods
  all() {
    return [...this._productStorage];
  }

  getProductById(id) {
    return this._productStorage.filter(item => id === item.id)[0];
  }

  add(product) {
    product.id = this._count;
    this._productStorage.push(product);
    this._count++;
    return product.id;
  }

}

module.exports = Products;