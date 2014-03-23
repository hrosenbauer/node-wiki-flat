var config = require('../config');

module.exports = function (app) {
    var article = require('./article');
    app.param('article', article.byId);
    app.get('/', function (req, res) {
        res.redirect('/' + config.startpage);
    });
    app.get('/:article', article.view);
    app.post('/:article', article.save);
    app.del('/:article', article.remove);
};
