var express = require('express');
var app = express();

var httpProxy = require('http-proxy');

var apiProxy = httpProxy.createProxyServer();

var proxy = require('express-http-proxy');

var request = require('requestify');
var port = 8009;
var host = '0.0.0.0';

app.set('port', port);


app.use(require('cors')());

app.options('/*', require('cors')({
    methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS'
}));

app.options('*', function (res) {
    // CORS
    res.writeHead(204);
    res.end();
});


app.use(express.static(__dirname + '/'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// app.get('/api', function(req, res) {
//    request.get('http://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=20&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1')
//        .then(function(res){
//            console.log(res);
//            res.json({msg : 'ok'});
//        })
//        .catch(function(err){
//            console.log(err);
//        })
// });
app.use('/proxy', proxy('http://m.lowes.com', {
    proxyReqPathResolver: function(req) {
        return require('url').parse(req.url).path;
    }
    // intercept : function(rsp, data, req, res, callback) {
    //     console.log(rsp);
    //     callback(null, data);
    // }
}));


// app.get('/api/*', function(req, res) {
//     apiProxy.web(req, res, {
//         target: 'http://m.lowes.com' + require('url').parse(req.url).path,
//         changeOrigin: true
//     })
// });

var server = app.listen(port, host, function() {
    console.log('App started at: ' + new Date() + ' on port: ' + port);
});

module.exports = server;
