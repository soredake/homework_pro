import "./Contact.css";

function Contact({ name, phone, id, findContact, deleteContact }) {
  // handleDelete = () => props.callback(this.props.type, this.props.value);
  const handleDeleteClick = () => deleteContact(findContact(id));
  const handleEditClick = () => console.log(findContact(id));
  // const handleFindClick = () => findContact(id);

  return (
    <div className="contact" contact-id={id}>
      <div>Contact ID: {id}</div>
      <div>Name: {name}</div>
      <div>Phone: {phone}</div>
      <div className="controls">
        <input type="button" value="Edit" onClick={handleEditClick} />
        <input type="button" value="Delete" onClick={handleDeleteClick} />
        {/* <input type="button" value="Find Contact" onClick={handleFindClick} /> */}
      </div>
    </div>
  );
}

export default Contact;
