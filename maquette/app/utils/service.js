var fs = require("file-system");
var documents = fs.knownFolders.currentApp();
var contactFile = documents.getFile('contacts.js');

var Service = (function() {
  function Service() {}
  Service.prototype.saveContact = function(newContact) {
    contactFile.readText()
      .then(function(content) {
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
  Service.prototype.loadContact = function() {
    contactFile.readText()
      .then(function(content) {
        try {
          var jsonData = JSON.parse(content);
          var contacts = jsonData.contacts;
          if(contacts == null){
            contacts = [];
          }
          return contacts;
        } catch (err) {
          throw new Error('Could not parse JSON file');
        }
      }, function(error) {
        throw new Error('Could not read JSON file');
      });
  };
  return Service;
})();
exports.Service = Service;
exports.service = new Service();
