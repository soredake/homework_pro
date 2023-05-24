import Contact from "./Contact.js";
import "./Contacts.css";

function Contacts({ contacts, setContacts, setPage }) {
  const findContact = (id) => {
    const found = contacts.findIndex((item) => item.id === id);
    console.log(found);
    return found;
  };

  const deleteContact = (index) => {
    const newContacts = contacts.slice();
    newContacts.splice(index, 1);
    console.log(newContacts);
    setContacts(newContacts);
  };

  return (
    <div>
      <div className="contacts">
        {contacts.map(({ name, phone, id }) => (
          <Contact
            name={name}
            phone={phone}
            id={id}
            deleteContact={deleteContact}
            findContact={findContact}
          />
        ))}
      </div>
      <input
        type="button"
        onClick={() => setPage("addContact")}
        value="Change page to addContact"
      />
    </div>
  );
}

export default Contacts;
