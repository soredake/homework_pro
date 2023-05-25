import "./AddContact.css";

function AddContact({
  addContact,
  editContact,
  setPage,
  closeModal,
  editMode,
  currentName,
  currentPhone,
}) {
  const handleAddContactClick = () => {
    const form = document.forms.addContact;
    if (!editMode) {
      addContact(form.name.value, form.phone.value);
    } else {
      editContact(form.name.value, form.phone.value);
      closeModal();
    }
  };

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
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Elon Musk"
          defaultValue={editMode ? currentName : ""}
        />
        <label htmlFor="phone">Enter phone number:</label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="+380639557349"
          defaultValue={editMode ? currentPhone : ""}
        />
      </form>
      <div className="actions">
        <input
          type="button"
          value={editMode ? "Save user" : "Add user"}
          onClick={handleAddContactClick}
        />
        <input type="button" onClick={handleCancelClick} value="Cancel" />
      </div>
    </div>
  );
}

export default AddContact;
