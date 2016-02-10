var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var frameModule = require("ui/frame");
var listPickerModule = require("ui/list-picker");
var fs = require("file-system");
var viewModule = require("ui/core/view");
var cameraModule = require("camera");
var documents = fs.knownFolders.documents();
var myFile = documents.getFile("test.txt");
var contactFile = documents.getFile('contacts.txt');
var pageData = new observableModule.Observable();
var page;
var listPicker = new listPickerModule.ListPicker();
var items = new observableArray.ObservableArray(["canada", "etat-unis", "Cambodia", "Czech Republic", "Danemark"]);
var service = require("./utils/service");

//var saveContact = function(newContact) {
  //service.saveContact(newContact);
  // myFile.readText()
  //   .then(function(content) {
  //
  //     content = content.concat("\n").concat(newContact);
  //     myFile.writeText(content);
  //   });
//};


var saveContact = function(newContact) {
  console.log("save new contact");
  contactFile.readText()
    .then(function(content) {
      console.log("newContact: " + newContact );
      console.log("content:" + content);
      try {
        var jsonData = JSON.parse(content);
        var contacts = jsonData.contacts;
        if (contacts == null) {
          contacts = [];
        }

        contacts.push({
          firstName: newContact.firstName,
          lastName: newContact.lastName,
          address: newContact.address,
          country: newContact.country,
          state: newContact.state,
          phone: newContact.phone
        });
        jsonData.contacts = contacts;
        contactFile.writeText(JSON.stringify(jsonData));

      } catch (err) {
        throw new Error('Could not parse JSON file');
      }
    }, function(error) {
      throw new Error('Could not read JSON file');
    });
};

exports.takePicture = function() {
  console.log("Take a picture");
  var _this = this;
  var options = {
    width: 320,
    height: 480,
    keepAspectRatio: true
  };
  cameraModule.takePicture(options).then(function(picture) {
    _this.picture = picture;
  });
};

exports.onPageLoaded = function(args) {
  items.set(["canada", "etat-unis", "Cambodia", "Czech Republic", "Danemark"]);
  page = args.object;
  pageData.set("contactName", "");
  pageData.set("items", ["canada", "etat-unis", "Cambodia", "Czech Republic", "Danemark"]);
  page.bindingContext = pageData;
};

exports.save = function() {
  var newContact = {
    firstName: pageData.get("contactFirstName"),
    lastName: pageData.get("contactLastName"),
    address: pageData.get("contactAddress"),
    country: pageData.get(""),
    state: pageData.get(""),
    phone: pageData.get("contactPhone")
  };
  saveContact(newContact);
  frameModule.topmost().navigate("contact-list");
};
