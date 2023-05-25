import { useState, useEffect } from "react";
import "./App.css";
import Contacts from "./Contacts/Contacts";
import AddContact from "./AddContact/AddContact";

function App() {
  const [page, setPage] = useState("Contacts");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setContacts(data);
      });
  }, []);

  const addContact = (name, phone) => {
    let newContactId;
    if (Object.keys(contacts).length === 0) {
      newContactId = 1;
    } else {
      newContactId = contacts[contacts.length - 1].id + 1;
    }
    const newContact = { id: newContactId, name, phone };
    const newContacts = contacts.slice();
    newContacts.push(newContact);
    setContacts(newContacts);
    setPage("Contacts");
  };

  let currentPage;
  if (page === "Contacts") {
    currentPage = (
      <Contacts
        contacts={contacts}
        setContacts={setContacts}
        setPage={setPage}
      />
    );
  } else if (page === "AddContact") {
    currentPage = (
      <AddContact
        contacts={contacts}
        setContacts={setContacts}
        setPage={setPage}
        addContact={addContact}
      />
    );
  }
  return (
    <div className="App">
      <div className="navigation">
        <input
          type="button"
          onClick={() => setPage("Contacts")}
          value="Contacts"
        />
        <input
          type="button"
          onClick={() => setPage("AddContact")}
          value="Add contact"
        />
      </div>
      {currentPage}
    </div>
  );
}

export default App;
