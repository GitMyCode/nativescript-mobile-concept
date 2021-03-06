var observableModule = require("data/observable");
var frameModule = require("ui/frame");
var pageData = new observableModule.Observable();

exports.onPageLoaded = function(args) {
  var page = args.object;
  page.bindingContext = pageData;
  this._username = "";
  this._password = "";
};

exports.login = function() {
  console.log("Go to contact page");
  frameModule.topmost().navigate("contact-list");
};
