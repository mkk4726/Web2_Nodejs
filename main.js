var http = require('http');
var fs = require('fs');
var url = require('url');

const template = require('./libs/templates');
const { template_list } = template;
const { template_description} = template;

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;
  
  if (pathname === '/') {
    if (title === undefined) {
      title = 'INDEX'};
    
    fs.readdir('./data', function (err, filelist){      
      var title = 'Welcome';
      var description = 'Hello, Node.js';

      let list = template_list(filelist);
      let template = template_description(title, list , description);
      
      response.writeHead(200);
      response.end(template);
      })
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
})

app.listen(3000);