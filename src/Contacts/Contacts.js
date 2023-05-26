import Contact from "../Contact/Contact";
import AddContact from "../AddContact/AddContact";
import "./Contacts.css";
import Modal from "react-modal";
import { useState } from "react";

function Contacts({ contacts, setContacts }) {
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const findContact = (id) => contacts.findIndex((item) => item.id === id);

  const openEditModal = (index) => {
    setCurrentUser(contacts[index]);
    openModal();
  };

  const editContact = (name, phone) => {
    const contactIndex = findContact(currentUser.id);
    contacts[contactIndex].name = name;
    contacts[contactIndex].phone = phone;
  };

  const deleteContact = (index) => {
    const newContacts = contacts.slice();
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  return (
    <div>
      <div className="contacts">
        {Object.keys(contacts).length === 0 ? (
          <div>No contacts yet</div>
        ) : (
          <>
            {contacts.map(({ name, phone, id }) => (
              <Contact
                name={name}
                phone={phone}
                id={id}
                editContact={editContact}
                deleteContact={deleteContact}
                findContact={findContact}
                openEditModal={openEditModal}
              />
            ))}
          </>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="addContactModal"
        ariaHideApp={false}
      >
        <h2>Edit user #{currentUser.id}</h2>
        <AddContact
          currentName={currentUser.name}
          currentPhone={currentUser.phone}
          editMode="true"
          closeModal={closeModal}
          editContact={editContact}
        />
      </Modal>
    </div>
  );
}

export default Contacts;
