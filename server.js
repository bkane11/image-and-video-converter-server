var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path");

http.createServer(function (req, res) {
  if (req.url != "/movie-player.mp4") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end('<html><head><meta name="viewport" content="width=device-width"></head><body><video controls="" autoplay="" name="media"><source src="http://192.168.200.19:8888/movie-player.mp4" type="video/mp4"></video></body></html>');
  } else {
    var file = path.join(__dirname,"sample videos","SSMH13F05_SSMH13F04.mp4");
    var range = req.headers.range || '';
    var positions = range.replace(/bytes=/, "").split("-") || [0];
    var start = parseInt(positions[0], 10) || 0;

    fs.stat(file, function(err, stats) {
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });
      var stream = fs.createReadStream(file , { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });
  }
}).listen(8888);

console.log('server listening on port 8888');