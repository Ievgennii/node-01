// contacts.js
const fs = require("fs/promises");
const path = require("path")
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
 

// TODO: задокументировать каждую функцию
async function listContacts() {
  // ...твой код. Возвращает массив контактов.
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data)
}

async function getContactById(contactId) {
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

async function removeContact(contactId) {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if(index === -1){
      return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(data) {
  // ...твой код. Возвращает объект добавленного контакта.
  const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};