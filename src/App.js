import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Contacts from "./Contacts/Contacts";
import AddContact from "./AddContact/AddContact";

function App() {
  // const [page, setPage] = useState("Contacts");
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
    // setPage("Contacts");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="navigation">
          <nav>
            <ul>
              <li>
                <Link to="/">Contacts</Link>
              </li>
              <li>
                <Link to="/addcontact">Add contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Contacts
                contacts={contacts}
                setContacts={setContacts}
                // setPage={setPage}
              />
            }
          />
          <Route
            path="/addcontact"
            element={
              <AddContact
                contacts={contacts}
                setContacts={setContacts}
                // setPage={setPage}
                addContact={addContact}
              />
            }
          />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
