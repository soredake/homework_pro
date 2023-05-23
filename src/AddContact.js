import "./AddContact.css";

function addContact() {
  return (
    <div className="addContact">
      <label htmlFor="name">Введите имя:</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="phone">Введите Номер телефона:</label>
      <input type="text" name="phone" id="phone" />
    </div>
  );
}

export default addContact;
