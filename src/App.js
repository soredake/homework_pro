import { useState, useEffect } from "react";
import "./App.css";
// import { render } from "@testing-library/react";
import Contacts from "./Contacts";
import AddContact from "./AddContact";

function App() {
  const [page, setPage] = useState("contacts");
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

  // console.log(contacts);

  let currentPage;
  if (page === "contacts") {
    currentPage = (
      <Contacts
        contacts={contacts}
        setContacts={setContacts}
        setPage={setPage}
      />
    );
  } else if (page === "addContact") {
    currentPage = (
      <AddContact
        contacts={contacts}
        setContacts={setContacts}
        setPage={setPage}
      />
    );
  }
  return <div className="App">{currentPage}</div>;
}

export default App;