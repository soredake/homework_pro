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
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const openEditModal = () => setEditModalIsOpen(true);
  const closeEditModal = () => setEditModalIsOpen(false);

  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] =
    useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const openConfirmDeleteModal = () => setConfirmDeleteModalIsOpen(true);
  const closeConfirmDeleteModal = () => setConfirmDeleteModalIsOpen(false);

  const findContact = (id) => contacts.findIndex((item) => item.id === id);

  const askForDeleteConfirmation = (index) => {
    setCurrentUser(contacts[index]);
    openConfirmDeleteModal();
  };

  const handleConfirmDeleteButton = () => {
    deleteContact(findContact(currentUser.id));
    closeConfirmDeleteModal();
  };

  const showEditModal = (index) => {
    setCurrentUser(contacts[index]);
    openEditModal();
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
                askForDeleteConfirmation={askForDeleteConfirmation}
                findContact={findContact}
                showEditModal={showEditModal}
              />
            ))}
          </>
        )}
      </div>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        style={customStyles}
        contentLabel="addContactModal"
        ariaHideApp={false}
      >
        <h2>Edit user #{currentUser.id}</h2>
        <AddContact
          currentName={currentUser.name}
          currentPhone={currentUser.phone}
          editMode="true"
          closeEditModal={closeEditModal}
          editContact={editContact}
        />
      </Modal>
      <Modal
        isOpen={confirmDeleteModalIsOpen}
        onRequestClose={closeConfirmDeleteModal}
        style={customStyles}
        contentLabel="confirmDeleteModal"
        ariaHideApp={false}
      >
        <h2>Do you really want to delete user #{currentUser.id}?</h2>
        <input
          type="button"
          value="Delete"
          onClick={handleConfirmDeleteButton}
        />
      </Modal>
    </div>
  );
}

export default Contacts;
