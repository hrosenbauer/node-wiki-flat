var Article = require('../models/article')('_wiki'),
    routes = {};

routes.byId = function (req, res, next, id) {
    Article.get(id, function (err, article) {
        if (err) article = new Article(id);
        req.article = article;
        next();
    });
};

routes.view = function (req, res) {
    res.render('article', {
        article: req.article
    });
};

routes.save = function (req, res) {
    var article = req.article;
    article.content = req.param('content');
    article.save(function (err) {
        if (err) return res.json(500);
        res.json(article);
    });
};

routes.remove = function (req, res) {
    var article = req.article;
    if (!req.article) return res.json(500);
    article.remove(function (err) {
        if (err) return res.json(500);
        res.json(200);
    });
};

module.exports = routes;
