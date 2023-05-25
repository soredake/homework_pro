import "./AddContact.css";
import { useNavigate } from "react-router-dom";

function AddContact({
  addContact,
  editContact,
  closeModal,
  editMode,
  currentName,
  currentPhone,
}) {
  const navigate = useNavigate();
  const handleAddContactClick = () => {
    const form = document.forms.addContact;
    if (!editMode) {
      addContact(form.name.value, form.phone.value);
      navigate("/");
    } else {
      editContact(form.name.value, form.phone.value);
      closeModal();
    }
  };
  const handleCancelClick = () => (editMode ? closeModal() : navigate("/"));

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
