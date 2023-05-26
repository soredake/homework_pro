import "./AddContact.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddContact({
  addContact,
  editContact,
  closeEditModal,
  editMode,
  currentName,
  currentPhone,
}) {
  const navigate = useNavigate();
  const [isFieldsEmpty, setIsFieldsEmpty] = useState(false);

  const checkFormValidity = () => {
    const form = document.forms.addContact;
    let emptyFields = [];
    ["name", "phone"].map((field) => {
      if (!form[field].checkValidity()) {
        form[field].classList.add("invalid");
        setIsFieldsEmpty(true);
        emptyFields.push(field);
      }
    });
    return emptyFields;
  };

  const handleAddContactClick = () => {
    const form = document.forms.addContact;
    if (checkFormValidity().length > 0) {
      return;
    } else if (!editMode) {
      addContact(form.name.value, form.phone.value);
      navigate("/");
    } else {
      editContact(form.name.value, form.phone.value);
      closeEditModal();
    }
  };

  const handleInputChange = (e) => {
    const t = e.target;
    if (!t.checkValidity()) {
      t.classList.add("invalid");
    } else {
      t.classList.remove("invalid");
    }

    if (Object.keys(checkFormValidity()).length === 0) {
      setIsFieldsEmpty(false);
    }
  };

  const handleCancelClick = () => (editMode ? closeEditModal() : navigate("/"));

  return (
    <div className="AddContact">
      <form name="addContact">
        <label htmlFor="name">Enter name:</label>
        <input
          type="text"
          name="name"
          id="name"
          required={true}
          minLength="5"
          placeholder="Elon Musk"
          onChange={handleInputChange}
          defaultValue={editMode ? currentName : ""}
        />
        <label htmlFor="phone">Enter phone number:</label>
        <input
          type="text"
          name="phone"
          id="phone"
          required={true}
          minLength="5"
          placeholder="+380639557349"
          onChange={handleInputChange}
          defaultValue={editMode ? currentPhone : ""}
        />
      </form>
      <div className="warning">
        {isFieldsEmpty ? "Some of the inputs are empty" : ""}
      </div>
      <div className="actions">
        <input
          type="button"
          disabled={isFieldsEmpty ? true : false}
          value={editMode ? "Save user" : "Add user"}
          onClick={handleAddContactClick}
        />
        <input type="button" onClick={handleCancelClick} value="Cancel" />
      </div>
    </div>
  );
}

export default AddContact;
