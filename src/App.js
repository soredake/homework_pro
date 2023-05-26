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
    changeUrlAndTitle("", "Contacts");
  }, []);

  const changeUrlAndTitle = (url, title) => {
    const newUrl = "/" + url;
    document.title = title;
    window.history.pushState("data", "", newUrl);
  };

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
    changeUrlAndTitle("", "Contacts");
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
          onClick={() => {
            setPage("Contacts");
            changeUrlAndTitle("", "Contacts");
          }}
          value="Contacts"
        />
        <input
          type="button"
          onClick={() => {
            setPage("AddContact");
            changeUrlAndTitle("addcontact", "Add contact");
          }}
          value="Add contact"
        />
      </div>
      {currentPage}
    </div>
  );
}

export default App;
