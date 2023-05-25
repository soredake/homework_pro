import "./AddContact.css";

function AddContact({ addContact, setPage }) {
  const handAddContactClick = () =>
    addContact(
      document.forms.addContact.name.value,
      document.forms.addContact.phone.value
    );

  return (
    <div className="AddContact">
      <form name="addContact">
        <label htmlFor="name">Enter name:</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="phone">Enter phone number:</label>
        <input type="text" name="phone" id="phone" />
      </form>
      <div className="actions">
        <input type="button" value="Add user" onClick={handAddContactClick} />
        <input
          type="button"
          onClick={() => setPage("Contacts")}
          value="Cancel"
        />
      </div>
    </div>
  );
}

export default AddContact;
