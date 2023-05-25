import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import "./App.css";
import Contacts from "./Contacts/Contacts";
import AddContact from "./AddContact/AddContact";

function App() {
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
  };

  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Contacts</NavLink>
            </li>
            <li>
              <NavLink to="/addcontact">Add contact</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<Contacts contacts={contacts} setContacts={setContacts} />}
          />
          <Route
            path="/addcontact"
            element={<AddContact addContact={addContact} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
