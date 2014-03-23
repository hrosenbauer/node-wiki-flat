var path = require('path'),
    fs = require('fs');

module.exports = function (dir) {
    function Article(id) {
        this._id = id;
        this.meta = {
            created: Date.now()
        };
        this.content = '';
    }

    Article.prototype.save = function (callback) {
        var json;
        try {
            json = JSON.stringify(this);
        }
        catch (err) {
            return callback(err);
        }

        var filename = path.join(dir, this._id + '.json');
        fs.writeFile(filename, json, function (err) {
            callback(err);
        });
    };

    Article.prototype.remove = function (callback) {
        var filename = path.join(dir, this._id + '.json');
        fs.unlink(filename, function (err) {
            callback(err);
        });
    };

    Article.get = function (id, callback) {
        var filename = path.join(dir, id + '.json');
        fs.readFile(filename, function (err, data) {
            if (err) return callback(err);

            var article = new Article(id);
            try {
                JSON.parse(data, function (key, value) {
                    article[key] = value;
                });
            }
            catch (err) {
                callback('Error parsing ' + id + ': ' + err);
            }
            callback(null, article);
        });
    };

    return Article;
};
