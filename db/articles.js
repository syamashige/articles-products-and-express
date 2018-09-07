class Articles {
    constructor() {
        // this._count = 1;
        this._articleStorage = [];
    }
    all() {
        return [... this._articleStorage];
    }
    getItemByTitle(title) {
        return this._articleStorage.filter((arts) => title == arts.title)[0];
    }
    add(newArticle) {
       // arts.urlTitle = encodeURI(arts.title);
        this._articleStorage.push(newArticle);
        return newArticle.title;
    }

}

module.exports = Articles


// class Products {
//     constructor() {
//         this._count = 1;
//         this._storage = [];
//     }
//     all() {
//         return [... this._storage];
//     }
//     getItemById(id) {
//         return this._storage.filter((prods) => id == prods.id)[0];
//     }
//     add(prod) {
//         prod.id = this._count;
//         this._storage.push(prod);
//         this._count++;
//         return prod.id;
//     }
//     deleteItemById(id) {
//         let removeThisProd;
//         this._storage.forEach((prods, index) => {
//             if (prods.id === id) {
//                 removeThisProd = this._storage.splice(index, 1);
//             }
//         });
//         return removeThisProd;
//     }
// }

// module.exports = Products