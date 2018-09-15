class Articles {
    constructor() {
        this.knex = require('../knex/knex.js');
        this._articleStorage = [];
    }
    all() {
        // return [... this._articleStorage];
        return this.knex.raw('SELECT * FROM items');
    }
    getItemByTitle(title) {
        return this._articleStorage.filter((article) => title == article.title)[0];
    }
    add(newArticle) {
        this._articleStorage.push(newArticle);
        return newArticle.title;
    }

}

module.exports = Articles

