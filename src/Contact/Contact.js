import "./Contact.css";

function Contact({
  name,
  phone,
  id,
  findContact,
  showEditModal,
  askForDeleteConfirmation,
}) {
  const contactIndex = findContact(id);
  const handleDeleteClick = () => askForDeleteConfirmation(id, contactIndex);
  const handleEditClick = () => showEditModal(id, name, phone);

  return (
    <div className="contact">
      <div>Contact ID: {id}</div>
      <div>Name: {name}</div>
      <div>Phone: {phone}</div>
      <div className="controls">
        <input type="button" value="Edit" onClick={handleEditClick} />
        <input type="button" value="Delete" onClick={handleDeleteClick} />
      </div>
    </div>
  );
}

export default Contact;
