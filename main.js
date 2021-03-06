var request = require('request').defaults({ encoding: null });
var Q = require('q');

function encodeImage(url) {
    var q = Q.defer();
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
            q.resolve(data);
        } else {
            q.reject([error, response.statusCode]);
        }
    });

    return q.promise;
}

function encodeAll(urls) {
    return Q.all(urls.map(encodeImage));
}

var urls = [
    'https://raw.githubusercontent.com/JanVoracek/image-encoder/master/beaver_king.png',
    'https://raw.githubusercontent.com/JanVoracek/image-encoder/master/beaver_king.png',
    'https://raw.githubusercontent.com/JanVoracek/image-encoder/master/beaver_king.png'
];

encodeAll(urls).then(function (images) {
    console.log(JSON.stringify(images));
}).fail(function (error) {
    console.error(error);
});