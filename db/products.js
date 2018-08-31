class Products {
    constructor() {
        this._count = 1;
        this._storage = [];
    }
    all() {
        return [... this._storage];
    }
    getItemById(id) {
        return this._storage.filter((prods) => id == prods.id)[0];
    }
    add(prod) {
        prod.id = this._count;
        this._storage.push(prod);
        this._count++;
        return prod.id;
    }
}

module.exports = Products