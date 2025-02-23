import { program } from "commander";
import {
    listContacts,
    getContactById,
    addContact,
    removeContact,
} from "./contacts.js";

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contacts = await listContacts();
            console.table(contacts);
            break;

        case "get":
            if (!id) {
                console.warn("\x1B[31m Please provide a contact Id!");
                break;
            }
            const contact = await getContactById(id);
            console.log(
                contact
                    ? `Контакт знайдено: ${JSON.stringify(contact)}`
                    : "Контакт не знайдено"
            );
            break;

        case "add":
            if (!name || !email || !phone) {
                console.warn(
                    "\x1B[31m Please provide name, email, and phone for the new contact!"
                );
                break;
            }
            const newContact = await addContact(name, email, phone);
            console.log("Новий контакт додано:", newContact);
            break;

        case "remove":
            if (!id) {
                console.warn("\x1B[31m Please provide a contact ID to remove!");
                break;
            }
            const removedContact = await removeContact(id);
            console.log(
                removedContact
                    ? `Контакт видалено: ${JSON.stringify(removedContact)}`
                    : "Контакт не знайдено"
            );
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);