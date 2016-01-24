var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var frameModule = require("ui/frame");
var listPickerModule = require("ui/list-picker");
var fs = require("file-system");
var viewModule = require("ui/core/view");
var documents = fs.knownFolders.documents();
var myFile = documents.getFile("test.txt");
var pageData = new observableModule.Observable();
var page;
var listPicker = new listPickerModule.ListPicker();
var items = new observableArray.ObservableArray(["canada", "etat-unis", "Cambodia", "Czech Republic", "Danemark"]);
var saveContact = function(newContact){
  myFile.readText()
    .then(function(content){
      content = content.concat("\n").concat(newContact);
      myFile.writeText(content);
  });
};

exports.onPageLoaded = function(args){
  items.set(["canada", "etat-unis", "Cambodia", "Czech Republic", "Danemark"]);
  page = args.object;
    pageData.set("contactName", "");
      pageData.set("items", ["canada", "etat-unis", "Cambodia", "Czech Republic", "Danemark"]);
    page.bindingContext = pageData;
};

exports.save = function(){
  saveContact(pageData.get("contactName"));
  frameModule.topmost().navigate("contact-list");
};
