import Contact from "./Contact.js";
import "./Contacts.css";

function Contacts({ contacts, setContacts, setPage }) {
  // console.log(contacts);
  return (
    <div>
      <div className="contacts">
        {contacts.map(({ name, phone, id }) => (
          <Contact name={name} phone={phone} id={id} />
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
