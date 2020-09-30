// server.js
var express = require("express");
var history = require("connect-history-api-fallback");
//var helmet = require('helmet');
var compression = require("compression");
var path = require("path");
var serveStatic = require("serve-static");
app = express();
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    //if (req.headers.host === 'neoresid-front.herokuapp.com')
    //    return res.redirect(301, 'https"://neoresid.com');
    if (req.headers["x-forwarded-proto"] !== "https")
      return res.redirect("https://" + req.headers.host + req.url);
    else return next();
  } else return next();
});
//app.use(helmet());
app.use(history());
app.use(compression());

app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
console.log("server started " + port);
