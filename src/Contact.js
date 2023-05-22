import "./Contact.css";

function Contact({ name, phone, id }) {
  return (
    <div className="contact">
      <div>Contact ID: {id}</div>
      <div>Name: {name}</div>
      <div>Phone: {phone}</div>
    </div>
  );
}

export default Contact;
