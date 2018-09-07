class Articles {
    constructor() {
        // this._count = 1;
        this._articleStorage = [];
    }
    all() {
        return [... this._articleStorage];
    }
    getItemByTitle(title) {
        return this._articleStorage.filter((article) => title == article.title)[0];
    }
    add(newArticle) {
       // arts.urlTitle = encodeURI(arts.title);
        this._articleStorage.push(newArticle);
        return newArticle.title;
    }

}

module.exports = Articles

