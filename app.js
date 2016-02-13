var http = require('http');
var querystring = require('querystring');


http.createServer(function(request, response) {
        processPost(request, response, function() {
            console.log(request.post);
            // Use request.post here
            console.log('Ini POST');
            response.writeHead(200, "OK", {'Content-Type': 'application/json'});
            response.end();
        });

}).listen(8000);


function processPost(request, response, callback) {
    var queryData = "";
    if(typeof callback !== 'function') return null;

    if(request.method == 'POST') {
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'application/json'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function() {
            request.post = querystring.parse(queryData);
            callback();
        });

    } else {
        response.writeHead(405, {'Content-Type': 'application/json'});
        response.end();
    }
}
