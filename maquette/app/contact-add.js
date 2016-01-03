var observableModule = require("data/observable");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var fs = require("file-system");
var documents = fs.knownFolders.documents();
var myFile = documents.getFile("test.txt");
var pageData = new observableModule.Observable();
var page;

var saveContact = function(newContact){
  myFile.readText()
    .then(function(content){
      content = content.concat("\n").concat(newContact);
      myFile.writeText(content);
  });
};

exports.onPageLoaded = function(args){
  page = args.object;
    pageData.set("contactName", "");
    page.bindingContext = pageData;
};

exports.save = function(){
  saveContact(pageData.get("contactName"));
  frameModule.topmost().navigate("contact-list");
};
