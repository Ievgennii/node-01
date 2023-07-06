const contacts = require("./contacts")
const { Command } = require('commander');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({action, id, name, email, phone}) => {
  switch(action) {
      case "list":
          const allContacts = await contacts.listContacts();
          return console.table(allContacts);
      case "get":
          const contact = await contacts.getContactById(id);
          return console.log(contact);
      case "add":
          const newContact = await contacts.addContact({name, email, phone});
          return console.log(newContact);
      
      case "remove":
          const removeContact = await contacts.removeContact(id);
          return console.log(removeContact);

      default:
        console.warn('\x1B[31m Unknown action type!');
  }
}

// invokeAction({action: "list"});
// invokeAction({action: "get", id: "rsKkOQUi80UsgVPCcLZZW"});
// invokeAction({action: "add", name: "Eugene Simonov", email: "es@ukr.net", phone: "34535435"});
// invokeAction({action: "remove", id: "r28Flb2XL7xe3sqc8zo5J"});

invokeAction(argv);

// node index -a list
// node index -a get -i rsKkOQUi80UsgVPCcLZZW
// node index -a add -n Din Rid -e dr@ukr.net -p 00000000000
// node index -a remove -i Q_CyjEaD9ICb7eM6enx38