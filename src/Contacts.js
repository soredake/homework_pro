import Contact from "./Contact.js";
import "./Contacts.css";
import Modal from "react-modal";
import { useState } from "react";

function Contacts({ contacts, setContacts }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  
  const openModal = () => {
    setIsOpen(true);
  };
  
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }
  
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  
  const closeModal = () => {
    setIsOpen(false);
  };

  const findContact = (id) => {
    const found = contacts.findIndex((item) => item.id === id);
    return found;
  };

  const editContact = (index) => {
    // const newContacts = contacts.slice();
    // newContacts.splice(index, 1);
    // setContacts(newContacts);
  };

  const deleteContact = (index) => {
    const newContacts = contacts.slice();
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  return (
    <div>
      <div className="contacts">
        {contacts.map(({ name, phone, id }) => (
          <Contact
            name={name}
            phone={phone}
            id={id}
            editContact={editContact}
            deleteContact={deleteContact}
            findContact={findContact}
          />
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
}

export default Contacts;
