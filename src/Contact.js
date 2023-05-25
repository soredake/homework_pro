import "./Contact.css";

function Contact({
  name,
  phone,
  id,
  findContact,
  deleteContact,
  openEditModal,
}) {
  const handleDeleteClick = () => deleteContact(findContact(id));
  const handleEditClick = () => openEditModal(findContact(id));

  return (
    <div className="contact" contact-id={id}>
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
