var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var fs = require("file-system");
var documents = fs.knownFolders.documents();
var myFile = documents.getFile("test.txt");
var contactFile = documents.getFile('contacts.txt');
var contacts = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;

var loadContact = function() {
  contactFile.readText()
    .then(function(content) {
      try {
        var jsonData = JSON.parse(content);
        var contactsData = jsonData.contacts;
        if(contactsData == null){
          contactsData = [];
        }

        contactsData.forEach(function(contact){
          console.log(contact);
          contacts.push(contact);
        });
      } catch (err) {
        throw new Error('Could not parse JSON file');
      }
    }, function(error) {
      throw new Error('Could not read JSON file');
    });
};

//var loadContact = function(){
  //contacts(service.loadContact());
  // myFile.readText()
  //     .then(function (content) {
  //       var allLine = content.split("\n");
  //       allLine.forEach(function(line){
  //         console.log(line);
  //         contacts.push({name: line});
  //       });
  // }, function (error) {
  //   console.log(error);
  // });
//};

var saveContact = function(){
  var text = "";
  contacts.forEach(function(contact){
    text += contact.name + "\n";
  });
  myFile.writeText(text);
};

exports.onPageLoaded = function(args){
  page = args.object;
  contacts.set([]);
  loadContact();
  pageData.set("contact", "");
  pageData.set("contacts", contacts);
  page.bindingContext = pageData;
};

exports.add = function(){
  console.log("Go to contact page");
  frameModule.topmost().navigate("contact-add");
  // contacts.push({ name: pageData.get("contact")});
  // saveContact();
  //viewModule.getViewById(page, "contact").dismissSoftInput();
};
