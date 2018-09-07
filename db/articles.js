class Articles {
    constructor() {
        this._articleStorage = [];
    }
    all() {
        return [... this._articleStorage];
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

