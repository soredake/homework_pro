import "./AddContact.css";

function addContact({ addContact, setPage }) {
  const handAddContactClick = () =>
    addContact(
      document.querySelector("input[name=name]").value,
      document.querySelector("input[name=phone]").value
    );

  return (
    <div className="addContact">
      <label htmlFor="name">Enter name:</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="phone">Enter phone number:</label>
      <input type="text" name="phone" id="phone" />
      <div className="actions">
        {/* {" "} */}
        <input
          type="button"
          value="Add user"
          onClick={handAddContactClick}
          // onClick={(e) => console.log(e.target.value)}
        />
        <input
          type="button"
          onClick={() => setPage("Contacts")}
          value="Cancel"
        />
      </div>
    </div>
  );
}

export default addContact;
