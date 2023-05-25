import "./AddContact.css";
// import { useState } from "react";

function AddContact({ addContact, setPage, closeModal, editMode }) {
  // const [isEditMode, setIsEditMode] = useState(false);
  const handAddContactClick = () =>
    addContact(
      document.forms.addContact.name.value,
      document.forms.addContact.phone.value
    );

  const handleCancelClick = () => {
    if (!editMode) {
      setPage("Contacts");
    } else {
      closeModal();
    }
  };

  return (
    <div className="AddContact">
      <form name="addContact">
        <label htmlFor="name">Enter name:</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="phone">Enter phone number:</label>
        <input type="text" name="phone" id="phone" />
      </form>
      <div className="actions">
        <input
          type="button"
          value={editMode ? "Save user" : "Add user"}
          onClick={handAddContactClick}
        />
        <input type="button" onClick={handleCancelClick} value="Cancel" />
      </div>
    </div>
  );
}

export default AddContact;
