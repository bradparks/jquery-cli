var jsdom = require("jsdom");
var vm = require("vm");

module.exports = function (proc) {
    proc.stdin.resume();
    proc.stdin.setEncoding("utf-8");

    var html = "";
    proc.stdin.on("data", function (chunk) {
        html = html + chunk.toString();
    });

    proc.stdin.on("end", function () {
        proc.stdin.pause();

        var args = proc.argv.slice(2).join(" ");

        jsdom.env(html, [ __dirname + "/../vendor/jquery.js" ], function (err, window) {
            if (err) {
                throw err;
            }

            var result = vm.runInNewContext(args, { "$": window.$ });

            //this way you don't have to .html() it yourself!
            if (result.html) {
                result = result.html();
            }

            console.log(result);

        });
    }); 
}
