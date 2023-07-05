const contacts = require("./contacts")

const invokeAction = async ({action, id, name, email, phone}) => {
  switch(action) {
      case "list":
          const allContacts = await contacts.listContacts();
          return console.log(allContacts);
      case "get":
          const contact = await contacts.getContactById(id);
          return console.log(contact);
      case "add":
          const newContact = await contacts.addContact({name, email, phone});
          return console.log(newContact);
      
      case "remove":
          const removeContact = await contacts.removeContact(id);
          return console.log(removeContact);
  }
}

// invokeAction({action: "list"});
// invokeAction({action: "get", id: "rsKkOQUi80UsgVPCcLZZW"});
// invokeAction({action: "add", name: "Eugene Simonov", email: "es@ukr.net", phone: "34535435"});
invokeAction({action: "remove", id: "r28Flb2XL7xe3sqc8zo5J"});